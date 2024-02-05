import {CartForm, Image, Money} from '@shopify/hydrogen';
import {Link} from '@remix-run/react';
import cross from '../image/cross.png';

export function CartMain({layout, cart, miniCart, setMiniCart}) {
  const linesCount = Boolean(cart?.lines?.edges?.length || 0);
  const cartHasItems = !!cart && cart.totalQuantity > 0;

  return (
    <div className="mini_cart">
      <div className="cart_heading">
        <div className="cart_title flex justify_between">
          <h3>Cart ({cart?.lines?.edges?.length})</h3>
          <button className="close_cart" onClick={() => setMiniCart(!miniCart)}>
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

/**
 * @param {CartMainProps}
 */
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
  const {id, merchandise} = line.node;
  const {image, product, title, price, compareAtPrice, availableForSale} =
    merchandise;

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
    <div className="cart_product flex">
      <div className="cart_product_img">
        {image && (
          <Link to={`/products/${product.handle}`}>
            <Image alt={image.url} data={image} />
          </Link>
        )}
      </div>
      <div className="cart_product_content flex justify_between">
        <div className="cart_product_info">
          <p>{product.title}</p>
          <div className="cart_product_price flex">
            <h5>
              <Money withoutTrailingZeros data={price} />
            </h5>
            <s>
              <Money withoutTrailingZeros data={compareAtPrice} />
            </s>
            {compareAtPrice === null
              ? ''
              : availableForSale == true && (
                  <span>{`${percentageDifferenceResult}%  off`}</span>
                )}
          </div>
          <div className="cart_product_count">
            <div className="num-block skin-2">
              <div className="num-in">
                <span className="minus dis"></span>
                <input type="text" className="in-num" value="1" readonly="" />
                <span className="plus"></span>
              </div>
            </div>
          </div>
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

export function CartSummary({cost, layout, checkoutUrl}) {
  const originalSubtotal = cost?.subtotalAmount?.amount || 0;
  const originalTotal = cost?.totalAmount?.amount || 0;

  const discountAmount = originalSubtotal - originalTotal;
  const discountAmountNumber = parseFloat(discountAmount);
  const discountPrice = {
    amount: discountAmountNumber.toString(),
    currencyCode: 'USD',
  };

  return (
    <div className="cart_check_out">
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
      <button value="Checkout">
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
    <div className="cart-line-quantiy">
      <small>Quantity: {quantity} &nbsp;&nbsp;</small>
      <CartLineUpdateButton lines={[{id: lineId, quantity: prevQuantity}]}>
        <button
          aria-label="Decrease quantity"
          disabled={quantity <= 1}
          name="decrease-quantity"
          value={prevQuantity}
        >
          <span>&#8722; </span>
        </button>
      </CartLineUpdateButton>
      &nbsp;
      <CartLineUpdateButton lines={[{id: lineId, quantity: nextQuantity}]}>
        <button
          aria-label="Increase quantity"
          name="increase-quantity"
          value={nextQuantity}
        >
          <span>&#43;</span>
        </button>
      </CartLineUpdateButton>
      &nbsp;
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

function CartDiscounts({discountCodes}) {
  const codes =
    discountCodes
      ?.filter((discount) => discount.applicable)
      ?.map(({code}) => code) || [];

  return (
    <div>
      {/* Have existing discount, display it with a remove option */}
      <dl hidden={!codes.length}>
        <div>
          <dt>Discount(s)</dt>
          <UpdateDiscountForm>
            <div className="cart-discount">
              <code>{codes?.join(', ')}</code>
              &nbsp;
              <button>Remove</button>
            </div>
          </UpdateDiscountForm>
        </div>
      </dl>

      {/* Show an input to apply a discount */}
      <UpdateDiscountForm discountCodes={codes}>
        <div>
          <input type="text" name="discountCode" placeholder="Discount code" />
          &nbsp;
          <button type="submit">Apply</button>
        </div>
      </UpdateDiscountForm>
    </div>
  );
}

function UpdateDiscountForm({discountCodes, children}) {
  return (
    <CartForm
      route="/cart"
      action={CartForm.ACTIONS.DiscountCodesUpdate}
      inputs={{
        discountCodes: discountCodes || [],
      }}
    >
      {children}
    </CartForm>
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
