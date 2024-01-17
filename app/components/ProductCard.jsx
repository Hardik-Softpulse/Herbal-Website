import {flattenConnection, Image, Money, useMoney} from '@shopify/hydrogen';
import {isDiscounted, isNewArrival} from '~/lib/utils';
import {getProductPlaceholder} from '~/lib/placeholders';
import {useEffect, useState} from 'react';

export function ProductCard({product, label}) {
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
          <Image
            src={image?.url}
            alt={`Picture of ${product.title}`}
            height="450px"
            width="340px"
          />
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
              <CompareAtPrice className="o-price" data={compareAtPrice} />
            )}
          </s>
          {compareAtPrice === null
            ? ''
            : availableForSale == true && (
                <span>{`${percentageDifferenceResult}%`}</span>
              )}
        </div>
      </div>
    </div>
    // <div className={`product-item ${className}`}>
    //   <Link
    //     className="product-img "
    //     onClick={onClick}
    //     to={`/products/${product.handle}`}
    //     prefetch="intent"
    //   >
    //     <Image src={image?.url} alt={image?.altText} loading={loading} />
    //     {compareAtPrice === null
    //       ? ''
    //       : availableForSale == true && (
    //           <div className="product-tag sale-tag">{`Sale ${percentageDifferenceResult}%`}</div>
    //         )}
    //   </Link>
    //   <h5>
    //     <Link
    //       onClick={onClick}
    //       to={`/products/${product.handle}`}
    //       prefetch="intent"
    //       className="product-title"
    //     >
    //       {product.title}
    //     </Link>
    //   </h5>
    //   <div className="product-price">
    //     <span className="s-price">
    //       <Money withoutTrailingZeros data={price} />
    //     </span>
    //     {compareAtPrice === null ? (
    //       ''
    //     ) : (
    //       <span className="o-price">
    //         <Money withoutTrailingZeros data={compareAtPrice} />
    //       </span>
    //     )}
    //     {/* <span className="item-stocks">
    //       {availableForSale == true ? (
    //         <span style={{color: 'green'}}>In stock</span>
    //       ) : (
    //         <span style={{color: 'red'}}>Out stock</span>
    //       )}
    //     </span> */}
    //     <div className="quickshop" onClick={(e) => openModal(product)}>
    //       <span className="ts-tooltip button-tooltip">Quick view</span>
    //       <svg
    //         xmlns="http://www.w3.org/2000/svg"
    //         xmlnsXlink="http://www.w3.org/1999/xlink"
    //         fill="#000000"
    //         version="1.1"
    //         id="Capa_1"
    //         width="70px"
    //         height="70px"
    //         viewBox="0 0 442.04 442.04"
    //         xmlSpace="preserve"
    //       >
    //         <g id="SVGRepo_bgCarrier" strokeWidth="0" />
    //         <g
    //           id="SVGRepo_tracerCarrier"
    //           strokeLinecap="round"
    //           strokeLinejoin="round"
    //         />
    //         <g id="SVGRepo_iconCarrier">
    //           {' '}
    //           <g>
    //             {' '}
    //             <g>
    //               {' '}
    //               <path d="M221.02,341.304c-49.708,0-103.206-19.44-154.71-56.22C27.808,257.59,4.044,230.351,3.051,229.203 c-4.068-4.697-4.068-11.669,0-16.367c0.993-1.146,24.756-28.387,63.259-55.881c51.505-36.777,105.003-56.219,154.71-56.219 c49.708,0,103.207,19.441,154.71,56.219c38.502,27.494,62.266,54.734,63.259,55.881c4.068,4.697,4.068,11.669,0,16.367 c-0.993,1.146-24.756,28.387-63.259,55.881C324.227,321.863,270.729,341.304,221.02,341.304z M29.638,221.021 c9.61,9.799,27.747,27.03,51.694,44.071c32.83,23.361,83.714,51.212,139.688,51.212s106.859-27.851,139.688-51.212 c23.944-17.038,42.082-34.271,51.694-44.071c-9.609-9.799-27.747-27.03-51.694-44.071 c-32.829-23.362-83.714-51.212-139.688-51.212s-106.858,27.85-139.688,51.212C57.388,193.988,39.25,211.219,29.638,221.021z" />{' '}
    //             </g>{' '}
    //             <g>
    //               {' '}
    //               <path d="M221.02,298.521c-42.734,0-77.5-34.767-77.5-77.5c0-42.733,34.766-77.5,77.5-77.5c18.794,0,36.924,6.814,51.048,19.188 c5.193,4.549,5.715,12.446,1.166,17.639c-4.549,5.193-12.447,5.714-17.639,1.166c-9.564-8.379-21.844-12.993-34.576-12.993 c-28.949,0-52.5,23.552-52.5,52.5s23.551,52.5,52.5,52.5c28.95,0,52.5-23.552,52.5-52.5c0-6.903,5.597-12.5,12.5-12.5 s12.5,5.597,12.5,12.5C298.521,263.754,263.754,298.521,221.02,298.521z" />{' '}
    //             </g>{' '}
    //             <g>
    //               {' '}
    //               <path d="M221.02,246.021c-13.785,0-25-11.215-25-25s11.215-25,25-25c13.786,0,25,11.215,25,25S234.806,246.021,221.02,246.021z" />{' '}
    //             </g>{' '}
    //           </g>{' '}
    //         </g>
    //       </svg>
    //     </div>
    //   </div>

    //   <div
    //     id="ts-quickshop-modal"
    //     className={`ts-popup-modal ${isModalOpen ? 'show' : ''}`}
    //   >
    //     <div className="overlay" onClick={closeModal}></div>
    //     <QuickView onClose={closeModal} product={modalData} />
    //   </div>
    // </div>
  );
}

function CompareAtPrice({data, className}) {
  const {currencyNarrowSymbol, withoutTrailingZerosAndCurrency} =
    useMoney(data);
  const styles = ('strike', className);

  return (
    <span className={styles}>
      {currencyNarrowSymbol}
      {withoutTrailingZerosAndCurrency}
    </span>
  );
}
