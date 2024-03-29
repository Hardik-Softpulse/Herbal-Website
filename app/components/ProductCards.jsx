import {flattenConnection, Image, Money, useMoney} from '@shopify/hydrogen';
import {isDiscounted, isNewArrival} from '~/lib/utils';
import {getProductPlaceholder} from '~/lib/placeholders';
import {Link} from '@remix-run/react';

export function ProductCards({product, label}) {
  let cardLabel;
  const {media} = product;
  const cardProduct = product?.variants ? product : getProductPlaceholder();
  if (!cardProduct?.variants?.nodes?.length) return null;

  const firstVariant = flattenConnection(cardProduct.variants)[0];

  if (!firstVariant) return null;
  const {price, compareAtPrice, availableForSale} = firstVariant;

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
              src={media?.nodes[0]?.image?.url}
              alt={`Picture of ${product.title}`}
              height="450px"
              width="340px"
              className="image-main"
            />
            <Image
              src={media?.nodes[1]?.image?.url}
              alt={`Picture of ${product.title}`}
              height="450px"
              width="340px"
              className="image-hover"
            />
          </Link>
          {cardLabel && (
            <div className="product_top_price">
              <p>{cardLabel}</p>
            </div>
          )}
        </div>
      </div>

      <div className="product_content">
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
