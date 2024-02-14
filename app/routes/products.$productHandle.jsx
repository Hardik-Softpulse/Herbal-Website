import {Suspense, useState} from 'react';
import {defer, redirect} from '@shopify/remix-oxygen';
import {Await, Link, useLoaderData} from '@remix-run/react';
import data from '../json/product.json';
import {
  Image,
  Money,
  VariantSelector,
  getSelectedProductOptions,
  AnalyticsPageType,
  flattenConnection,
} from '@shopify/hydrogen';
import {MEDIA_FRAGMENT, PRODUCT_CARD_FRAGMENT} from '~/data/fragments';
import {Swiper, SwiperSlide} from 'swiper/react';
import {Navigation, Thumbs, Zoom} from 'swiper/modules';
import Star1 from '../image/1star.png';
import Truck from '../image/truck.svg';
import {routeHeaders} from '~/data/cache';
import invariant from 'tiny-invariant';
import {seoPayload} from '~/lib/seo.server';
import {AddToCartButton, BestSeller, NewArrival} from '~/components';

export const meta = ({data}) => {
  return [{title: `Hydrogen | ${data?.product.title ?? ''}`}];
};

export const headers = routeHeaders;
const BLOG_HANDLE = 'news';

export async function loader({params, request, context}) {
  const {language, country} = context.storefront.i18n;
  const {productHandle} = params;
  invariant(productHandle, 'Missing productHandle param, check route filename');

  const selectedOptions = getSelectedProductOptions(request);

  const {shop, product} = await context.storefront.query(PRODUCT_QUERY, {
    variables: {
      handle: productHandle,
      selectedOptions,
      language: context.storefront.i18n.language,
    },
  });

  const variants = context.storefront.query(VARIANTS_QUERY, {
    variables: {
      handle: productHandle,
      language: context.storefront.i18n.language,
    },
  });

  if (!product?.id) {
    throw new Response('product', {status: 404});
  }

  if (!product.selectedVariant) {
    return redirectToFirstVariant({product, request});
  }

  const recommended = getRecommendedProducts(context.storefront, product.id);
  const firstVariant = product.variants.nodes[0];
  const selectedVariant = product.selectedVariant ?? firstVariant;

  const productAnalytics = {
    productGid: product.id,
    variantGid: selectedVariant.id,
    name: product.title,
    variantName: selectedVariant.title,
    brand: product.vendor,
    price: selectedVariant.price.amount,
  };

  const seo = seoPayload.product({
    product,
    selectedVariant,
    url: request.url,
  });

  const data = context.storefront.query(FEATURED_ITEMS_QUERY, {
    variables: {
      language: context.storefront.i18n.language,
    },
  });

  const {blog} = await context.storefront.query(BLOGS_ITEM, {
    variables: {
      blogHandle: BLOG_HANDLE,
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
    variants,
    product,
    shop,
    storeDomain: shop.primaryDomain.url,
    recommended,
    analytics: {
      pageType: AnalyticsPageType.product,
      resourceId: product.id,
      products: [productAnalytics],
      totalValue: parseFloat(selectedVariant.price.amount),
    },
    seo,
    data,
    articles,
    seoblog,
  });
}

function redirectToFirstVariant({product, request}) {
  const searchParams = new URLSearchParams(new URL(request.url).search);
  const firstVariant = product.variants.nodes[0];
  for (const option of firstVariant.selectedOptions) {
    searchParams.set(option.name, option.value);
  }

  throw redirect(`/products/${product.handle}?${searchParams.toString()}`, 302);
}

export default function Product() {
  const {product, variants} = useLoaderData();
  const [productsData, setProductsData] = useState(data);

  return (
    <main className="abt_sec">
      {productsData.order?.map((sectionKey) => {
        const section = data.sections[sectionKey];
        switch (section.type) {
          case 'main-product':
            return (
              <MainProduct
                key={sectionKey}
                data={section}
                product={product}
                variants={variants}
              />
            );
          case 'multicolumn':
            return <MultiColumn key={sectionKey} data={section} />;
          case 'multirow':
            return <MultiRow key={sectionKey} data={section} />;
          case 'related-products':
            return <RelatedProducts key={sectionKey} data={section} />;
          default:
            return null;
        }
      })}
    </main>
  );
}

function MainProduct({section, product, selectedVariant, variants}) {
  return (
    <section>
      <div className="container">
        <div className="spacer">
          <div className="main_product_detail flex align_center">
            <ProductImage
              image={product.media}
              selectedVariant={product?.selectedVariant}
            />
            <Suspense fallback={<ProductForm variants={[]} />}>
              <Await
                errorElement="There was a problem loading related products"
                resolve={variants}
              >
                {(resp) => (
                  <ProductForm variants={resp.product?.variants.nodes || []} />
                )}
              </Await>
            </Suspense>
          </div>
        </div>
      </div>
    </section>
  );
}

function ProductImage({image, selectedVariant}) {
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  const reorderedImages = [
    selectedVariant?.image,
    ...image.nodes.filter((img) => img !== selectedVariant?.image),
  ];

  return (
    <div className="left_product_detail">
      <div className="left_pro_detail_slider">
        <Swiper
          id="product_detail_thumb"
          modules={[Navigation, Thumbs]}
          navigation={true}
          loop={true}
          direction="vertical"
          spaceBetween={10}
          slidesPerView={4}
          slideToClickedSlide={true}
          breakpoints={{
            100: {
              slidesPerView: 4,
              spaceBetween: 10,
              direction: 'horizontal',
            },
            767: {
              slidesPerView: 4,
              spaceBetween: 10,
              direction: 'horizontal',
            },
            768: {
              slidesPerView: 4,
              spaceBetween: 10,
              direction: 'vertical',
            },
          }}
          onSwiper={setThumbsSwiper}
        >
          {reorderedImages?.map((img) => (
            <SwiperSlide key={img.id}>
              <div className="pro_thumb_detail_img">
                {img?.mediaContentType === 'VIDEO' ? (
                  <video controls height="100px" width="100px">
                    <source
                      src={img.sources[0]?.url}
                      type={img.sources[0]?.mimeType}
                    />
                  </video>
                ) : (
                  <Image src={img?.url ?? img.image?.url} alt="pro-detail" />
                )}
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      <Swiper
        id="product_detail"
        modules={[Thumbs, Zoom]}
        zoom={true}
        thumbs={{
          swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null,
        }}
        loop={true}
        spaceBetween={10}
        slidesPerView={1}
        effect="fade"
      >
        {reorderedImages?.map((img) => (
          <SwiperSlide key={img.id}>
            <div className="pro_detail_img">
              {img?.mediaContentType === 'VIDEO' ? (
                <video controls>
                  <source
                    src={img.sources[0]?.url}
                    type={img.sources[0]?.mimeType}
                  />
                </video>
              ) : (
                <div className="swiper-zoom-container">
                  <Image src={img?.url ?? img.image?.url} alt="pro-detail" />{' '}
                </div>
              )}
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

function ProductForm({variants}) {
  const [quantity, setQuantity] = useState(1);
  const {product, shop, analytics} = useLoaderData();

  const selectedVariant = product.selectedVariant;
  const isOutOfStock = !selectedVariant?.availableForSale;

  const productAnalytics = {
    ...analytics.products[0],
    quantity: quantity,
  };

  const calculatePercentageDifference = (compareAtPrice, price) => {
    if (
      compareAtPrice !== null &&
      price !== null &&
      !isNaN(compareAtPrice) &&
      !isNaN(price)
    ) {
      const percentageDifference =
        ((compareAtPrice - price) / compareAtPrice) * 100;
      return percentageDifference.toFixed(0);
    } else {
      return null;
    }
  };

  const compareAtPrice = selectedVariant?.compareAtPrice?.amount;
  const price = selectedVariant?.price?.amount;

  const percentageDifferenceResult = calculatePercentageDifference(
    compareAtPrice,
    price,
  );

  const increaseQuantity = () => {
    setQuantity((prevQuantity) => prevQuantity + 1);
  };

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity((prevQuantity) => prevQuantity - 1);
    }
  };

  return (
    <div className="right_product_detail">
      <h6>{product.vendor}</h6>
      <h2>{product.title}</h2>
      <div className="pro_detail_star flex align_center">
        <img src={Star1} alt="" />
        <span>50 Reviews</span>
      </div>
      <div className="pro_detail_price flex align_center">
        <h3>
          <Money
            measurement
            withoutTrailingZeros
            data={selectedVariant.price}
          />
        </h3>
        <s>
          {selectedVariant?.compareAtPrice === null ? (
            ''
          ) : (
            <Money
              withoutTrailingZeros
              data={selectedVariant?.compareAtPrice}
            />
          )}
        </s>
        {percentageDifferenceResult !== null ? (
          <span className="discount">{`${percentageDifferenceResult}%`}</span>
        ) : (
          <></>
        )}
      </div>
      <div className="pro_detail_P">
        <p>{product.description}</p>
      </div>
      <VariantSelector
        handle={product.handle}
        options={product.options}
        variants={variants}
      >
        {({option, id}) => (
          <div className="pro_detail_size flex align_center">
            <h5>{option.name}:</h5>
            {option.values.length > 7
              ? option.values.map(({value, to}) => {
                  const data = selectedVariant.selectedOptions.some(
                    (option) => option.value === value,
                  );
                  return (
                    <Link
                      key={option.name + value}
                      to={to}
                      preventScrollReset
                      prefetch="intent"
                      replace
                    >
                      <h4 className={data === true ? 'active' : ''}>{value}</h4>
                    </Link>
                  );
                })
              : option.values.map(({value, to}) => {
                  const data = selectedVariant.selectedOptions.some(
                    (option) => option.value === value,
                  );
                  return (
                    <Link
                      key={option.name + value}
                      to={to}
                      preventScrollReset
                      prefetch="intent"
                      replace
                    >
                      <h4 className={data === true ? 'active' : ''}>{value}</h4>
                    </Link>
                  );
                })}
          </div>
        )}
      </VariantSelector>

      <div className="pro_detail_add_cart flex align_center">
        <div className="num-block skin-2">
          <div className="num-in">
            <span className="minus dis" onClick={decreaseQuantity}></span>
            <input type="text" className="in-num" value={quantity} readOnly />
            <span className="plus" onClick={increaseQuantity}></span>
          </div>
        </div>

        <div className="add_to_cart_btn">
          {selectedVariant?.availableForSale === false ? (
            <button variant="secondary" disabled={isOutOfStock} className="btn">
              <span>Sold out</span>
            </button>
          ) : (
            <AddToCartButton
              onClick={() => {
                window.location.href = window.location.href + '#cart-aside';
              }}
              title="Add to cart"
              lines={[
                {
                  merchandiseId: selectedVariant?.id,
                  quantity: quantity,
                },
              ]}
              variant="primary"
              data-test="add-to-cart"
              analytics={{
                products: [productAnalytics],
                totalValue: parseFloat(productAnalytics.price),
              }}
              className="btn"
            />
          )}
        </div>
      </div>
      <div className="pro_detail_fast_vector flex">
        <img src={Truck} alt="" />
        <p>Free Shipping on orders over $64</p>
      </div>
      <div className="pro_detail_highlight">
        <h4>Highlight</h4>
        <ul>
          <li className="flex align_center">
            <p>
              Full-body wellness with six powerful, best-selling supplements.*
            </p>
          </li>
          <li className="flex align_center">
            <p>
              Perfect for the wellness warrior, supplement aficionado, or herbal
              enthusiast.
            </p>
          </li>
          <li className="flex align_center">
            <p>
              Full-body wellness with six powerful, best-selling supplements.*
            </p>
          </li>
          <li className="flex align_center">
            <p>
              Perfect for the wellness warrior, supplement aficionado, or herbal
              enthusiast.
            </p>
          </li>
        </ul>
      </div>
    </div>
  );
}

function MultiColumn({data}) {
  const {block_order, blocks, settings} = data;
  return (
    <section>
      <div className="container">
        <div className="spacer">
          <div className="section_title">
            <h2>{settings.title}</h2>
          </div>
          <div className="main_clean flex justify_center">
            {block_order.map((blockId) => {
              const {settings} = blocks[blockId];
              return (
                <div className="clean">
                  <div className="clean_img">
                    <div
                      dangerouslySetInnerHTML={{__html: settings.svgIcons}}
                    ></div>
                  </div>
                  <p> {settings.title}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

function MultiRow({data}) {
  const {row_PBzXmV, row_wHPGzk} = data.blocks;
  return (
    <section>
      <div className="container">
        <div className="spacer">
          <div className="main_highlight_sec flex align_center">
            <div className="left_highlight_sec">
              <h5>{row_PBzXmV.settings.caption}</h5>
              <h6>{row_PBzXmV.settings.heading}</h6>
              <div className="highlight_sec_point">
                <p
                  dangerouslySetInnerHTML={{__html: row_PBzXmV.settings.text}}
                ></p>
              </div>
            </div>
            <div className="right_highlight_img">
              <img
                src={row_PBzXmV.settings.image}
                alt="highlight"
                height="700px"
                width="700px"
              />
            </div>
          </div>
          <div className="main_highlight_sec2 flex align_center">
            <div className="left_highlight_sec">
              <h5>{row_wHPGzk.settings.caption}</h5>
              <h6>{row_wHPGzk.settings.heading}</h6>
              <div className="highlight_sec_point">
                {/* <h3>Helps relieve occasional coughs*</h3> */}
                <p
                  dangerouslySetInnerHTML={{__html: row_wHPGzk.settings.text}}
                ></p>
              </div>
            </div>
            <div className="right_highlight_img">
              <img
                src={row_wHPGzk.settings.image}
                alt="highlight"
                height="700px"
                width="700px"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function RelatedProducts() {
  const {data} = useLoaderData();

  return (
    <Suspense>
      <Await
        resolve={data}
        errorElement="There was a problem loading related products"
      >
        {(datas) => (
          <NewArrival
            product={datas.featuredProducts.nodes}
            title="You may also like"
          />
        )}
      </Await>
    </Suspense>
  );
}

function FeaturedBlogSection() {
  const {articles, seoblog} = useLoaderData();
  return (
    <section>
      <div className="container">
        <div className="spacer">
          <div className="section_title">
            <h2>Know More from Blog</h2>
          </div>
          <div className="main_blog flex">
            {articles.map((data) => {
              return (
                <div className="blog">
                  <div className="blog_img">
                    <Image
                      src={data.image.url}
                      alt="blog"
                      width="453px"
                      height="197px"
                    />
                  </div>
                  <div className="blog_content">
                    <h2>{data.title}</h2>
                    <p dangerouslySetInnerHTML={{__html: data.contentHtml}}></p>
                    <Link
                      to={`/${BLOG_HANDLE}/${data.handle}`}
                      className="blog-img"
                    >
                      Read More
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="product_btn">
            <Link to={`/${BLOG_HANDLE}`} className="btn">
              View All
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

const PRODUCT_VARIANT_FRAGMENT = `#graphql
  fragment ProductVariantFragment on ProductVariant {
    id
    availableForSale
    selectedOptions {
      name
      value
    }
    image {
      id
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
    sku
    title
    unitPrice {
      amount
      currencyCode
    }
    product {
      title
      handle
    }
  }
`;

const PRODUCT_QUERY = `#graphql
  query Product(
    $language: LanguageCode
    $handle: String!
    $selectedOptions: [SelectedOptionInput!]!
  ) @inContext(language: $language) {
    product(handle: $handle) {
      id
      title
      vendor
      handle
      descriptionHtml
      description
      options {
        name
        values
      }
      selectedVariant: variantBySelectedOptions(selectedOptions: $selectedOptions) {
        ...ProductVariantFragment
      }
      media(first: 7) {
        nodes {
          ...Media
        }
      }
      variants(first: 1) {
        nodes {
          ...ProductVariantFragment
        }
      }
      seo {
        description
        title
      }
    }
    shop {
      name
      primaryDomain {
        url
      }
      shippingPolicy {
        body
        handle
      }
      refundPolicy {
        body
        handle
      }
    }
  }
  ${MEDIA_FRAGMENT}
  ${PRODUCT_VARIANT_FRAGMENT}
`;

const VARIANTS_QUERY = `#graphql
  query variants(
    $language: LanguageCode
    $handle: String!
  ) @inContext( language: $language) {
    product(handle: $handle) {
      variants(first: 250) {
        nodes {
          ...ProductVariantFragment
        }
      }
    }
  }
  ${PRODUCT_VARIANT_FRAGMENT}
`;

const RECOMMENDED_PRODUCTS_QUERY = `#graphql
  query productRecommendations(
    $productId: ID!
    $count: Int
    $language: LanguageCode
  ) @inContext( language: $language) {
    recommended: productRecommendations(productId: $productId) {
      ...ProductCard
    }
    additional: products(first: $count, sortKey: BEST_SELLING) {
      nodes {
        ...ProductCard
      }
    }
  }
  ${PRODUCT_CARD_FRAGMENT}
`;

async function getRecommendedProducts(storefront, productId) {
  const products = await storefront.query(RECOMMENDED_PRODUCTS_QUERY, {
    variables: {productId, count: 12},
  });

  invariant(products, 'No data returned from Shopify API');

  const mergedProducts = (products.recommended ?? [])
    .concat(products.additional.nodes)
    .filter(
      (value, index, array) =>
        array.findIndex((value2) => value2.id === value.id) === index,
    );

  const originalProduct = mergedProducts.findIndex(
    (item) => item.id === productId,
  );

  mergedProducts.splice(originalProduct, 1);

  return {nodes: mergedProducts};
}

export const FEATURED_ITEMS_QUERY = `#graphql
  query FeaturedItems{
    featuredProducts: products(first: 4) {
      nodes {
        ...ProductCard
      }
    }
  }

  ${PRODUCT_CARD_FRAGMENT}
  `;
const BLOGS_ITEM = `#graphql
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
  }
  `;
