import {ShopifySalesChannel, useNonce} from '@shopify/hydrogen';
import {defer} from '@shopify/remix-oxygen';
import {
  Links,
  Meta,
  Outlet,
  Scripts,
  LiveReload,
  useMatches,
  useRouteError,
  useLoaderData,
  ScrollRestoration,
  isRouteErrorResponse,
} from '@remix-run/react';
import favicon from '../public/favicon.png';
import appStyles from './styles/app.css';
import {Layout} from '~/components/Layout';
import swiperPag from 'swiper/css/pagination';
import {useState} from 'react';
import swiperNav from 'swiper/css/navigation';
import swiper from 'swiper/css';
import {seoPayload} from '~/lib/seo.server';
import invariant from 'tiny-invariant';
import {DEFAULT_LOCALE, parseMenu} from './lib/utils';
import {GenericError, NotFound} from '~/components';
import ImageZoom from 'react-inner-image-zoom/lib/InnerImageZoom/styles.css';

export const shouldRevalidate = ({formMethod, currentUrl, nextUrl}) => {
  if (formMethod && formMethod !== 'GET') {
    return true;
  }

  if (currentUrl.toString() === nextUrl.toString()) {
    return true;
  }

  return false;
};

export function links() {
  return [
    {rel: 'stylesheet', href: appStyles},
    {rel: 'stylesheet', href: ImageZoom},
    {rel: 'stylesheet', href: swiperPag},
    {rel: 'stylesheet', href: swiperNav},
    {rel: 'stylesheet', href: swiper},
    // {rel: 'stylesheet', href: swiperBundle},
    {
      rel: 'preconnect',
      href: 'https://cdn.shopify.com',
    },
    {
      rel: 'preconnect',
      href: 'https://shop.app',
    },
    {rel: 'icon', type: 'image/png', href: favicon},
  ];
}

export const useRootLoaderData = () => {
  const [root] = useMatches();
  return root?.data;
};

export async function loader({request, context}) {
  const {session, storefront, cart} = context;
  const [customerAccessToken, layout] = await Promise.all([
    session.get('customerAccessToken'),
    getLayoutData(context),
  ]);

  const seo = seoPayload.root({shop: layout.shop, url: request.url});

  return defer({
    isLoggedIn: Boolean(customerAccessToken),
    layout,
    selectedLocale: storefront.i18n,
    cart: cart.get(),
    analytics: {
      shopifySalesChannel: ShopifySalesChannel.hydrogen,
      shopId: layout.shop.id,
    },
    seo,
  });
}

export default function App() {
  const nonce = useNonce();
  const data = useLoaderData();
  const [headerMenu, setHeaderMenu] = useState(false);
  const [miniCart, setMiniCart] = useState(false);
  const [search, setSearch] = useState(false);

  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <meta
          http
          httpEquiv="Content-Security-Policy"
          content="connect-src 'self' https://api.yotpo.com https://monorail-edge.shopifysvc.com localhost:* ws://localhost:* ws://127.0.0.1:*;"
        />
        <meta
          httpEquiv="Content-Security-Policy"
          content="style-src 'self' 'unsafe-inline' https://cdn.shopify.com https://fonts.googleapis.com localhost:*;"
        />

        <Meta />
        <Links />
      </head>
      <body className={headerMenu || search ? 'active' : ''}>
        <Layout
          onClick={() => setHeaderMenu(false)}
          {...data}
          seo={data.seo}
          headerMenu={headerMenu}
          setHeaderMenu={setHeaderMenu}
          miniCart={miniCart}
          setMiniCart={setMiniCart}
          search={search}
          setSearch={setSearch}
        >
          <Outlet />
        </Layout>
        <ScrollRestoration nonce={nonce} />
        <Scripts nonce={nonce} />
        <LiveReload nonce={nonce} />
      </body>
    </html>
  );
}

export function ErrorBoundary({error}) {
  const [root] = useMatches();
  const locale = root?.data?.selectedLocale ?? DEFAULT_LOCALE;
  const routeError = useRouteError();
  const isRouteError = isRouteErrorResponse(routeError);

  let title = 'Error';
  let pageType = 'page';

  if (isRouteError) {
    title = 'Not found';
    if (routeError.status === 404) pageType = routeError.data || pageType;
  }

  return (
    <html lang={locale.language}>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <title>{title}</title>
        <Meta />
        <Links />
      </head>
      <body>
        <Layout
          layout={root?.data?.layout}
          key={`${locale.language}-${locale.country}`}
        >
          {isRouteError ? (
            <>
              {routeError.status === 404 ? (
                <NotFound type={pageType} />
              ) : (
                <GenericError
                  error={{message: `${routeError.status} ${routeError.data}`}}
                />
              )}
            </>
          ) : (
            <GenericError error={error instanceof Error ? error : undefined} />
          )}
        </Layout>
        <Scripts />
      </body>
    </html>
  );
}

async function validateCustomerAccessToken(session, customerAccessToken) {
  let isLoggedIn = false;
  const headers = new Headers();
  if (!customerAccessToken?.accessToken || !customerAccessToken?.expiresAt) {
    return {isLoggedIn, headers};
  }

  const expiresAt = new Date(customerAccessToken.expiresAt).getTime();
  const dateNow = Date.now();
  const customerAccessTokenExpired = expiresAt < dateNow;

  if (customerAccessTokenExpired) {
    session.unset('customerAccessToken');
    headers.append('Set-Cookie', await session.commit());
  } else {
    isLoggedIn = true;
  }

  return {isLoggedIn, headers};
}

const LAYOUT_QUERY = `#graphql
  query layout(
    $language: LanguageCode
    $headerMenuHandle: String!
    $footerMenuHandle: String!
  ) @inContext(language: $language) {
    shop {
      ...Shop
    }
    headerMenu: menu(handle: $headerMenuHandle) {
      ...Menu
    }
    footerMenu: menu(handle: $footerMenuHandle) {
      ...Menu
    }
  }
  fragment Shop on Shop {
    id
    name
    description
    primaryDomain {
      url
    }
    brand {
      logo {
        image {
          url
        }
      }
    }
  }
  fragment MenuItem on MenuItem {
    id
    resourceId
    tags
    title
    type
    url
  }
  fragment ChildMenuItem on MenuItem {
    ...MenuItem
  }
  fragment ParentMenuItem on MenuItem {
    ...MenuItem
    items {
      ...ChildMenuItem
    }
  }
  fragment Menu on Menu {
    id
    items {
      ...ParentMenuItem
    }
  }
`;

async function getLayoutData({storefront, env}) {
  const data = await storefront.query(LAYOUT_QUERY, {
    variables: {
      headerMenuHandle: 'main-menu',
      footerMenuHandle: 'footer',
      language: storefront.i18n.language,
    },
  });

  invariant(data, 'No data returned from Shopify API');

  /*
        Modify specific links/routes (optional)
        @see: https://shopify.dev/api/storefront/unstable/enums/MenuItemType
        e.g here we map:
          - /blogs/news -> /news
          - /blog/news/blog-post -> /news/blog-post
          - /collections/all -> /products
      */
  const customPrefixes = {BLOG: '', CATALOG: 'products'};

  const headerMenu = data?.headerMenu
    ? parseMenu(
        data.headerMenu,
        data.shop.primaryDomain.url,
        env,
        customPrefixes,
      )
    : undefined;

  const footerMenu = data?.footerMenu
    ? parseMenu(
        data.footerMenu,
        data.shop.primaryDomain.url,

        env,
        customPrefixes,
      )
    : undefined;

  return {shop: data.shop, headerMenu, footerMenu};
}
/** @typedef {import('@shopify/remix-oxygen').LoaderFunctionArgs} LoaderFunctionArgs */
/** @typedef {import('@remix-run/react').ShouldRevalidateFunction} ShouldRevalidateFunction */
/** @typedef {import('@shopify/hydrogen/storefront-api-types').CustomerAccessToken} CustomerAccessToken */
/** @typedef {import('@shopify/remix-oxygen').SerializeFrom<typeof loader>} LoaderReturnData */
