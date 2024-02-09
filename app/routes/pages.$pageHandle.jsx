import {json} from '@shopify/remix-oxygen';
import {useLoaderData} from '@remix-run/react';
import invariant from 'tiny-invariant';
import {routeHeaders} from '~/data/cache';
import {seoPayload} from '~/lib/seo.server';

export const headers = routeHeaders;

export async function loader({request, params, context}) {
  invariant(params.pageHandle, 'Missing page handle');

  const {page} = await context.storefront.query(PAGE_QUERY, {
    variables: {
      handle: params.pageHandle,
      language: context.storefront.i18n.language,
    },
  });

  if (!page) {
    throw new Response(null, {status: 404});
  }

  const seo = seoPayload.page({page, url: request.url});

  return json({page, seo});
}

export default function Page() {
  const {page, seo} = useLoaderData();

  return (
    <main className="abt_sec">
      <section>
        <div className="container">
          <div className="spacer">
            <div className="spacer">
              <div class="section_title">
                <h2>{seo.title}</h2>
              </div>
              <div className="main_policy">
                <div className="policy_content">
                  <p dangerouslySetInnerHTML={{__html: page.body}} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

const PAGE_QUERY = `#graphql
  query PageDetails($language: LanguageCode, $handle: String!)
  @inContext(language: $language) {
    page(handle: $handle) {
      id
      title
      body
      seo {
        description
        title
      }
    }
  }
`;
