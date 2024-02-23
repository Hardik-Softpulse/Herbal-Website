import {CartForm, Image, Money} from '@shopify/hydrogen';
import {Link, useFetcher} from '@remix-run/react';
import cross from '../image/croos2.png';
import {useVariantUrl} from '~/lib/variants';
import Truck from '../image/truck.svg';
import {Suspense, useEffect} from 'react';
import {CartAction} from '~/lib/type';
import {useState} from 'react';

export function CartMain({layout, cart}) {
  console.log('cart 2', cart);
  const linesCount = Boolean(cart?.lines?.edges?.length || 0);
  const withDiscount =
    cart &&
    Boolean(cart.discountCodes?.filter((code) => code.applicable).length);
  const className = ` mini_cart  ${withDiscount ? 'with-discount' : ''}`;
  const cartHasItems = !!cart && cart.totalQuantity > 0;

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (cart) {
      setIsLoading(false);
    }
  }, [cart]);

  if (isLoading) {
    return <p>Loading cart...</p>;
  }

  return (
    <div className={layout == 'page' ? 'cartmain' : className}>
      <div className="cart_heading">
        {layout == 'page' ? (
          <div className="section_title">
            <h2>Cart({cart?.lines?.edges?.length})</h2>
          </div>
        ) : (
          <>
            <div className="cart_title flex justify_between">
              <h3>Cart ({cart?.lines?.edges?.length})</h3>
              <button
                className="close_cart"
                onClick={() => {
                  history.go(-1);

                  window.location.hash = '';
                }}
              >
                <img src={cross} alt="" />
              </button>
            </div>
            <div className="cart_head">
              <p>Your cart is reserved for 15.00 minutes</p>
            </div>
          </>
        )}
      </div>
      <CartEmpty hidden={linesCount} layout={layout} />
      <div className={layout == 'page' ? 'cartdetail' : ''}>
        <CartDetails cart={cart} layout={layout} />
        {cartHasItems && (
          <CartSummary
            cost={cart.cost}
            layout={layout}
            checkoutUrl={cart.checkoutUrl}
          />
        )}
      </div>
    </div>
  );
}

function CartDetails({layout, cart}) {
  return (
    <div className="cart_scroll">
      <CartLines lines={cart?.lines} layout={layout} />
    </div>
  );
}

function CartLines({lines, layout}) {
  if (!lines) return null;
  useEffect(() => {}, [lines]);

  return (
    <div className="main_cart_product">
      {lines.edges.map((line) => {
        const cartLineItem = line.node;

        return (
          <Suspense fallback={<p>Loading cart ...</p>}>
            <CartLineItem
              key={cartLineItem.id}
              line={cartLineItem}
              layout={layout}
            />
          </Suspense>
        );
      })}
    </div>
  );
}

function CartLineItem({layout, line}) {
  const {id, merchandise} = line;
  if (!line || typeof line?.quantity === 'undefined') return null;

  const {
    image,
    product,
    price,
    compareAtPrice,
    availableForSale,
    title,
    selectedOptions,
  } = merchandise;
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
  const defprice = price.amount;

  const percentageDifferenceResult = calculatePercentageDifference(
    defcompareAtPrice,
    defprice,
  );
  const lineItemUrl = useVariantUrl(product.handle, selectedOptions);

  return (
    <div
      className={layout == 'page' ? 'cartproduct' : 'cart_product flex'}
      key={id}
    >
      <div className="cart_product_img">
        {merchandise.image && (
          <Link to={`/products/${product?.handle}`}>
            <Image alt={image?.url} data={merchandise.image} />
          </Link>
        )}
      </div>
      <div className="cart_product_content flex justify_between">
        <div className="cart_product_info">
          <Link
            prefetch="intent"
            to={lineItemUrl}
            onClick={() => {
              if (layout === 'aside') {
                // close the drawer
                window.location.href = lineItemUrl;
              }
            }}
          >
            <p>{product.title}</p>
          </Link>
          <span>{title}</span>
          <div className="cart_product_price flex">
            <h5>
              <Money withoutTrailingZeros data={price} />
            </h5>
            {compareAtPrice === null ? (
              ''
            ) : (
              <s>
                <Money withoutTrailingZeros data={compareAtPrice} />
              </s>
            )}

            {compareAtPrice === null
              ? ''
              : availableForSale == true && (
                  <span>{`${percentageDifferenceResult}%  off`}</span>
                )}
          </div>
          <CartLineQuantity line={line} />
        </div>
        <ItemRemoveButton lineIds={id} />
      </div>
    </div>
  );
}

function ItemRemoveButton({lineIds}) {
  const fetcher = useFetcher();

  return (
    <fetcher.Form action="/cart" method="post">
      <input
        type="hidden"
        name="cartAction"
        value={CartAction.REMOVE_FROM_CART}
      />
      <input type="hidden" name="linesIds" value={JSON.stringify(lineIds)} />
      <button type="submit" className="product_cross_img">
        <img src={cross} alt="" />
      </button>
    </fetcher.Form>
  );
}

function CartCheckoutActions({checkoutUrl}) {
  if (!checkoutUrl) return null;

  return (
    <div className="cart_checkout_btn">
      <a href={checkoutUrl} target="_self">
        <button>Checkout</button>
      </a>
    </div>
  );
}

export function CartSummary({cost, layout, children = null, checkoutUrl}) {
  const className =
    layout === 'page'
      ? ' cart-summary-page'
      : ' cart_check_out cart-summary-aside';
  const originalSubtotal = cost?.subtotalAmount?.amount || 0;
  const originalTotal = cost?.totalAmount?.amount || 0;

  const discountAmount = originalSubtotal - originalTotal;
  const discountAmountNumber = parseFloat(discountAmount);
  const discountPrice = {
    amount: discountAmountNumber.toString(),
    currencyCode: 'INR',
  };

  return (
    <div aria-labelledby="cart-summary" className={className}>
      <div className="cart_discount flex justify_between">
        <p>Discount</p>
        <p>
          <Money data={discountPrice} />
        </p>
      </div>
      <div className="cart_total flex justify_between">
        <p>Subtotal</p>
        <div className="total_price">
          <s>
            {cost?.subtotalAmount?.amount ? (
              <Money data={cost?.subtotalAmount} />
            ) : (
              '-'
            )}
          </s>
        </div>
      </div>
      <div className="cart_total flex justify_between">
        <p>Total</p>
        <div className="total_price">
          <span>
            {cost?.totalAmount?.amount ? (
              <Money data={cost?.totalAmount} />
            ) : (
              '-'
            )}
          </span>
        </div>
      </div>

      {originalTotal >= 0 && originalTotal <= 100 ? (
        <span className="charges">50 INR charge</span>
      ) : (
        <div className="pro_detail_fast_vector flex">
          <img src={Truck} alt="" />
          <p> 100 Free shipping on order above ₹100</p>
        </div>
        // <span className="charges">
        //   <svg
        //     xmlns="http://www.w3.org/2000/svg"
        //     viewBox="0 0 24 18"
        //     width="24"
        //     height="18"
        //   >
        //     <path
        //       fill-rule="evenodd"
        //       d="M5 8L5 9L13 9L13 2L3 2L3 1C3 0.45 3.45 0 4 0C6.58 0 11.42 0 14 0C14.55 0 15 0.45 15 1L15 3L19.67 3C20.78 3 21.27 3.58 21.6 4.11C22.2 5.05 23.14 6.54 23.71 7.48C23.9 7.8 24 8.15 24 8.52C24 9.71 24 11.5 24 13C24 14.09 23.26 15 22 15L21 15C21 16.66 19.66 18 18 18C16.34 18 15 16.66 15 15L11 15C11 16.66 9.66 18 8 18C6.34 18 5 16.66 5 15L4 15C3.45 15 3 14.55 3 14L3 8L1 8L1 6L8 6L8 8L5 8ZM6.8 15C6.8 15.66 7.34 16.2 8 16.2C8.66 16.2 9.2 15.66 9.2 15C9.2 14.34 8.66 13.8 8 13.8C7.34 13.8 6.8 14.34 6.8 15ZM16.8 15C16.8 15.66 17.34 16.2 18 16.2C18.66 16.2 19.2 15.66 19.2 15C19.2 14.34 18.66 13.8 18 13.8C17.34 13.8 16.8 14.34 16.8 15ZM15 11L5 11L5 13L5.76 13C6.31 12.39 7.11 12 8 12C8.89 12 9.69 12.39 10.24 13L15.76 13C16.31 12.39 17.11 12 18 12C18.89 12 19.69 12.39 20.24 13L22 13L22 8.43C22 8.43 20.84 6.44 20.29 5.5C20.11 5.19 19.78 5 19.43 5L15 5L15 11ZM18.7 6C19.06 6 19.4 6.19 19.57 6.5C20.06 7.36 21 9 21 9L16 9L16 6C16 6 17.83 6 18.7 6ZM0 3L8 3L8 5L0 5L0 3Z"
        //     ></path>
        //   </svg>

        // </span>
      )}
      <div className="product_cross_img">
        <CartCheckoutActions checkoutUrl={checkoutUrl} />
      </div>
      <p className="cart_p">
        Shipping cost and coupon code apply on checkout page*
      </p>
    </div>
  );
}

function CartLineRemoveButton({lineIds}) {
  return (
    <CartForm
      route="/cart"
      action={CartForm.ACTIONS.LinesRemove}
      inputs={{lineIds}}
    >
      <button type="submit" className="product_cross_img">
        <img src={cross} alt="" />
      </button>
    </CartForm>
  );
}

function CartLineQuantity({line}) {
  if (!line || typeof line?.quantity === 'undefined') return null;
  const {id: lineId, quantity} = line;
  const prevQuantity = Number(Math.max(0, quantity - 1).toFixed(0));
  const nextQuantity = Number((quantity + 1).toFixed(0));

  return (
    <div className="cart_product_count">
      <div className="num-block skin-2">
        <div className="num-in">
          <UpdateCartButton lines={[{id: lineId, quantity: prevQuantity}]}>
            <button
              aria-label="Decrease quantity"
              disabled={quantity <= 1}
              name="decrease-quantity"
              value={prevQuantity}
              className="minus dis"
            >
              <span>&#8722; </span>
            </button>
          </UpdateCartButton>
          <input type="text" className="in-num" value={quantity} readOnly />
          <UpdateCartButton lines={[{id: lineId, quantity: nextQuantity}]}>
            <button
              aria-label="Increase quantity"
              name="increase-quantity"
              value={nextQuantity}
              className="plus"
            >
              <span>&#43;</span>
            </button>
          </UpdateCartButton>
        </div>
      </div>
    </div>
  );
}

export function CartEmpty({hidden = false, layout = 'aside'}) {
  return (
    <div hidden={hidden} className="empty-cart">
      <br />
      <p>
        Looks like you haven&rsquo;t added anything yet, let&rsquo;s get you
        started!
      </p>
      <br />
      <Link
        to="/collections"
        onClick={() => {
          if (layout === 'aside') {
            window.location.href = '/collections';
          }
        }}
        className="btn"
      >
        Continue shopping →
      </Link>
    </div>
  );
}

function CartLineUpdateButton({children, lines}) {
  return (
    <CartForm
      route="/cart"
      action={CartForm.ACTIONS.LinesUpdate}
      inputs={{lines}}
    >
      {children}
    </CartForm>
  );
}

function UpdateCartButton({children, lines}) {
  const fetcher = useFetcher();

  return (
    <fetcher.Form action="/cart" method="post">
      <input type="hidden" name="cartAction" value={CartAction.UPDATE_CART} />
      <input type="hidden" name="lines" value={JSON.stringify(lines)} />
      {children}
    </fetcher.Form>
  );
}
