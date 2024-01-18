import {Suspense, useState} from 'react';
import {defer, redirect} from '@shopify/remix-oxygen';
import {Await, useLoaderData} from '@remix-run/react';
import data from '../json/product.json';
import {
  Image,
  Money,
  VariantSelector,
  getSelectedProductOptions,
  AnalyticsPageType,
} from '@shopify/hydrogen';
import {MEDIA_FRAGMENT, PRODUCT_CARD_FRAGMENT} from '~/data/fragments';
import {Swiper, SwiperSlide} from 'swiper/react';
import {Navigation, Thumbs} from 'swiper/modules';
import Star1 from '../image/1star.png';
import Truck from '../image/truck.svg';
import {routeHeaders} from '~/data/cache';
import invariant from 'tiny-invariant';
import {seoPayload} from '~/lib/seo.server';
import {AddToCartButton} from '~/components';

export const meta = ({data}) => {
  return [{title: `Hydrogen | ${data?.product.title ?? ''}`}];
};

export const headers = routeHeaders;

export async function loader({params, request, context}) {
  const {productHandle} = params;
  invariant(productHandle, 'Missing productHandle param, check route filename');

  const selectedOptions = getSelectedProductOptions(request);

  const {shop, product} = await context.storefront.query(PRODUCT_QUERY, {
    variables: {
      handle: productHandle,
      selectedOptions,
      country: context.storefront.i18n.country,
      language: context.storefront.i18n.language,
    },
  });

  // In order to show which variants are available in the UI, we need to query
  // all of them. But there might be a *lot*, so instead separate the variants
  // into it's own separate query that is deferred. So there's a brief moment
  // where variant options might show as available when they're not, but after
  // this deferred query resolves, the UI will update.
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
  const {selectedVariant} = product;
  const [productsData, setProductsData] = useState(data);
  const {sections, order} = productsData;

  return (
    <main className="abt_sec">
      {Object.keys(sections).map((sectionKey) => {
        return renderSection(sections, sectionKey, {
          product,
          selectedVariant,
          variants,
        });
      })}
    </main>
  );
}

function renderSection(sections, sectionKey, props) {
  const section = sections[sectionKey];
  switch (section.type) {
    case 'main-product':
      return MainProductSection({section, ...props});
    case 'multirow':
      return MultirowSection({section, ...props});
    case 'related-products':
      return RelatedProductsSection({section, ...props});
    case 'featured-blog':
      return FeaturedBlogSection({section, ...props});
    default:
      return null;
  }
}

function MainProductSection({section, product, selectedVariant, variants}) {
  return (
    <section>
      <div className="container">
        <div className="spacer">
          <div className="main_product_detail flex align_center">
            <ProductImage image={product.media} />
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

function ProductImage({image}) {
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  // if (!image) {
  //   return <div className="product-image" />;
  // }
  return (
    <div className="left_product_detail">
    <div className="left_pro_detail_slider">
      <Swiper
        thumbsSlider=""
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
        {image.nodes?.map((img) => (
          <SwiperSlide key={img.id}>
            <div className="pro_thumb_detail_img">
              <Image
                src={img.image.url}
                alt="pro-detail"
                height="120px"
                width="120px"
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>

    <Swiper
      id="product_detail"
      modules={[Thumbs]}
      thumbs={{
        swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null,
      }}
      loop={true}
      spaceBetween={10}
      slidesPerView={1}
      effect="fade"
    >
      {image.nodes?.map((img) => (
        <SwiperSlide key={img.id}>
          <div className="pro_detail_img">
            <Image
              src={img.image.url}
              alt="pro-detail"
              height="120px"
              width="120px"
            />
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  </div>
  );
}

function MultirowSection() {}

function RelatedProductsSection() {}

function FeaturedBlogSection() {}

function ProductForm({variants}) {
  console.log(
    'product, selectedVariant, variants',

    variants,
  );
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
              ? option.values.map(({value, to}) => <h4>{value}</h4>)
              : option.values.map(({value, to}) => <h4>{value}</h4>)}
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
          {selectedVariant && (
            <>
              {isOutOfStock ? (
                <button className="btn" disabled={isOutOfStock}>
                  <span>Sold out</span>
                </button>
              ) : (
                <AddToCartButton
                  title="Add To Cart"
                  disabled={
                    !selectedVariant || !selectedVariant.availableForSale
                  }
                  lines={[
                    {
                      merchandiseId: selectedVariant.id,
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
            </>
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
    $country: CountryCode
    $language: LanguageCode
    $handle: String!
  ) @inContext(country: $country, language: $language) {
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
