import {flattenConnection, Image, Money, useMoney} from '@shopify/hydrogen';
import {isDiscounted, isNewArrival} from '~/lib/utils';
import {getProductPlaceholder} from '~/lib/placeholders';
import {Link} from '@remix-run/react';
import {useState} from 'react';
import cross from '../image/cross.svg';
import QuickView from './QuickView';

export function ProductCard({product, label}) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  let cardLabel;
  const cardProduct = product?.variants ? product : getProductPlaceholder();
  if (!cardProduct?.variants?.nodes?.length) return null;

  const firstVariant = flattenConnection(cardProduct.variants)[0];

  if (!firstVariant) return null;
  const {image, price, compareAtPrice, availableForSale} = firstVariant;

  if (label) {
    cardLabel = label;
  } else if (isDiscounted(price, compareAtPrice)) {
    cardLabel = 'Sale';
  } else if (isNewArrival(product.publishedAt)) {
    cardLabel = 'New';
  }

  const calculatePercentageDifference = (defcompareAtPrice, defprice) => {
    if (
      defcompareAtPrice !== null &&
      defprice !== null &&
      !isNaN(defcompareAtPrice) &&
      !isNaN(defprice)
    ) {
      const percentageDifference =
        ((defcompareAtPrice - defprice) / defcompareAtPrice) * 100;
      return percentageDifference.toFixed(0);
    } else {
      return null;
    }
  };

  const defcompareAtPrice = compareAtPrice?.amount;
  const defprice = price?.amount;

  const percentageDifferenceResult = calculatePercentageDifference(
    defcompareAtPrice,
    defprice,
  );

  return (
    <div className="product_item">
      <div className="product_img">
        <div className="product_img_wrap">
          <Link to={`/products/${product.handle}`}>
            <Image
              src={image?.url}
              alt={`Picture of ${product.title}`}
              height="450px"
              width="340px"
            />
          </Link>
          {cardLabel && (
            <div className="product_top_price">
              <p>{cardLabel}</p>
            </div>
          )}
          <div className="product_quick_hvr">
            <button
              className="quick-view-btn normal-case"
              onClick={() => setIsModalOpen(!isModalOpen)}
            >
              Quick Views
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                fill="currentColor"
                className="bi bi-eye ms-2"
                viewBox="0 0 16 16"
              >
                <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8M1.173 8a13 13 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5s3.879 1.168 5.168 2.457A13 13 0 0 1 14.828 8q-.086.13-.195.288c-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5s-3.879-1.168-5.168-2.457A13 13 0 0 1 1.172 8z" />
                <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5M4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0" />
              </svg>
            </button>
          </div>

          {isModalOpen && (
            <div id="ts-quickshop-modal" className="ts-popup-modal">
              <div className="overlays">
                <button className="close_cart">
                  <img src={cross} alt="" />
                </button>
                <QuickView
                  product={product}
                  setIsModalOpen={setIsModalOpen}
                  isModalOpen={isModalOpen}
                />
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="product_content">
        {/* <p>{product.description}</p> */}
        <h4> {product.title}</h4>
        <div className="product_price flex">
          <h5>
            <Money withoutTrailingZeros data={price} />
          </h5>
          <s>
            {isDiscounted(price, compareAtPrice) && (
              <CompareAtPrice data={compareAtPrice} />
            )}
          </s>
          {compareAtPrice === null
            ? ''
            : availableForSale == true && (
                <span>{`${percentageDifferenceResult}%  off`}</span>
              )}
        </div>
      </div>
    </div>
  );
}

function CompareAtPrice({data, className}) {
  const {currencyNarrowSymbol, withoutTrailingZerosAndCurrency} =
    useMoney(data);
  const styles = ('strike', className);

  return (
    <>
      {currencyNarrowSymbol}
      {withoutTrailingZerosAndCurrency}
    </>
  );
}
