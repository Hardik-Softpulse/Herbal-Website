import {CartForm, Image, Money} from '@shopify/hydrogen';
import {Link} from '@remix-run/react';
import cross from '../image/croos2.png';
import {useVariantUrl} from '~/lib/variants';

export function CartMain({layout, cart}) {

  const linesCount = Boolean(cart?.lines?.edges?.length || 0);
  const withDiscount =
    cart &&
    Boolean(cart.discountCodes?.filter((code) => code.applicable).length);
  const className = ` mini_cart  ${withDiscount ? 'with-discount' : ''}`;
  const cartHasItems = !!cart && cart.totalQuantity > 0;

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
  return (
    <div className="main_cart_product">
      {lines.edges.map((line) => {
        const cartLineItem = line.node;

        return (
          <CartLineItem
            key={cartLineItem.id}
            line={cartLineItem}
            layout={layout}
          />
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
        <CartLineRemoveButton lineIds={id} />
      </div>
    </div>
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
          <CartLineUpdateButton lines={[{id: lineId, quantity: prevQuantity}]}>
            <button
              aria-label="Decrease quantity"
              disabled={quantity <= 1}
              name="decrease-quantity"
              value={prevQuantity}
              className="minus dis"
            >
              <span>&#8722; </span>
            </button>
          </CartLineUpdateButton>
          <input type="text" className="in-num" value={quantity} readOnly />
          <CartLineUpdateButton lines={[{id: lineId, quantity: nextQuantity}]}>
            <button
              aria-label="Increase quantity"
              name="increase-quantity"
              value={nextQuantity}
              className="plus"
            >
              <span>&#43;</span>
            </button>
          </CartLineUpdateButton>
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
