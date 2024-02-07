import {CartForm, Image, Money} from '@shopify/hydrogen';
import {Link} from '@remix-run/react';
import cross from '../image/croos2.png';

export function CartMain({layout, cart}) {
  console.log('cart', cart);
  const linesCount = Boolean(cart?.lines?.edges?.length || 0);
  const withDiscount =
    cart &&
    Boolean(cart.discountCodes?.filter((code) => code.applicable).length);
  const className = ` mini_cart  ${withDiscount ? 'with-discount' : ''}`;
  const cartHasItems = !!cart && cart.totalQuantity > 0;
  return (
    <div className={className}>
      <div className="cart_heading">
        <div className="cart_title flex justify_between">
          <h3>Cart (2)</h3>
          <button className="close_cart">
            <img src={cross} alt="" />
          </button>
        </div>
        <div className="cart_head">
          <p>Your cart is reserved for 15.00 minutes</p>
        </div>
      </div>
      <CartEmpty hidden={linesCount} layout={layout} />
      <CartDetails cart={cart} layout={layout} />
      {cartHasItems && (
        <CartSummary
          cost={cart.cost}
          layout={layout}
          checkoutUrl={cart.checkoutUrl}
        />
      )}
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
      {lines.edges?.map((line) => (
        <CartLineItem key={line.id} line={line} layout={layout} />
      ))}
    </div>
  );
}

function CartLineItem({layout, line}) {
  const {id, merchandise} = line;
  if (!line || typeof line?.quantity === 'undefined') return null;

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

  const defcompareAtPrice = merchandise.compareAtPrice?.amount;
  const defprice = merchandise.price?.amount;

  const percentageDifferenceResult = calculatePercentageDifference(
    defcompareAtPrice,
    defprice,
  );

  return (
    <div className="cart_product flex" key={id}>
      <div className="cart_product_img">
        {merchandise.image && (
          <Link to={`/products/${merchandise.product?.handle}`}>
            <Image alt={merchandise.image?.url} data={merchandise.image} />
          </Link>
        )}
      </div>
      <div className="cart_product_content flex justify_between">
        <div className="cart_product_info">
          <p>{merchandise.product?.title}</p>
          <span>{merchandise.title}</span>
          <div className="cart_product_price flex">
            <h5>
              <Money withoutTrailingZeros data={price} />
            </h5>
            <s>
              <Money withoutTrailingZeros data={merchandise.compareAtPrice} />
            </s>
            {merchandise.compareAtPrice === null
              ? ''
              : merchandise.availableForSale == true && (
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
  console.log('checkoutUrl', checkoutUrl);
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
    currencyCode: 'USD',
  };

  return (
    <div className={className}>
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
          <input type="text" className="in-num" value={quantity} readOnly="" />
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
    <div hidden={hidden}>
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
