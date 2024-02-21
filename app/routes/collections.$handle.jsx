import {json, redirect} from '@shopify/remix-oxygen';
import {
  useLoaderData,
  useLocation,
  useSearchParams,
  useNavigate,
} from '@remix-run/react';
import {
  Pagination,
  getPaginationVariables,
  AnalyticsPageType,
  flattenConnection,
} from '@shopify/hydrogen';
import Filter from '../components/Filter';
import {PRODUCT_CARD_FRAGMENT} from '~/data/fragments';
import {seoPayload} from '~/lib/seo.server';
import NewArrival from '../image/women-coll.jpg';
import {ProductCard} from '../components';
import {getImageLoadingPriority} from '~/lib/const';
import Discount from '../image/discount.png';
import {Swiper, SwiperSlide} from 'swiper/react';
import {Navigation} from 'swiper/modules';

export const meta = ({data}) => {
  return [{title: `Hydrogen | ${data?.collection.title ?? ''} Collection`}];
};

export async function loader({request, params, context}) {
  const {handle} = params;
  const {storefront} = context;
  const paginationVariables = getPaginationVariables(request, {
    pageBy: 8,
  });
  const {collectionHandle} = params;
  const searchParams = new URL(request.url).searchParams;
  const knownFilters = ['productVendor', 'productType'];
  const available = 'available';
  const variantOption = 'variantOption';
  const {sortKey, reverse} = getSortValuesFromParam(searchParams.get('sort'));
  const filters = [];
  const appliedFilters = [];

  for (const [key, value] of searchParams.entries()) {
    if (available === key) {
      filters.push({available: value === 'true'});
      appliedFilters.push({
        label: value === 'true' ? 'In stock' : 'Out of stock',
        urlParam: {
          key: available,
          value,
        },
      });
    } else if (knownFilters.includes(key)) {
      filters.push({[key]: value});
      appliedFilters.push({label: value, urlParam: {key, value}});
    } else if (key.includes(variantOption)) {
      const [name, val] = value.split(':');
      filters.push({variantOption: {name, value: val}});
      appliedFilters.push({label: val, urlParam: {key, value}});
    }
  }

  if (searchParams.has('minPrice') || searchParams.has('maxPrice')) {
    const price = {};
    if (searchParams.has('minPrice')) {
      price.min = Number(searchParams.get('minPrice')) || 0;
      appliedFilters.push({
        label: `Min: $${price.min}`,
        urlParam: {key: 'minPrice', value: searchParams.get('minPrice')},
      });
    }
    if (searchParams.has('maxPrice')) {
      price.max = Number(searchParams.get('maxPrice')) || 0;
      appliedFilters.push({
        label: `Max: $${price.max}`,
        urlParam: {key: 'maxPrice', value: searchParams.get('maxPrice')},
      });
    }
    filters.push({
      price,
    });
  }

  if (!handle) {
    return redirect('/collections');
  }

  const {collection, collections} = await storefront.query(COLLECTION_QUERY, {
    variables: {
      handle,
      ...paginationVariables,
      filters,
      sortKey,
      reverse,
      language: context.storefront.i18n.language,
    },
  });

  if (!collection) {
    throw new Response(`Collection ${handle} not found`, {
      status: 404,
    });
  }
  const seo = seoPayload.collection({collection, url: request.url});

  return json({
    collection,
    collections: flattenConnection(collections),
    appliedFilters,
    analytics: {
      pageType: AnalyticsPageType.collection,
      collectionHandle,
      resourceId: collection.id,
    },
    seo,
  });
}

export default function Collection() {
  const {collection, appliedFilters, collections} = useLoaderData();
  const {products, image, handle, title} = collection;
  console.log('collection', collection);

  const items = [
    {label: 'Featured', key: 'featured'},
    {
      label: 'Price: Low - High',
      key: 'price-low-high',
    },
    {
      label: 'Price: High - Low',
      key: 'price-high-low',
    },
    {
      label: 'Best Selling',
      key: 'best-selling',
    },
    {
      label: 'Newest',
      key: 'newest',
    },
  ];
  const location = useLocation();
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const activeItem = items.find((item) => item.key === params.get('sort'));

  const handleSortChange = (event) => {
    const selectedSortOption = event.target.value;
    navigateToSort(selectedSortOption);
  };

  const navigateToSort = (selectedSortOption) => {
    const newUrl = getSortLink(selectedSortOption);
    navigate(newUrl);
  };

  const getSortLink = (sort) => {
    const params = new URLSearchParams(location.search);
    params.set('sort', sort);
    return `${location.pathname}?${params.toString()}`;
  };

  return (
    <main className="abt_sec">
      <section className="main_arrivals">
        <div className="main_arrivals_banner">
          <div className="arrivals_banner_img">
            <img src={NewArrival} alt="" />
            <div className="arrivals_content flex align_center justify_center">
              <h2>{title}</h2>
            </div>
          </div>
        </div>
      </section>

      <section>
        <div className="container">
          <div className="spacer">
            <div className="main_filter flex">
              <Filter
                filters={products.filters}
                appliedFilters={appliedFilters}
              />

              <div className="right_filter">
                <div className="right_filter_head flex justify_between">
                  <h4>{products.nodes.length} Products</h4>
                  <select
                    name="sort_filter"
                    id="sort_filter"
                    value={activeItem ? activeItem.key : ''}
                    onChange={handleSortChange}
                  >
                    {items.map((item) => (
                      <option key={item.key} value={item.key}>
                        {item.label}
                      </option>
                    ))}
                  </select>
                </div>

                <Pagination connection={products}>
                  {({nodes, isLoading, PreviousLink, NextLink}) => (
                    <>
                      <div className="main_product flex">
                        {nodes.map((product, i) => {
                          console.log('collection', product);
                          return (
                            <ProductCard
                              key={product.id}
                              loading={getImageLoadingPriority(i)}
                              product={product}
                            />
                          );
                        })}
                      </div>
                      {!isLoading && (
                        <>
                          <PreviousLink>
                            <button className="btn">Previous</button>
                          </PreviousLink>

                          <div className="product_more_btn">
                            <NextLink>
                              <button className="btn">Load More</button>
                            </NextLink>
                          </div>
                        </>
                      )}
                    </>
                  )}
                </Pagination>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section>
        <div className="container">
          <div className="spacer">
            <div className="section_title">
              <h2>Shop By Interest</h2>
            </div>
            <div id="interest">
              <Swiper
                loop={true}
                spaceBetween={20}
                slidesPerView={6}
                modules={[Navigation]}
                navigation={{clickable: true}}
                breakpoints={{
                  100: {
                    slidesPerView: 1,
                    spaceBetween: 20,
                  },
                  200: {
                    slidesPerView: 2,
                    spaceBetween: 20,
                  },
                  415: {
                    slidesPerView: 2,
                    spaceBetween: 20,
                  },
                  501: {
                    slidesPerView: 3,
                    spaceBetween: 20,
                  },
                  700: {
                    slidesPerView: 4,
                    spaceBetween: 20,
                  },
                  1000: {
                    slidesPerView: 5,
                    spaceBetween: 20,
                  },
                  1100: {
                    slidesPerView: 5,
                    spaceBetween: 20,
                  },
                  1300: {
                    slidesPerView: 6,
                    spaceBetween: 20,
                  },
                }}
              >
                {collections.map((data) => {
                  console.log('data', data);
                  return (
                    <SwiperSlide key={data.id}>
                      <div className="interest_content">
                        <div className="interest_img">
                          <a href={`/collections/${data.handle}`}>
                            <img src={data.image?.url} alt="Collection-Image" />
                          </a>
                        </div>
                        <a href={`/collections/${data.handle}`}>{data.title}</a>
                      </div>
                    </SwiperSlide>
                  );
                })}
              </Swiper>
            </div>
          </div>
        </div>
      </section>

      <section>
        <div className="container">
          <div className="spacer">
            <div className="main_discount_banner flex align_center">
              <div className="discount_vector">
                <img src={Discount} alt="" />
              </div>
              <div className="discount_content">
                <h4>Do you want a 10% discount for your first purchase?</h4>
                <p>Join our newsletter and get discount</p>
                <input type="email" placeholder="Enter your email address" />
                <div className="discount_btn">
                  <a href="#" className="btn">
                    Subscribe
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

const COLLECTION_QUERY = `#graphql
  query CollectionDetails(
    $handle: String!
    $language: LanguageCode
    $filters: [ProductFilter!]
    $sortKey: ProductCollectionSortKeys!
    $reverse: Boolean
    $first: Int
    $last: Int
    $startCursor: String
    $endCursor: String
  ) @inContext(language: $language) {
    collection(handle: $handle) {
      id
      handle
      title
      description
      seo {
        description
        title
      }
      image {
        id
        url
        width
        height
        altText
      }
      products(
        first: $first,
        last: $last,
        before: $startCursor,
        after: $endCursor,
        filters: $filters,
        sortKey: $sortKey,
        reverse: $reverse
      ) {
        filters {
          id
          label
          type
          values {
            id
            label
            count
            input
          }
        }
        nodes {
          ...ProductCard
        }
        pageInfo {
          hasPreviousPage
          hasNextPage
          startCursor
          endCursor
        }
      }
    }
    collections(first: 100) {
      edges {
        node {
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
      }
    }
  }
  ${PRODUCT_CARD_FRAGMENT}
`;
function getSortValuesFromParam(sortParam) {
  switch (sortParam) {
    case 'price-high-low':
      return {
        sortKey: 'PRICE',
        reverse: true,
      };
    case 'price-low-high':
      return {
        sortKey: 'PRICE',
        reverse: false,
      };
    case 'best-selling':
      return {
        sortKey: 'BEST_SELLING',
        reverse: false,
      };
    case 'newest':
      return {
        sortKey: 'CREATED',
        reverse: true,
      };
    case 'featured':
      return {
        sortKey: 'MANUAL',
        reverse: false,
      };
    default:
      return {
        sortKey: 'RELEVANCE',
        reverse: false,
      };
  }
}
/** @typedef {import('@shopify/remix-oxygen').LoaderFunctionArgs} LoaderFunctionArgs */
/** @template T @typedef {import('@remix-run/react').MetaFunction<T>} MetaFunction */
/** @typedef {import('storefrontapi.generated').ProductItemFragment} ProductItemFragment */
/** @typedef {import('@shopify/remix-oxygen').SerializeFrom<typeof loader>} LoaderReturnData */
