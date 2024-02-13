import {json, redirect} from '@shopify/remix-oxygen';
import {Link, useLoaderData} from '@remix-run/react';
import {Money, Image, flattenConnection} from '@shopify/hydrogen';

/**
 * @type {MetaFunction<typeof loader>}
 */
export const meta = ({data}) => {
  return [{title: `Order ${data?.order?.name}`}];
};

/**
 * @param {LoaderFunctionArgs}
 */
export async function loader({params, context}) {
  const {session, storefront} = context;

  if (!params.id) {
    return redirect('/account/orders');
  }

  const orderId = atob(params.id);
  const customerAccessToken = await session.get('customerAccessToken');

  if (!customerAccessToken) {
    return redirect('/account/login');
  }

  const {order} = await storefront.query(CUSTOMER_ORDER_QUERY, {
    variables: {orderId},
  });

  if (!order || !('lineItems' in order)) {
    throw new Response('Order not found', {status: 404});
  }

  const lineItems = flattenConnection(order.lineItems);
  const discountApplications = flattenConnection(order.discountApplications);

  const firstDiscount = discountApplications[0]?.value;

  const discountValue =
    firstDiscount?.__typename === 'MoneyV2' && firstDiscount;

  const discountPercentage =
    firstDiscount?.__typename === 'PricingPercentageValue' &&
    firstDiscount?.percentage;

  return json({
    order,
    lineItems,
    discountValue,
    discountPercentage,
  });
}

export default function OrderRoute() {
  const {order, lineItems, discountValue, discountPercentage} = useLoaderData();
  return (
    <div className="account-order">
      <h2>Order {order.name}</h2>
      <p>Placed on {new Date(order.processedAt).toDateString()}</p>
      <br />
      <div className="order_table">
        <table>
          <thead>
            <tr>
              <th>Order No</th>
              <th>Placed on</th>
              <th>Product</th>
              <th>Quantity</th>
              <th>Price</th>
              <th>Discounts</th>
              <th>Subtotal</th>
              <th>Tax</th>
              <th>Total</th>
              <th>status</th>
              <th>Shipping Address</th>
            </tr>
          </thead>
          <tbody>
            {lineItems.map((lineItem) => {
              lineItem.variant === null && <span>not available</span>;
              return (
                <tr key={lineItem.variant?.id}>
                  <td>{order.name}</td>
                  <td>{new Date(order.processedAt).toDateString()}</td>
                  <td>
                    <div>
                      <Link
                        to={`/products/${lineItem.variant?.product?.handle}`}
                      >
                        {lineItem?.variant?.image && (
                          <div>
                            <Image
                              data={lineItem.variant.image}
                              width={96}
                              height={96}
                            />
                          </div>
                        )}
                      </Link>
                      <span>{lineItem.title}</span>
                      <span>{lineItem.variant?.title}</span>
                    </div>
                  </td>
                  <td>{lineItem.quantity}</td>
                  <td>
                    <Money data={lineItem.originalTotalPrice} />
                  </td>
                  <td>
                    <span>
                      <Money data={lineItem.discountedTotalPrice} />
                    </span>
                  </td>
                  <td>
                    <Money data={order.subtotalPriceV2} />
                  </td>
                  <td>
                    <Money data={order.totalTaxV2} />
                  </td>
                  <td>
                    <Money data={order.totalPriceV2} />
                  </td>
                  <td>{order.fulfillmentStatus}</td>
                  <td>
                    {order?.shippingAddress ? (
                      <ul className="mt-6">
                        <li>
                          <span>
                            {order.shippingAddress.firstName &&
                              order.shippingAddress.firstName + ' '}
                            {order.shippingAddress.lastName}
                          </span>
                        </li>
                        {order?.shippingAddress?.formatted ? (
                          order.shippingAddress.formatted.map((line) => (
                            <li key={line}>
                              <span>{line}</span>
                            </li>
                          ))
                        ) : (
                          <></>
                        )}
                      </ul>
                    ) : (
                      <p className="mt-3">No shipping address defined</p>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <br />
      <p>
        <a target="_blank" className="btn" href={order.statusUrl} rel="noreferrer">
          View Order Status →
        </a>
      </p>
    </div>
  );
}

// NOTE: https://shopify.dev/docs/api/storefront/latest/objects/Order
const CUSTOMER_ORDER_QUERY = `#graphql
  fragment OrderMoney on MoneyV2 {
    amount
    currencyCode
  }
  fragment AddressFull on MailingAddress {
    address1
    address2
    city
    company
    country
    countryCodeV2
    firstName
    formatted
    id
    lastName
    name
    phone
    province
    provinceCode
    zip
  }
  fragment DiscountApplication on DiscountApplication {
    value {
      __typename
      ... on MoneyV2 {
        ...OrderMoney
      }
      ... on PricingPercentageValue {
        percentage
      }
    }
  }
  fragment OrderLineProductVariant on ProductVariant {
    id
    image {
      altText
      height
      url
      id
      width
    }
    price {
      ...OrderMoney
    }
    product {
      handle
    }
    sku
    title
  }
  fragment OrderLineItemFull on OrderLineItem {
    title
    quantity
    discountAllocations {
      allocatedAmount {
        ...OrderMoney
      }
      discountApplication {
        ...DiscountApplication
      }
    }
    originalTotalPrice {
      ...OrderMoney
    }
    discountedTotalPrice {
      ...OrderMoney
    }
    variant {
      ...OrderLineProductVariant
    }
  }
  fragment Order on Order {
    id
    name
    orderNumber
    statusUrl
    processedAt
    fulfillmentStatus
    totalTaxV2 {
      ...OrderMoney
    }
    totalPriceV2 {
      ...OrderMoney
    }
    subtotalPriceV2 {
      ...OrderMoney
    }
    shippingAddress {
      ...AddressFull
    }
    discountApplications(first: 100) {
      nodes {
        ...DiscountApplication
      }
    }
    lineItems(first: 100) {
      nodes {
        ...OrderLineItemFull
      }
    }
  }
  query Order(
    $language: LanguageCode
    $orderId: ID!
  ) @inContext( language: $language) {
    order: node(id: $orderId) {
      ... on Order {
        ...Order
      }
    }
  }
`;

/** @typedef {import('@shopify/remix-oxygen').LoaderFunctionArgs} LoaderFunctionArgs */
/** @template T @typedef {import('@remix-run/react').MetaFunction<T>} MetaFunction */
/** @typedef {import('storefrontapi.generated').OrderLineItemFullFragment} OrderLineItemFullFragment */
/** @typedef {import('@shopify/remix-oxygen').SerializeFrom<typeof loader>} LoaderReturnData */
