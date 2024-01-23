import {defer} from '@shopify/remix-oxygen';
import {Await, useLoaderData, Link} from '@remix-run/react';
import {Suspense, useState} from 'react';
import {Image, Money, getPaginationVariables} from '@shopify/hydrogen';
import {
  Banner,
  HelthBanner,
  Hero,
  ImgBanner,
  NewArrival,
  Newsletter,
  OurCollection,
  ReviewSection,
} from '~/components';
import jsonData from '../json/db.json';

export const meta = () => {
  return [{title: 'Hydrogen | Home'}];
};

export async function loader({request, context}) {
  const {storefront} = context;
  const paginationVariables = getPaginationVariables(request, {
    pageBy: 10,
  });

  const {collections} = await storefront.query(COLLECTIONS_QUERY, {
    variables: paginationVariables,
  });
  const recommendedProduct = storefront.query(RECOMMENDED_PRODUCTS_QUERY);

  const {sections} = jsonData;
  const {featured_collection_BA3iCE, featured_collection_iiKYDe} = sections;
  const collectionHandle = featured_collection_BA3iCE.settings.collection;
  const collHandle = featured_collection_iiKYDe.settings.collection;

  const SINGLE_COLLECTION_QUERY = `#graphql
  query getCollectionByHandle($handle: String!, $language: LanguageCode) @inContext(language: $language) {
  collection(handle: $handle) {
    id
    title
    handle
    description
    products(first: ${featured_collection_BA3iCE.settings.products_to_show}) {
      nodes {
        id
        title
        description
        publishedAt
        handle
        vendor
        variants(first: 1) {
          nodes {
            id
            availableForSale
            image {
              url
              altText
              width
              height
            }
            price {
              amount
              currencyCode
            }
            compareAtPrice {
              amount
              currencyCode
            }
            selectedOptions {
              name
              value
            }
            product {
              handle
              title
            }
          }
        }
      }
    }
  }
}
`;

  const SINGLE_COLLECTION = `#graphql
query getCollectionByHandle($handle: String!, $language: LanguageCode) @inContext(language: $language) {
collection(handle: $handle) {
  id
  title
  handle
  description
  products(first: ${featured_collection_iiKYDe.settings.products_to_show}) {
    nodes {
      id
      title
      description
      publishedAt
      handle
      vendor
      variants(first: 1) {
        nodes {
          id
          availableForSale
          image {
            url
            altText
            width
            height
          }
          price {
            amount
            currencyCode
          }
          compareAtPrice {
            amount
            currencyCode
          }
          selectedOptions {
            name
            value
          }
          product {
            handle
            title
          }
        }
      }
    }
  }
}
}
`;

  return defer({
    collections,
    recommendedProduct,
    collection: storefront.query(SINGLE_COLLECTION_QUERY, {
      variables: {
        handle: collectionHandle,
      },
    }),
    bestseller: storefront.query(SINGLE_COLLECTION, {
      variables: {
        handle: collHandle,
      },
    }),
  });
}

export default function Homepage() {
  /** @type {LoaderReturnData} */
  const {collections, recommendedProduct, collection, bestseller} =
    useLoaderData();

  const [section, setSection] = useState(jsonData.sections);

  const {
    slideshow,
    image_with_text_WnPBEa,
    featured_collection_BA3iCE,
    featured_collection_iiKYDe,
    collage_WJfMLy,
  } = section;

  return (
    <main>
      <Hero slide={slideshow} />
      <OurCollection />
      {collection && (
        <Suspense>
          <Await resolve={collection}>
            {({collection}) => {
              return (
                <NewArrival
                  product={collection.products.nodes}
                  title={featured_collection_BA3iCE.settings.title}
                  count={featured_collection_BA3iCE.settings.products_to_show}
                />
              );
            }}
          </Await>
        </Suspense>
      )}
      <Banner banner={image_with_text_WnPBEa} />
      <ImgBanner collection={collections.nodes} collage={collage_WJfMLy} />
      {bestseller && (
        <Suspense>
          <Await resolve={bestseller}>
            {({collection}) => {
              return (
                <NewArrival
                  product={collection.products.nodes}
                  title={featured_collection_iiKYDe.settings.title}
                  count={featured_collection_iiKYDe.settings.products_to_show}
                />
              );
            }}
          </Await>
        </Suspense>
      )}
      <HelthBanner />
      <ReviewSection />
      <Newsletter />
    </main>
  );
}

/**
 * @param {{
 *   collection: FeaturedCollectionFragment;
 * }}
 */
function FeaturedCollection({collection}) {
  if (!collection) return null;
  const image = collection?.image;
  return (
    <Link
      className="featured-collection"
      to={`/collections/${collection.handle}`}
    >
      {image && (
        <div className="featured-collection-image">
          <Image data={image} sizes="100vw" />
        </div>
      )}
      <h1>{collection.title}</h1>
    </Link>
  );
}

function RecommendedProducts({products}) {
  return (
    <div className="recommended-products">
      <h2>Recommended Products</h2>
      <Suspense fallback={<div>Loading...</div>}>
        <Await resolve={products}>
          {({products}) => (
            <div className="recommended-products-grid">
              {products.nodes.map((product) => (
                <Link
                  key={product.id}
                  className="recommended-product"
                  to={`/products/${product.handle}`}
                >
                  <Image
                    data={product.images.nodes[0]}
                    aspectRatio="1/1"
                    sizes="(min-width: 45em) 20vw, 50vw"
                  />
                  <h4>{product.title}</h4>
                  <small>
                    <Money data={product.priceRange.minVariantPrice} />
                  </small>
                </Link>
              ))}
            </div>
          )}
        </Await>
      </Suspense>
      <br />
    </div>
  );
}

const COLLECTIONS_QUERY = `#graphql
  fragment Collection on Collection {
    id
    title
    handle
    image {
      id
      url
      altText
      width
      height
    }
  }
  query StoreCollections(
    $endCursor: String
    $first: Int
    $language: LanguageCode
    $last: Int
    $startCursor: String
  ) @inContext(language: $language) {
    collections(
      first: $first,
      last: $last,
      before: $startCursor,
      after: $endCursor
    ) {
      nodes {
        ...Collection
      }
      pageInfo {
        hasNextPage
        hasPreviousPage
        startCursor
        endCursor
      }
    }
  }
`;

const RECOMMENDED_PRODUCTS_QUERY = `#graphql
  fragment RecommendedProduct on Product {
    id
    title
    handle
    priceRange {
      minVariantPrice {
        amount
        currencyCode
      }
    }
    images(first: 1) {
      nodes {
        id
        url
        altText
        width
        height
      }
    }
  }
  query RecommendedProducts ( $language: LanguageCode)
    @inContext( language: $language) {
    products(first: 4, sortKey: UPDATED_AT, reverse: true) {
      nodes {
        ...RecommendedProduct
      }
    }
  }
`;

/** @typedef {import('@shopify/remix-oxygen').LoaderFunctionArgs} LoaderFunctionArgs */
/** @template T @typedef {import('@remix-run/react').MetaFunction<T>} MetaFunction */
/** @typedef {import('storefrontapi.generated').FeaturedCollectionFragment} FeaturedCollectionFragment */
/** @typedef {import('storefrontapi.generated').RecommendedProductsQuery} RecommendedProductsQuery */
/** @typedef {import('@shopify/remix-oxygen').SerializeFrom<typeof loader>} LoaderReturnData */
