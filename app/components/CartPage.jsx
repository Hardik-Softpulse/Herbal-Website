import clsx from 'clsx';
import {useRef} from 'react';
import {useScroll} from 'react-use';
import {CartForm, flattenConnection, Image, Money} from '@shopify/hydrogen';
import {Link, Links, useFetcher} from '@remix-run/react';
import cross from '../image/cross.svg';
import {FeaturedProducts} from '~/components';
import {getInputStyleClasses} from '~/lib/utils';
import {CartAction} from '~/lib/type';
import {Breadcrumb} from './Breadcrumb';

export function CartPage({layout, onClose, cart}) {
  console.log('cart', cart);
  const linesCount = Boolean(cart?.lines?.edges?.length || 0);

  return (
    <>
      <Breadcrumb CurrentPage={'cart'} />
      <CartEmpty hidden={linesCount} onClose={onClose} layout={layout} />
      <CartDetails cart={cart} layout={layout} />
    </>
  );
}

export function CartDetails({layout, cart}) {
  // @todo: get optimistic cart cost
  const cartHasItems = !!cart && cart.totalQuantity > 0;
  return (
    <>
      <h2 className="page-title text-up text-center">Your Bag</h2>
      <div className={' row flxspc flxanst'}>
        <CartLines lines={cart?.lines} layout={layout} />
        {cartHasItems && (
          <CartSummary
            cost={cart.cost}
            layout={layout}
            discountCodes={cart.discountCodes}
            checkoutUrl={cart.checkoutUrl}
          >
            <CartDiscounts discountCodes={cart.discountCodes} />
            <CartCheckoutActions checkoutUrl={cart.checkoutUrl} />
          </CartSummary>
        )}
      </div>
    </>
  );
}

function CartDiscounts({discountCodes}) {
  const codes = discountCodes?.map(({code}) => code).join(', ') || null;

  return (
    <>
      {/* Have existing discount, display it with a remove option */}
      <dl className={codes ? 'grid' : 'hidden'}>
        <div className="flex items-center justify-between font-medium">
          <dt as="dt">Discount(s)</dt>
          <div className="flex items-center justify-between">
            <UpdateDiscountForm>
              <button>
                <img src={cross} alt="" />
              </button>
            </UpdateDiscountForm>
            <dd as="dd">{codes}</dd>
          </div>
        </div>
      </dl>

      <UpdateDiscountForm>
        <div
          className={clsx(codes ? 'hidden' : 'flex', ' gap-4 justify-between')}
        >
          <input
            className={getInputStyleClasses() + ' mb-0'}
            type="text"
            name="discountCode"
            placeholder="Discount code"
          />
          <button className="btn-sm btn flex shrink-0 justify-end font-medium whitespace-nowrap">
            Apply Discount
          </button>
        </div>
      </UpdateDiscountForm>
    </>
  );
}

function UpdateDiscountForm({children}) {
  const fetcher = useFetcher();
  return (
    <fetcher.Form action="/cart" method="post">
      <input
        type="hidden"
        name="cartAction"
        value={CartAction.UPDATE_DISCOUNT}
      />
      {children}
    </fetcher.Form>
  );
}

function CartLines({layout = 'drawer', lines: cartLines}) {
  const currentLines = cartLines ? flattenConnection(cartLines) : [];
  const scrollRef = useRef(null);
  const {y} = useScroll(scrollRef);

  return (
    <div
      ref={scrollRef}
      aria-labelledby="cart-contents"
      className="cart-item-list"
    >
      {currentLines.map((line) => (
        <CartLineItem key={line.id} line={line} />
      ))}
    </div>
  );
}

function CartCheckoutActions({checkoutUrl}) {
  if (!checkoutUrl) return null;

  return (
    <div className="flex gap-3 justify-between mt-2 cart-footer">
      <Link to="/cart" className="btn btn-sm ">
        View Cart
      </Link>
      <a href={checkoutUrl} target="_self" className="btn btn-sm">
        Continue to Checkout
      </a>
      {/* @todo: <CartShopPayButton cart={cart} /> */}
    </div>
  );
}

function CartSummary({
  cost,
  discountCodes,
  checkoutUrl,
  layout,
  children = null,
}) {
  const {subtotalAmount, totalAmount} = cost;

  let discount = 0;
  const subTotal = Number(subtotalAmount?.amount);
  if (subTotal > 5 && subTotal < 8) {
    discount = 10;
  } else {
    discount = 30;
  }

  return (
    <div aria-labelledby="summary-heading" className="cart-subtotal">
      <h5 className="text-up">Order Summary</h5>
      <ul>
        <li>
          <span>SUBTOTAL</span>
          <span>
            {subtotalAmount?.amount ? <Money data={subtotalAmount} /> : '-'}
          </span>
        </li>
        <li>
          <span>{`DISCOUNTS (${discount && discount + ' %'}`})</span>
          <span>
            {Number(subtotalAmount?.amount) > 5 ? (
              <>
                $
                {((Number(subtotalAmount?.amount) * discount) / 100).toFixed(2)}
              </>
            ) : (
              '-'
            )}
          </span>
        </li>
        <li className="cart-total">
          <span>
            <strong>TOTAL</strong>
            <br /> <small>(Inclusive of all taxes)</small>
          </span>
          <span>
            <strong>
              {totalAmount?.amount ? <Money data={totalAmount} /> : '-'}
            </strong>
          </span>
        </li>
      </ul>
      <a href={checkoutUrl} target="_self" className="btn btn-sm">
        Checkout
      </a>
      <div className="shipping-text lp-05 text-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 18"
          width={24}
          height={18}
        >
          <path
            fillRule="evenodd"
            d="M5 8L5 9L13 9L13 2L3 2L3 1C3 0.45 3.45 0 4 0C6.58 0 11.42 0 14 0C14.55 0 15 0.45 15 1L15 3L19.67 3C20.78 3 21.27 3.58 21.6 4.11C22.2 5.05 23.14 6.54 23.71 7.48C23.9 7.8 24 8.15 24 8.52C24 9.71 24 11.5 24 13C24 14.09 23.26 15 22 15L21 15C21 16.66 19.66 18 18 18C16.34 18 15 16.66 15 15L11 15C11 16.66 9.66 18 8 18C6.34 18 5 16.66 5 15L4 15C3.45 15 3 14.55 3 14L3 8L1 8L1 6L8 6L8 8L5 8ZM6.8 15C6.8 15.66 7.34 16.2 8 16.2C8.66 16.2 9.2 15.66 9.2 15C9.2 14.34 8.66 13.8 8 13.8C7.34 13.8 6.8 14.34 6.8 15ZM16.8 15C16.8 15.66 17.34 16.2 18 16.2C18.66 16.2 19.2 15.66 19.2 15C19.2 14.34 18.66 13.8 18 13.8C17.34 13.8 16.8 14.34 16.8 15ZM15 11L5 11L5 13L5.76 13C6.31 12.39 7.11 12 8 12C8.89 12 9.69 12.39 10.24 13L15.76 13C16.31 12.39 17.11 12 18 12C18.89 12 19.69 12.39 20.24 13L22 13L22 8.43C22 8.43 20.84 6.44 20.29 5.5C20.11 5.19 19.78 5 19.43 5L15 5L15 11ZM18.7 6C19.06 6 19.4 6.19 19.57 6.5C20.06 7.36 21 9 21 9L16 9L16 6C16 6 17.83 6 18.7 6ZM0 3L8 3L8 5L0 5L0 3Z"
          />
        </svg>
        Free shipping on order above $20
      </div>
      <h6 className="text-up">Need help ?</h6>
      <div className="help-links dfx flxspc text-up">
        <a href="#">Shipping</a>
        <a href="#">Returns &amp; Exchanges</a>
      </div>
      <h6 className="text-up">Accepted payment methods</h6>
    </div>
  );
}

function CartLineItem({line}) {
  if (!line?.id) return null;
  const {id, quantity, merchandise} = line;
  if (typeof quantity === 'undefined' || !merchandise?.product) return null;

  return (
    <div key={id} className="cart-item dfx">
      <Link
        to={`/products/${merchandise.product.handle}`}
        className="flex-shrink"
      >
        {merchandise.image && (
          <Image
            width={110}
            height={110}
            data={merchandise.image}
            className="cart-image"
            alt={merchandise.title}
          />
        )}
      </Link>

      <div className="cart-info dfx dfxcl">
        <h6>
          {merchandise?.product?.handle ? (
            <Link to={`/products/${merchandise.product.handle}`}>
              {merchandise?.product?.title || ''}
            </Link>
          ) : (
            <>{merchandise?.product?.title || ''}</>
          )}
        </h6>

        <div className="adDD">
          {(merchandise?.selectedOptions || []).map((option) => (
            <div key={option.name} className="text-sm text-slate-400">
              {option.name}: {option.value}
            </div>
          ))}
        </div>

        <div className="cart-edits dfx items-center">
          <div className=" cart-counter">
            <div className="flex justify-start text-copy">
              <CartLineQuantityAdjust line={line} />
            </div>
          </div>
          <div className="cart-price">
            <CartLinePrice line={line} as="span" />
          </div>
          <div className="cart-elinks items-center dfx gap-3">
            <span className="cart-update">edit</span>
            <ItemRemoveButton lineIds={[id]} />
          </div>
        </div>
      </div>
    </div>
  );
}

function ItemRemoveButton({lineIds}) {
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

function CartLineQuantityAdjust({line}) {
  if (!line || typeof line?.quantity === 'undefined') return null;
  const {id: lineId, quantity} = line;
  const prevQuantity = Number(Math.max(0, quantity - 1).toFixed(0));
  const nextQuantity = Number((quantity + 1).toFixed(0));

  return (
    <>
      <label htmlFor={`quantity-${lineId}`} className="sr-only">
        Quantity, {quantity}
      </label>
      <div className="flex items-center border">
        <UpdateCartButton lines={[{id: lineId, quantity: prevQuantity}]}>
          <button
            name="decrease-quantity"
            aria-label="Decrease quantity"
            className="w-10 h-10 transition text-primary/50 hover:text-primary disabled:text-primary/10"
            value={prevQuantity}
            disabled={quantity <= 1}
          >
            <span>&#8722;</span>
          </button>
        </UpdateCartButton>

        <div className="px-2 text-center" data-test="item-quantity">
          {quantity}
        </div>

        <UpdateCartButton lines={[{id: lineId, quantity: nextQuantity}]}>
          <button
            className="w-10 h-10 transition text-primary/50 hover:text-primary"
            name="increase-quantity"
            value={nextQuantity}
            aria-label="Increase quantity"
          >
            <span>&#43;</span>
          </button>
        </UpdateCartButton>
      </div>
    </>
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

function CartLinePrice({line, priceType = 'regular', ...passthroughProps}) {
  if (!line?.cost?.amountPerQuantity || !line?.cost?.totalAmount) return null;

  const moneyV2 =
    priceType === 'regular'
      ? line.cost.totalAmount
      : line.cost.compareAtAmountPerQuantity;

  if (moneyV2 == null) {
    return null;
  }

  return <Money withoutTrailingZeros {...passthroughProps} data={moneyV2} />;
}

export function CartEmpty({hidden = false, layout = 'drawer', onClose}) {
  const scrollRef = useRef(null);
  const {y} = useScroll(scrollRef);

  const container = {
    drawer: clsx([
      'content-start gap-4 px-6 pb-8 transition overflow-y-scroll md:gap-12 md:px-12 h-screen-no-nav md:pb-12',
      y > 0 ? 'border-t' : '',
    ]),
    page: clsx([
      hidden ? '' : 'grid',
      `pb-12 w-full md:items-start gap-4 md:gap-8 lg:gap-12`,
    ]),
  };

  return (
    <div ref={scrollRef} className={container[layout]} hidden={hidden}>
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
      <section className="grid gap-8 pt-16">
        <FeaturedProducts
          count={4}
          heading="Shop Best Sellers"
          layout={layout}
          onClose={onClose}
          sortKey="BEST_SELLING"
        />
      </section>
    </div>
  );
}
