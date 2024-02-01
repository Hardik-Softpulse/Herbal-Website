import {Await, Link} from '@remix-run/react';
import {
  Image,
  Money,
  VariantSelector,
  flattenConnection,
} from '@shopify/hydrogen';
import React, {Suspense, useState} from 'react';
import {Swiper, SwiperSlide} from 'swiper/react';
import {Navigation, Thumbs} from 'swiper/modules';
import Truck from '../image/truck.svg';
import Star1 from '../image/1star.png';
import {AddToCartButton} from './AddToCartButton';
// import AddToCartButton from './AddToCartButton'

export default function QuickView({product}) {
  return (
    <div className="main_product_detail flex align_center">
      <ProductImage image={product.media} />
      <Suspense fallback={<ProductForm variants={[]} />}>
        <Await errorElement="There was a problem loading related products">
          {(resp) => (
            <ProductForm
              variants={resp?.product?.variants.nodes || []}
              products={product}
            />
          )}
        </Await>
      </Suspense>
    </div>
  );
}

function ProductImage({image}) {
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  console.log('image', image);

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
          {image?.nodes?.map((img) => (
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
                  <Image src={img.image?.url} alt="pro-detail" />
                )}
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
        {image?.nodes?.map((img) => (
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
                <Image src={img.image?.url} alt="pro-detail" />
              )}
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

function ProductForm({variants, products}) {
  const cardProduct = products?.variants ? products : getProductPlaceholder();
  if (!cardProduct?.variants?.nodes?.length) return null;
  const [productQuantity, setProductQuantity] = useState(1);
  const [productselectedVariant, setProductselectedVariant] = useState('');
  const [productFirstVariant, setProductFirstVariant] = useState(
    flattenConnection(cardProduct.variants)[0],
  );

  const {title, description} = products;
  console.log('products', products);
  const {
    id,
    product,
    price,
    selectedOptions,
    availableForSale,
    compareAtPrice,
  } = productFirstVariant;
  console.log('product', product);

  let firstVariant = productFirstVariant;
  if (!firstVariant) return null;

  const productAnalytics = {
    productGid: products.id,
    variantGid: firstVariant.id,
    name: products.title,
    variantName: firstVariant.title,
    brand: products.vendor,
    price: firstVariant.price.amount,
    quantity: productQuantity,
  };

  const handleSelectVariant = (value) => {
    const selectedVariant = products?.variants?.nodes;
    const selectedVar = selectedVariant.filter((item) =>
      item.title.includes(value),
    );
    setProductFirstVariant(selectedVar[0]);
    setProductselectedVariant(selectedVar[0].title);
  };

  return (
    <div className="right_product_detail">
      <h6>{products.vendor}</h6>
      <h2>{title}</h2>
      <div className="pro_detail_star flex align_center">
        <img src={Star1} alt="" />
        <span>50 Reviews</span>
      </div>
      <div className="pro_detail_price flex align_center">
        <h3>
          <Money measurement withoutTrailingZeros data={price} />
        </h3>
        <s>
          {compareAtPrice === null ? (
            ''
          ) : (
            <Money withoutTrailingZeros data={compareAtPrice} />
          )}
        </s>
      </div>
      <div className="pro_detail_P">
        <p>{description}</p>
      </div>
      <VariantSelector handle={products.handle} options={product.options}>
        {({option}) => (
          <div className="pro_detail_size flex align_center">
            <h5>{option.name}:</h5>
            {option.values.length > 7
              ? option.values.map(({value, to}) => {
                  return (
                    <Link
                      key={option.name + value}
                      to={to}
                      preventScrollReset
                      prefetch="intent"
                      replace
                      onClick={() => handleSelectVariant(value)}
                    >
                      <h4
                        className={
                          productselectedVariant?.includes(value)
                            ? 'active'
                            : ''
                        }
                      >
                        {value}
                      </h4>
                    </Link>
                  );
                })
              : option.values.map(({value, to}) => {
                  return (
                    <Link
                      key={option.name + value}
                      to={to}
                      preventScrollReset
                      prefetch="intent"
                      replace
                      onClick={() => handleSelectVariant(value)}
                    >
                      <h4
                        className={
                          productselectedVariant?.includes(value)
                            ? 'active'
                            : ''
                        }
                      >
                        {value}
                      </h4>
                    </Link>
                  );
                })}
          </div>
        )}
      </VariantSelector>

      <div className="pro_detail_add_cart flex align_center">
        <div className="num-block skin-2">
          <div className="num-in">
            <span
              className="minus dis"
              onClick={() =>
                setProductQuantity((prev) =>
                  prev <= 1 ? (prev = 1) : prev - 1,
                )
              }
            ></span>
            <input
              type="text"
              className="in-num"
              value={productQuantity}
              readOnly
            />
            <span
              className="plus"
              onClick={() => setProductQuantity((prev) => prev + 1)}
            ></span>
          </div>
        </div>

        <div className="add_to_cart_btn">
          {availableForSale === false ? (
            <button variant="secondary" className="btn">
              <span>Sold out</span>
            </button>
          ) : (
            <AddToCartButton
              title="Add to cart"
              lines={[
                {
                  merchandiseId: firstVariant.id,
                  quantity: productQuantity,
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
