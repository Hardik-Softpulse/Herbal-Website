import {CartForm, Image, Money} from '@shopify/hydrogen';
import {Link} from '@remix-run/react';
import {useVariantUrl} from '~/lib/variants';
import cross from '../image/cross.svg';

export function CartMain({layout, cart}) {
  console.log('cart', cart);
  const linesCount = Boolean(cart?.lines?.edges?.length || 0);
  const withDiscount =
    cart &&
    Boolean(cart.discountCodes?.filter((code) => code.applicable).length);
  const className = ` mini_cart  ${withDiscount ? 'with-discount' : ''}`;

  return (
    <div className={className}>
      <div className="cart_heading">
        <div className="cart_title flex justify_between">
          <h3>Cart (2)</h3>
          <button className="close_cart">
            <img src="image/cross.png" alt="" />
          </button>
        </div>
        <div className="cart_head">
          <p>Your cart is reserved for 15.00 minutes</p>
        </div>
      </div>
      <CartEmpty hidden={linesCount} layout={layout} />
      <CartDetails cart={cart} layout={layout} />
    </div>
  );
}

/**
 * @param {CartMainProps}
 */
function CartDetails({layout, cart}) {
  const cartHasItems = !!cart && cart.totalQuantity > 0;

  return (
    <div className="cart_scroll">
      <div className="main_cart_product">
        <CartLines lines={cart?.lines} layout={layout} />
      </div>
      {cartHasItems && (
        <CartSummary cost={cart.cost} layout={layout}>
          <CartDiscounts discountCodes={cart.discountCodes} />
          <CartCheckoutActions checkoutUrl={cart.checkoutUrl} />
        </CartSummary>
      )}
    </div>
  );
}

function CartLines({lines, layout}) {
  if (!lines) return null;
  const {edges} = lines;

  return (
    <div className="main_cart_product">
      {edges.map((line) => (
        <CartLineItem key={line.id} line={line.node} layout={layout} />
      ))}
    </div>
  );
}

/**
 * @param {{
 *   layout: CartMainProps['layout'];
 *   line: CartLine;
 * }}
 */
function CartLineItem({layout, line}) {
  const {id, merchandise} = line;
  const {product, title, image, selectedOptions} = merchandise;
  const lineItemUrl = useVariantUrl(product.handle, selectedOptions);

  return (
    <div className="cart_product flex">
      <div className="cart_product_img">
        {image && (
          <Image
            alt={title}
            aspectRatio="1/1"
            data={image}
            height={100}
            loading="lazy"
            width={100}
          />
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
          <CartLinePrice line={line} />
          <ul>
            {selectedOptions.map((option) => (
              <li key={option.name}>
                <small>
                  {option.name}: {option.value}
                </small>
              </li>
            ))}
          </ul>
          <CartLineQuantity line={line} />
        </div>
      </div>
    </div>
  );
}

/**
 * @param {{checkoutUrl: string}}
 */
function CartCheckoutActions({checkoutUrl}) {
  if (!checkoutUrl) return null;

  return (
    <div>
      <a href={checkoutUrl} target="_self">
        <p>Continue to Checkout &rarr;</p>
      </a>
      <br />
    </div>
  );
}

/**
 * @param {{
 *   children?: React.ReactNode;
 *   cost: CartApiQueryFragment['cost'];
 *   layout: CartMainProps['layout'];
 * }}
 */
export function CartSummary({cost, layout, children = null}) {
  const className =
    layout === 'page' ? 'cart-summary-page' : 'cart-summary-aside';

  return (
    <div aria-labelledby="cart-summary" className={className}>
      <h4>Totals</h4>
      <dl className="cart-subtotal">
        <dt>Subtotal</dt>
        <dd>
          {cost?.subtotalAmount?.amount ? (
            <Money data={cost?.subtotalAmount} />
          ) : (
            '-'
          )}
        </dd>
      </dl>
      {children}
    </div>
  );
}

/**
 * @param {{lineIds: string[]}}
 */
function CartLineRemoveButton({lineIds}) {
  return (
    <CartForm
      route="/cart"
      action={CartForm.ACTIONS.LinesRemove}
      inputs={{lineIds}}
    >
      <button type="submit">Remove</button>
    </CartForm>
  );
}

/**
 * @param {{line: CartLine}}
 */
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
      <CartLineRemoveButton lineIds={[lineId]} />
    </div>
  );
}

/**
 * @param {{
 *   line: CartLine;
 *   priceType?: 'regular' | 'compareAt';
 *   [key: string]: any;
 * }}
 */
function CartLinePrice({line, priceType = 'regular', ...passthroughProps}) {
  if (!line?.cost?.amountPerQuantity || !line?.cost?.totalAmount) return null;

  const moneyV2 =
    priceType === 'regular'
      ? line.cost.totalAmount
      : line.cost.compareAtAmountPerQuantity;

  if (moneyV2 == null) {
    return null;
  }

  return (
    <div className="cart_product_price flex">
      <Money withoutTrailingZeros {...passthroughProps} data={moneyV2} />
    </div>
  );
}

/**
 * @param {{
 *   hidden: boolean;
 *   layout?: CartMainProps['layout'];
 * }}
 */
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

/**
 * @param {{
 *   discountCodes: CartApiQueryFragment['discountCodes'];
 * }}
 */
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

/**
 * @param {{
 *   discountCodes?: string[];
 *   children: React.ReactNode;
 * }}
 */
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

/**
 * @param {{
 *   children: React.ReactNode;
 *   lines: CartLineUpdateInput[];
 * }}
 */
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

/** @typedef {CartApiQueryFragment['lines']['nodes'][0]} CartLine */
/**
 * @typedef {{
 *   cart: CartApiQueryFragment | null;
 *   layout: 'page' | 'aside';
 * }} CartMainProps
 */

/** @typedef {import('@shopify/hydrogen/storefront-api-types').CartLineUpdateInput} CartLineUpdateInput */
/** @typedef {import('storefrontapi.generated').CartApiQueryFragment} CartApiQueryFragment */
