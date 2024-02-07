import {defer} from '@shopify/remix-oxygen';
import {Await, useLoaderData, Link} from '@remix-run/react';
import {Suspense, useState} from 'react';
import {
  Image,
  Money,
  flattenConnection,
  getPaginationVariables,
} from '@shopify/hydrogen';
import {
  Banner,
  FeaturedBlog,
  Hero,
  ImgBanner,
  NewArrival,
  Newsletter,
  OurCollection,
  ReviewSection,
} from '~/components';
import jsonData from '../json/db.json';
import {seoPayload} from '~/lib/seo.server';

export const meta = () => {
  return [{title: 'Hydrogen | Home'}];
};

export async function loader({request, context}) {
  const {storefront} = context;
  const {language, country} = context.storefront.i18n;
  const paginationVariables = getPaginationVariables(request, {
    pageBy: 10,
  });

  const {collections} = await storefront.query(COLLECTIONS_QUERY, {
    variables: paginationVariables,
  });
  const recommendedProduct = storefront.query(RECOMMENDED_PRODUCTS_QUERY);

  const {
    featured_collection,
    featured_collection_3ATADh,
    featured_blog_F9yDUi,
  } = jsonData.sections;

  const {blog} = await context.storefront.query(BLOGS_QUERY, {
    variables: {
      blogHandle: featured_blog_F9yDUi.settings.blog,
    },
  });

  if (!blog?.articles) {
    throw new Response('Not found', {status: 404});
  }

  const articles = flattenConnection(blog.articles).map((article) => {
    const {publishedAt} = article;
    return {
      ...article,
      publishedAt: new Intl.DateTimeFormat(`${language}-${country}`, {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      }).format(new Date(publishedAt)),
    };
  });

  const seoblog = seoPayload.blog({blog, url: request.url});

  return defer({
    collections,
    recommendedProduct,
    collection: storefront.query(SINGLE_COLLECTION_QUERY, {
      variables: {
        handle: featured_collection.settings.collection,
      },
    }),
    bestseller: storefront.query(SINGLE_COLLECTION, {
      variables: {
        handle: featured_collection_3ATADh.settings.collection,
      },
    }),
    articles,
    seoblog,
  });
}

export default function Homepage() {
  /** @type {LoaderReturnData} */
  const {
    collections,
    recommendedProduct,
    collection,
    bestseller,
    articles,
    seoblog,
  } = useLoaderData();

  const [section, setSection] = useState(jsonData);
  const {
    featured_collection,
    featured_collection_3ATADh,
    featured_blog_F9yDUi,
  } = jsonData.sections;
 ;

  return (
    <main>
      {jsonData.order.map((section, index) => {
        switch (section) {
          case 'slideshow_zJHXXX':
            return <Hero key={index} data={jsonData.sections[section]} />;
          case 'collection_list_pmLyr8':
            return (
              <OurCollection
                collection={collections.nodes}
                data={jsonData.sections[section]}
              />
            );
          case 'featured_collection':
            return (
              collection && (
                <Suspense>
                  <Await resolve={collection}>
                    {({collection}) => {
                 
                      return (
                        <NewArrival
                          key={index}
                          title={
                            <span
                              dangerouslySetInnerHTML={{
                                __html: featured_collection.settings.title,
                              }}
                            ></span>
                          }
                          collectionHandle={collection.handle}
                          product={collection?.products?.nodes}
                        />
                      );
                    }}
                  </Await>
                </Suspense>
              )
            );
          case 'image_with_text_YNRzbm':
            return <Banner key={index} data={jsonData.sections[section]} />;
          case 'collage_tzbEdC':
            return (
              <ImgBanner
                key={index}
                collection={collections.nodes}
                data={jsonData.sections[section]}
              />
            );
          case 'featured_collection_3ATADh':
            return (
              bestseller && (
                <Suspense>
                  <Await resolve={bestseller}>
                    {({collection}) => {
                      return (
                        <NewArrival
                          product={collection?.products?.nodes}
                          title={featured_collection_3ATADh.settings.title}
                        />
                      );
                    }}
                  </Await>
                </Suspense>
              )
            );
          case 'featured_blog_F9yDUi':
            return (
              <FeaturedBlog
                key={index}
                data={jsonData.sections[section]}
                articles={articles}
                seo={seoblog}
              />
            );
          case 'newsletter_YrXTNj':
            return <Newsletter key={index} data={jsonData.sections[section]} />;
          default:
            return null;
        }
      })}
    </main>
    // <main>
    //   <Suspense fallback={<div>Loading...</div>}>
    //     <Hero slide={slideshow} />
    //     <OurCollection />
    //     {collection && (
    //       <Suspense>
    //         <Await resolve={collection}>
    //           {({collection}) => {
    //             return (
    //               <NewArrival
    //                 product={collection.products.nodes}
    //                 title={featured_collection_BA3iCE.settings.title}
    //                 count={featured_collection_BA3iCE.settings.products_to_show}
    //               />
    //             );
    //           }}
    //         </Await>
    //       </Suspense>
    //     )}
    //     <Banner banner={image_with_text_WnPBEa} />
    //     <ImgBanner collection={collections.nodes} collage={collage_WJfMLy} />
    //     {bestseller && (
    //       <Suspense>
    //         <Await resolve={bestseller}>
    //           {({collection}) => {
    //             return (
    //               <NewArrival
    //                 product={collection.products.nodes}
    //                 title={featured_collection_iiKYDe.settings.title}
    //                 count={featured_collection_iiKYDe.settings.products_to_show}
    //               />
    //             );
    //           }}
    //         </Await>
    //       </Suspense>
    //     )}
    //     <HelthBanner />
    //     <ReviewSection />
    //     <Newsletter />
    //   </Suspense>
    // </main>
  );
}

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

const SINGLE_COLLECTION_QUERY = `#graphql
query getCollectionByHandle($handle: String!, $language: LanguageCode) @inContext(language: $language) {
collection(handle: $handle) {
  id
  title
  handle
  description
  products(first: 4) {
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
products(first: 4) {
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

const BLOGS_QUERY = `#graphql
query Blog($blogHandle: String!){
  blog(handle: $blogHandle ) {
    title
    seo {
      title
      description
    }
    articles(first: 3) {
      edges {
        node {
          ...Article
        }
      }
    }
  }
}

fragment Article on Article  {
  author: authorV2 {
    name
  }
  contentHtml
  handle
  id
  image {
    id
    altText
    url
    width
    height
  }
  publishedAt
  title
  blog {
    handle
  }
}
`;

/** @typedef {import('@shopify/remix-oxygen').LoaderFunctionArgs} LoaderFunctionArgs */
/** @template T @typedef {import('@remix-run/react').MetaFunction<T>} MetaFunction */
/** @typedef {import('storefrontapi.generated').FeaturedCollectionFragment} FeaturedCollectionFragment */
/** @typedef {import('storefrontapi.generated').RecommendedProductsQuery} RecommendedProductsQuery */
/** @typedef {import('@shopify/remix-oxygen').SerializeFrom<typeof loader>} LoaderReturnData */
