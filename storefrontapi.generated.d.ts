/* eslint-disable eslint-comments/disable-enable-pair */
/* eslint-disable eslint-comments/no-unlimited-disable */
/* eslint-disable */
import * as StorefrontAPI from '@shopify/hydrogen/storefront-api-types';

type Media_ExternalVideo_Fragment = {__typename: 'ExternalVideo'} & Pick<
  StorefrontAPI.ExternalVideo,
  'id' | 'embedUrl' | 'host' | 'mediaContentType' | 'alt'
> & {previewImage?: StorefrontAPI.Maybe<Pick<StorefrontAPI.Image, 'url'>>};

type Media_MediaImage_Fragment = {__typename: 'MediaImage'} & Pick<
  StorefrontAPI.MediaImage,
  'id' | 'mediaContentType' | 'alt'
> & {
    image?: StorefrontAPI.Maybe<
      Pick<StorefrontAPI.Image, 'id' | 'url' | 'width' | 'height'>
    >;
    previewImage?: StorefrontAPI.Maybe<Pick<StorefrontAPI.Image, 'url'>>;
  };

type Media_Model3d_Fragment = {__typename: 'Model3d'} & Pick<
  StorefrontAPI.Model3d,
  'id' | 'mediaContentType' | 'alt'
> & {
    sources: Array<Pick<StorefrontAPI.Model3dSource, 'mimeType' | 'url'>>;
    previewImage?: StorefrontAPI.Maybe<Pick<StorefrontAPI.Image, 'url'>>;
  };

type Media_Video_Fragment = {__typename: 'Video'} & Pick<
  StorefrontAPI.Video,
  'id' | 'mediaContentType' | 'alt'
> & {
    sources: Array<Pick<StorefrontAPI.VideoSource, 'mimeType' | 'url'>>;
    previewImage?: StorefrontAPI.Maybe<Pick<StorefrontAPI.Image, 'url'>>;
  };

export type MediaFragment =
  | Media_ExternalVideo_Fragment
  | Media_MediaImage_Fragment
  | Media_Model3d_Fragment
  | Media_Video_Fragment;

export type ProductCardFragment = Pick<
  StorefrontAPI.Product,
  'id' | 'title' | 'publishedAt' | 'handle' | 'vendor' | 'description'
> & {
  media: {
    nodes: Array<
      | ({__typename: 'ExternalVideo'} & Pick<
          StorefrontAPI.ExternalVideo,
          'id' | 'embedUrl' | 'host' | 'mediaContentType' | 'alt'
        > & {
            previewImage?: StorefrontAPI.Maybe<
              Pick<StorefrontAPI.Image, 'url'>
            >;
          })
      | ({__typename: 'MediaImage'} & Pick<
          StorefrontAPI.MediaImage,
          'id' | 'mediaContentType' | 'alt'
        > & {
            image?: StorefrontAPI.Maybe<
              Pick<StorefrontAPI.Image, 'id' | 'url' | 'width' | 'height'>
            >;
            previewImage?: StorefrontAPI.Maybe<
              Pick<StorefrontAPI.Image, 'url'>
            >;
          })
      | ({__typename: 'Model3d'} & Pick<
          StorefrontAPI.Model3d,
          'id' | 'mediaContentType' | 'alt'
        > & {
            sources: Array<
              Pick<StorefrontAPI.Model3dSource, 'mimeType' | 'url'>
            >;
            previewImage?: StorefrontAPI.Maybe<
              Pick<StorefrontAPI.Image, 'url'>
            >;
          })
      | ({__typename: 'Video'} & Pick<
          StorefrontAPI.Video,
          'id' | 'mediaContentType' | 'alt'
        > & {
            sources: Array<Pick<StorefrontAPI.VideoSource, 'mimeType' | 'url'>>;
            previewImage?: StorefrontAPI.Maybe<
              Pick<StorefrontAPI.Image, 'url'>
            >;
          })
    >;
  };
  options: Array<Pick<StorefrontAPI.ProductOption, 'name' | 'values'>>;
  variants: {
    nodes: Array<
      Pick<
        StorefrontAPI.ProductVariant,
        'id' | 'availableForSale' | 'sku' | 'title'
      > & {
        selectedOptions: Array<
          Pick<StorefrontAPI.SelectedOption, 'name' | 'value'>
        >;
        image?: StorefrontAPI.Maybe<
          Pick<
            StorefrontAPI.Image,
            'id' | 'url' | 'altText' | 'width' | 'height'
          >
        >;
        price: Pick<StorefrontAPI.MoneyV2, 'amount' | 'currencyCode'>;
        compareAtPrice?: StorefrontAPI.Maybe<
          Pick<StorefrontAPI.MoneyV2, 'amount' | 'currencyCode'>
        >;
        unitPrice?: StorefrontAPI.Maybe<
          Pick<StorefrontAPI.MoneyV2, 'amount' | 'currencyCode'>
        >;
        product: Pick<StorefrontAPI.Product, 'title' | 'handle'>;
      }
    >;
  };
};

export type FeaturedCollectionDetailsFragment = Pick<
  StorefrontAPI.Collection,
  'id' | 'title' | 'handle'
> & {
  image?: StorefrontAPI.Maybe<
    Pick<StorefrontAPI.Image, 'altText' | 'width' | 'height' | 'url'>
  >;
};

export type LayoutQueryVariables = StorefrontAPI.Exact<{
  language?: StorefrontAPI.InputMaybe<StorefrontAPI.LanguageCode>;
  headerMenuHandle: StorefrontAPI.Scalars['String']['input'];
  footerMenuHandle: StorefrontAPI.Scalars['String']['input'];
}>;

export type LayoutQuery = {
  shop: Pick<StorefrontAPI.Shop, 'id' | 'name' | 'description'> & {
    primaryDomain: Pick<StorefrontAPI.Domain, 'url'>;
    brand?: StorefrontAPI.Maybe<{
      logo?: StorefrontAPI.Maybe<{
        image?: StorefrontAPI.Maybe<Pick<StorefrontAPI.Image, 'url'>>;
      }>;
    }>;
  };
  headerMenu?: StorefrontAPI.Maybe<
    Pick<StorefrontAPI.Menu, 'id'> & {
      items: Array<
        Pick<
          StorefrontAPI.MenuItem,
          'id' | 'resourceId' | 'tags' | 'title' | 'type' | 'url'
        > & {
          items: Array<
            Pick<
              StorefrontAPI.MenuItem,
              'id' | 'resourceId' | 'tags' | 'title' | 'type' | 'url'
            >
          >;
        }
      >;
    }
  >;
  footerMenu?: StorefrontAPI.Maybe<
    Pick<StorefrontAPI.Menu, 'id'> & {
      items: Array<
        Pick<
          StorefrontAPI.MenuItem,
          'id' | 'resourceId' | 'tags' | 'title' | 'type' | 'url'
        > & {
          items: Array<
            Pick<
              StorefrontAPI.MenuItem,
              'id' | 'resourceId' | 'tags' | 'title' | 'type' | 'url'
            >
          >;
        }
      >;
    }
  >;
};

export type ShopFragment = Pick<
  StorefrontAPI.Shop,
  'id' | 'name' | 'description'
> & {
  primaryDomain: Pick<StorefrontAPI.Domain, 'url'>;
  brand?: StorefrontAPI.Maybe<{
    logo?: StorefrontAPI.Maybe<{
      image?: StorefrontAPI.Maybe<Pick<StorefrontAPI.Image, 'url'>>;
    }>;
  }>;
};

export type MenuItemFragment = Pick<
  StorefrontAPI.MenuItem,
  'id' | 'resourceId' | 'tags' | 'title' | 'type' | 'url'
>;

export type ChildMenuItemFragment = Pick<
  StorefrontAPI.MenuItem,
  'id' | 'resourceId' | 'tags' | 'title' | 'type' | 'url'
>;

export type ParentMenuItemFragment = Pick<
  StorefrontAPI.MenuItem,
  'id' | 'resourceId' | 'tags' | 'title' | 'type' | 'url'
> & {
  items: Array<
    Pick<
      StorefrontAPI.MenuItem,
      'id' | 'resourceId' | 'tags' | 'title' | 'type' | 'url'
    >
  >;
};

export type MenuFragment = Pick<StorefrontAPI.Menu, 'id'> & {
  items: Array<
    Pick<
      StorefrontAPI.MenuItem,
      'id' | 'resourceId' | 'tags' | 'title' | 'type' | 'url'
    > & {
      items: Array<
        Pick<
          StorefrontAPI.MenuItem,
          'id' | 'resourceId' | 'tags' | 'title' | 'type' | 'url'
        >
      >;
    }
  >;
};

export type StoreRobotsQueryVariables = StorefrontAPI.Exact<{
  country?: StorefrontAPI.InputMaybe<StorefrontAPI.CountryCode>;
  language?: StorefrontAPI.InputMaybe<StorefrontAPI.LanguageCode>;
}>;

export type StoreRobotsQuery = {shop: Pick<StorefrontAPI.Shop, 'id'>};

export type SitemapQueryVariables = StorefrontAPI.Exact<{
  urlLimits?: StorefrontAPI.InputMaybe<StorefrontAPI.Scalars['Int']['input']>;
  language?: StorefrontAPI.InputMaybe<StorefrontAPI.LanguageCode>;
}>;

export type SitemapQuery = {
  products: {
    nodes: Array<
      Pick<
        StorefrontAPI.Product,
        'updatedAt' | 'handle' | 'onlineStoreUrl' | 'title'
      > & {
        featuredImage?: StorefrontAPI.Maybe<
          Pick<StorefrontAPI.Image, 'url' | 'altText'>
        >;
      }
    >;
  };
  collections: {
    nodes: Array<
      Pick<StorefrontAPI.Collection, 'updatedAt' | 'handle' | 'onlineStoreUrl'>
    >;
  };
  pages: {
    nodes: Array<
      Pick<StorefrontAPI.Page, 'updatedAt' | 'handle' | 'onlineStoreUrl'>
    >;
  };
};

export type CustomerAddressUpdateMutationVariables = StorefrontAPI.Exact<{
  address: StorefrontAPI.MailingAddressInput;
  customerAccessToken: StorefrontAPI.Scalars['String']['input'];
  id: StorefrontAPI.Scalars['ID']['input'];
  country?: StorefrontAPI.InputMaybe<StorefrontAPI.CountryCode>;
  language?: StorefrontAPI.InputMaybe<StorefrontAPI.LanguageCode>;
}>;

export type CustomerAddressUpdateMutation = {
  customerAddressUpdate?: StorefrontAPI.Maybe<{
    customerAddress?: StorefrontAPI.Maybe<
      Pick<StorefrontAPI.MailingAddress, 'id'>
    >;
    customerUserErrors: Array<
      Pick<StorefrontAPI.CustomerUserError, 'code' | 'field' | 'message'>
    >;
  }>;
};

export type CustomerAddressDeleteMutationVariables = StorefrontAPI.Exact<{
  customerAccessToken: StorefrontAPI.Scalars['String']['input'];
  id: StorefrontAPI.Scalars['ID']['input'];
  country?: StorefrontAPI.InputMaybe<StorefrontAPI.CountryCode>;
  language?: StorefrontAPI.InputMaybe<StorefrontAPI.LanguageCode>;
}>;

export type CustomerAddressDeleteMutation = {
  customerAddressDelete?: StorefrontAPI.Maybe<
    Pick<
      StorefrontAPI.CustomerAddressDeletePayload,
      'deletedCustomerAddressId'
    > & {
      customerUserErrors: Array<
        Pick<StorefrontAPI.CustomerUserError, 'code' | 'field' | 'message'>
      >;
    }
  >;
};

export type CustomerDefaultAddressUpdateMutationVariables =
  StorefrontAPI.Exact<{
    addressId: StorefrontAPI.Scalars['ID']['input'];
    customerAccessToken: StorefrontAPI.Scalars['String']['input'];
    country?: StorefrontAPI.InputMaybe<StorefrontAPI.CountryCode>;
    language?: StorefrontAPI.InputMaybe<StorefrontAPI.LanguageCode>;
  }>;

export type CustomerDefaultAddressUpdateMutation = {
  customerDefaultAddressUpdate?: StorefrontAPI.Maybe<{
    customer?: StorefrontAPI.Maybe<{
      defaultAddress?: StorefrontAPI.Maybe<
        Pick<StorefrontAPI.MailingAddress, 'id'>
      >;
    }>;
    customerUserErrors: Array<
      Pick<StorefrontAPI.CustomerUserError, 'code' | 'field' | 'message'>
    >;
  }>;
};

export type CustomerAddressCreateMutationVariables = StorefrontAPI.Exact<{
  address: StorefrontAPI.MailingAddressInput;
  customerAccessToken: StorefrontAPI.Scalars['String']['input'];
  country?: StorefrontAPI.InputMaybe<StorefrontAPI.CountryCode>;
  language?: StorefrontAPI.InputMaybe<StorefrontAPI.LanguageCode>;
}>;

export type CustomerAddressCreateMutation = {
  customerAddressCreate?: StorefrontAPI.Maybe<{
    customerAddress?: StorefrontAPI.Maybe<
      Pick<StorefrontAPI.MailingAddress, 'id'>
    >;
    customerUserErrors: Array<
      Pick<StorefrontAPI.CustomerUserError, 'code' | 'field' | 'message'>
    >;
  }>;
};

export type CustomerFragment = Pick<
  StorefrontAPI.Customer,
  | 'acceptsMarketing'
  | 'email'
  | 'firstName'
  | 'lastName'
  | 'numberOfOrders'
  | 'phone'
> & {
  addresses: {
    nodes: Array<
      Pick<
        StorefrontAPI.MailingAddress,
        | 'id'
        | 'formatted'
        | 'firstName'
        | 'lastName'
        | 'company'
        | 'address1'
        | 'address2'
        | 'country'
        | 'province'
        | 'city'
        | 'zip'
        | 'phone'
      >
    >;
  };
  defaultAddress?: StorefrontAPI.Maybe<
    Pick<
      StorefrontAPI.MailingAddress,
      | 'id'
      | 'formatted'
      | 'firstName'
      | 'lastName'
      | 'company'
      | 'address1'
      | 'address2'
      | 'country'
      | 'province'
      | 'city'
      | 'zip'
      | 'phone'
    >
  >;
};

export type AddressFragment = Pick<
  StorefrontAPI.MailingAddress,
  | 'id'
  | 'formatted'
  | 'firstName'
  | 'lastName'
  | 'company'
  | 'address1'
  | 'address2'
  | 'country'
  | 'province'
  | 'city'
  | 'zip'
  | 'phone'
>;

export type CustomerQueryVariables = StorefrontAPI.Exact<{
  customerAccessToken: StorefrontAPI.Scalars['String']['input'];
  country?: StorefrontAPI.InputMaybe<StorefrontAPI.CountryCode>;
  language?: StorefrontAPI.InputMaybe<StorefrontAPI.LanguageCode>;
}>;

export type CustomerQuery = {
  customer?: StorefrontAPI.Maybe<
    Pick<
      StorefrontAPI.Customer,
      | 'acceptsMarketing'
      | 'email'
      | 'firstName'
      | 'lastName'
      | 'numberOfOrders'
      | 'phone'
    > & {
      addresses: {
        nodes: Array<
          Pick<
            StorefrontAPI.MailingAddress,
            | 'id'
            | 'formatted'
            | 'firstName'
            | 'lastName'
            | 'company'
            | 'address1'
            | 'address2'
            | 'country'
            | 'province'
            | 'city'
            | 'zip'
            | 'phone'
          >
        >;
      };
      defaultAddress?: StorefrontAPI.Maybe<
        Pick<
          StorefrontAPI.MailingAddress,
          | 'id'
          | 'formatted'
          | 'firstName'
          | 'lastName'
          | 'company'
          | 'address1'
          | 'address2'
          | 'country'
          | 'province'
          | 'city'
          | 'zip'
          | 'phone'
        >
      >;
    }
  >;
};

export type OrderMoneyFragment = Pick<
  StorefrontAPI.MoneyV2,
  'amount' | 'currencyCode'
>;

export type AddressFullFragment = Pick<
  StorefrontAPI.MailingAddress,
  | 'address1'
  | 'address2'
  | 'city'
  | 'company'
  | 'country'
  | 'countryCodeV2'
  | 'firstName'
  | 'formatted'
  | 'id'
  | 'lastName'
  | 'name'
  | 'phone'
  | 'province'
  | 'provinceCode'
  | 'zip'
>;

export type DiscountApplicationFragment = {
  value:
    | ({__typename: 'MoneyV2'} & Pick<
        StorefrontAPI.MoneyV2,
        'amount' | 'currencyCode'
      >)
    | ({__typename: 'PricingPercentageValue'} & Pick<
        StorefrontAPI.PricingPercentageValue,
        'percentage'
      >);
};

export type OrderLineProductVariantFragment = Pick<
  StorefrontAPI.ProductVariant,
  'id' | 'sku' | 'title'
> & {
  image?: StorefrontAPI.Maybe<
    Pick<StorefrontAPI.Image, 'altText' | 'height' | 'url' | 'id' | 'width'>
  >;
  price: Pick<StorefrontAPI.MoneyV2, 'amount' | 'currencyCode'>;
  product: Pick<StorefrontAPI.Product, 'handle'>;
};

export type OrderLineItemFullFragment = Pick<
  StorefrontAPI.OrderLineItem,
  'title' | 'quantity'
> & {
  discountAllocations: Array<{
    allocatedAmount: Pick<StorefrontAPI.MoneyV2, 'amount' | 'currencyCode'>;
    discountApplication: {
      value:
        | ({__typename: 'MoneyV2'} & Pick<
            StorefrontAPI.MoneyV2,
            'amount' | 'currencyCode'
          >)
        | ({__typename: 'PricingPercentageValue'} & Pick<
            StorefrontAPI.PricingPercentageValue,
            'percentage'
          >);
    };
  }>;
  originalTotalPrice: Pick<StorefrontAPI.MoneyV2, 'amount' | 'currencyCode'>;
  discountedTotalPrice: Pick<StorefrontAPI.MoneyV2, 'amount' | 'currencyCode'>;
  variant?: StorefrontAPI.Maybe<
    Pick<StorefrontAPI.ProductVariant, 'id' | 'sku' | 'title'> & {
      image?: StorefrontAPI.Maybe<
        Pick<StorefrontAPI.Image, 'altText' | 'height' | 'url' | 'id' | 'width'>
      >;
      price: Pick<StorefrontAPI.MoneyV2, 'amount' | 'currencyCode'>;
      product: Pick<StorefrontAPI.Product, 'handle'>;
    }
  >;
};

export type OrderFragment = Pick<
  StorefrontAPI.Order,
  | 'id'
  | 'name'
  | 'orderNumber'
  | 'statusUrl'
  | 'processedAt'
  | 'fulfillmentStatus'
> & {
  totalTaxV2?: StorefrontAPI.Maybe<
    Pick<StorefrontAPI.MoneyV2, 'amount' | 'currencyCode'>
  >;
  totalPriceV2: Pick<StorefrontAPI.MoneyV2, 'amount' | 'currencyCode'>;
  subtotalPriceV2?: StorefrontAPI.Maybe<
    Pick<StorefrontAPI.MoneyV2, 'amount' | 'currencyCode'>
  >;
  shippingAddress?: StorefrontAPI.Maybe<
    Pick<
      StorefrontAPI.MailingAddress,
      | 'address1'
      | 'address2'
      | 'city'
      | 'company'
      | 'country'
      | 'countryCodeV2'
      | 'firstName'
      | 'formatted'
      | 'id'
      | 'lastName'
      | 'name'
      | 'phone'
      | 'province'
      | 'provinceCode'
      | 'zip'
    >
  >;
  discountApplications: {
    nodes: Array<{
      value:
        | ({__typename: 'MoneyV2'} & Pick<
            StorefrontAPI.MoneyV2,
            'amount' | 'currencyCode'
          >)
        | ({__typename: 'PricingPercentageValue'} & Pick<
            StorefrontAPI.PricingPercentageValue,
            'percentage'
          >);
    }>;
  };
  lineItems: {
    nodes: Array<
      Pick<StorefrontAPI.OrderLineItem, 'title' | 'quantity'> & {
        discountAllocations: Array<{
          allocatedAmount: Pick<
            StorefrontAPI.MoneyV2,
            'amount' | 'currencyCode'
          >;
          discountApplication: {
            value:
              | ({__typename: 'MoneyV2'} & Pick<
                  StorefrontAPI.MoneyV2,
                  'amount' | 'currencyCode'
                >)
              | ({__typename: 'PricingPercentageValue'} & Pick<
                  StorefrontAPI.PricingPercentageValue,
                  'percentage'
                >);
          };
        }>;
        originalTotalPrice: Pick<
          StorefrontAPI.MoneyV2,
          'amount' | 'currencyCode'
        >;
        discountedTotalPrice: Pick<
          StorefrontAPI.MoneyV2,
          'amount' | 'currencyCode'
        >;
        variant?: StorefrontAPI.Maybe<
          Pick<StorefrontAPI.ProductVariant, 'id' | 'sku' | 'title'> & {
            image?: StorefrontAPI.Maybe<
              Pick<
                StorefrontAPI.Image,
                'altText' | 'height' | 'url' | 'id' | 'width'
              >
            >;
            price: Pick<StorefrontAPI.MoneyV2, 'amount' | 'currencyCode'>;
            product: Pick<StorefrontAPI.Product, 'handle'>;
          }
        >;
      }
    >;
  };
};

export type OrderQueryVariables = StorefrontAPI.Exact<{
  country?: StorefrontAPI.InputMaybe<StorefrontAPI.CountryCode>;
  language?: StorefrontAPI.InputMaybe<StorefrontAPI.LanguageCode>;
  orderId: StorefrontAPI.Scalars['ID']['input'];
}>;

export type OrderQuery = {
  order?: StorefrontAPI.Maybe<
    Pick<
      StorefrontAPI.Order,
      | 'id'
      | 'name'
      | 'orderNumber'
      | 'statusUrl'
      | 'processedAt'
      | 'fulfillmentStatus'
    > & {
      totalTaxV2?: StorefrontAPI.Maybe<
        Pick<StorefrontAPI.MoneyV2, 'amount' | 'currencyCode'>
      >;
      totalPriceV2: Pick<StorefrontAPI.MoneyV2, 'amount' | 'currencyCode'>;
      subtotalPriceV2?: StorefrontAPI.Maybe<
        Pick<StorefrontAPI.MoneyV2, 'amount' | 'currencyCode'>
      >;
      shippingAddress?: StorefrontAPI.Maybe<
        Pick<
          StorefrontAPI.MailingAddress,
          | 'address1'
          | 'address2'
          | 'city'
          | 'company'
          | 'country'
          | 'countryCodeV2'
          | 'firstName'
          | 'formatted'
          | 'id'
          | 'lastName'
          | 'name'
          | 'phone'
          | 'province'
          | 'provinceCode'
          | 'zip'
        >
      >;
      discountApplications: {
        nodes: Array<{
          value:
            | ({__typename: 'MoneyV2'} & Pick<
                StorefrontAPI.MoneyV2,
                'amount' | 'currencyCode'
              >)
            | ({__typename: 'PricingPercentageValue'} & Pick<
                StorefrontAPI.PricingPercentageValue,
                'percentage'
              >);
        }>;
      };
      lineItems: {
        nodes: Array<
          Pick<StorefrontAPI.OrderLineItem, 'title' | 'quantity'> & {
            discountAllocations: Array<{
              allocatedAmount: Pick<
                StorefrontAPI.MoneyV2,
                'amount' | 'currencyCode'
              >;
              discountApplication: {
                value:
                  | ({__typename: 'MoneyV2'} & Pick<
                      StorefrontAPI.MoneyV2,
                      'amount' | 'currencyCode'
                    >)
                  | ({__typename: 'PricingPercentageValue'} & Pick<
                      StorefrontAPI.PricingPercentageValue,
                      'percentage'
                    >);
              };
            }>;
            originalTotalPrice: Pick<
              StorefrontAPI.MoneyV2,
              'amount' | 'currencyCode'
            >;
            discountedTotalPrice: Pick<
              StorefrontAPI.MoneyV2,
              'amount' | 'currencyCode'
            >;
            variant?: StorefrontAPI.Maybe<
              Pick<StorefrontAPI.ProductVariant, 'id' | 'sku' | 'title'> & {
                image?: StorefrontAPI.Maybe<
                  Pick<
                    StorefrontAPI.Image,
                    'altText' | 'height' | 'url' | 'id' | 'width'
                  >
                >;
                price: Pick<StorefrontAPI.MoneyV2, 'amount' | 'currencyCode'>;
                product: Pick<StorefrontAPI.Product, 'handle'>;
              }
            >;
          }
        >;
      };
    }
  >;
};

export type OrderItemFragment = Pick<
  StorefrontAPI.Order,
  | 'financialStatus'
  | 'fulfillmentStatus'
  | 'id'
  | 'orderNumber'
  | 'customerUrl'
  | 'statusUrl'
  | 'processedAt'
> & {
  currentTotalPrice: Pick<StorefrontAPI.MoneyV2, 'amount' | 'currencyCode'>;
  lineItems: {
    nodes: Array<
      Pick<StorefrontAPI.OrderLineItem, 'title'> & {
        variant?: StorefrontAPI.Maybe<{
          image?: StorefrontAPI.Maybe<
            Pick<StorefrontAPI.Image, 'url' | 'altText' | 'height' | 'width'>
          >;
        }>;
      }
    >;
  };
};

export type CustomerOrdersFragment = Pick<
  StorefrontAPI.Customer,
  'numberOfOrders'
> & {
  orders: {
    nodes: Array<
      Pick<
        StorefrontAPI.Order,
        | 'financialStatus'
        | 'fulfillmentStatus'
        | 'id'
        | 'orderNumber'
        | 'customerUrl'
        | 'statusUrl'
        | 'processedAt'
      > & {
        currentTotalPrice: Pick<
          StorefrontAPI.MoneyV2,
          'amount' | 'currencyCode'
        >;
        lineItems: {
          nodes: Array<
            Pick<StorefrontAPI.OrderLineItem, 'title'> & {
              variant?: StorefrontAPI.Maybe<{
                image?: StorefrontAPI.Maybe<
                  Pick<
                    StorefrontAPI.Image,
                    'url' | 'altText' | 'height' | 'width'
                  >
                >;
              }>;
            }
          >;
        };
      }
    >;
    pageInfo: Pick<
      StorefrontAPI.PageInfo,
      'hasPreviousPage' | 'hasNextPage' | 'endCursor' | 'startCursor'
    >;
  };
};

export type CustomerOrdersQueryVariables = StorefrontAPI.Exact<{
  country?: StorefrontAPI.InputMaybe<StorefrontAPI.CountryCode>;
  customerAccessToken: StorefrontAPI.Scalars['String']['input'];
  endCursor?: StorefrontAPI.InputMaybe<
    StorefrontAPI.Scalars['String']['input']
  >;
  first?: StorefrontAPI.InputMaybe<StorefrontAPI.Scalars['Int']['input']>;
  language?: StorefrontAPI.InputMaybe<StorefrontAPI.LanguageCode>;
  last?: StorefrontAPI.InputMaybe<StorefrontAPI.Scalars['Int']['input']>;
  startCursor?: StorefrontAPI.InputMaybe<
    StorefrontAPI.Scalars['String']['input']
  >;
}>;

export type CustomerOrdersQuery = {
  customer?: StorefrontAPI.Maybe<
    Pick<StorefrontAPI.Customer, 'numberOfOrders'> & {
      orders: {
        nodes: Array<
          Pick<
            StorefrontAPI.Order,
            | 'financialStatus'
            | 'fulfillmentStatus'
            | 'id'
            | 'orderNumber'
            | 'customerUrl'
            | 'statusUrl'
            | 'processedAt'
          > & {
            currentTotalPrice: Pick<
              StorefrontAPI.MoneyV2,
              'amount' | 'currencyCode'
            >;
            lineItems: {
              nodes: Array<
                Pick<StorefrontAPI.OrderLineItem, 'title'> & {
                  variant?: StorefrontAPI.Maybe<{
                    image?: StorefrontAPI.Maybe<
                      Pick<
                        StorefrontAPI.Image,
                        'url' | 'altText' | 'height' | 'width'
                      >
                    >;
                  }>;
                }
              >;
            };
          }
        >;
        pageInfo: Pick<
          StorefrontAPI.PageInfo,
          'hasPreviousPage' | 'hasNextPage' | 'endCursor' | 'startCursor'
        >;
      };
    }
  >;
};

export type CustomerUpdateMutationVariables = StorefrontAPI.Exact<{
  customerAccessToken: StorefrontAPI.Scalars['String']['input'];
  customer: StorefrontAPI.CustomerUpdateInput;
  country?: StorefrontAPI.InputMaybe<StorefrontAPI.CountryCode>;
  language?: StorefrontAPI.InputMaybe<StorefrontAPI.LanguageCode>;
}>;

export type CustomerUpdateMutation = {
  customerUpdate?: StorefrontAPI.Maybe<{
    customer?: StorefrontAPI.Maybe<
      Pick<
        StorefrontAPI.Customer,
        'acceptsMarketing' | 'email' | 'firstName' | 'id' | 'lastName' | 'phone'
      >
    >;
    customerAccessToken?: StorefrontAPI.Maybe<
      Pick<StorefrontAPI.CustomerAccessToken, 'accessToken' | 'expiresAt'>
    >;
    customerUserErrors: Array<
      Pick<StorefrontAPI.CustomerUserError, 'code' | 'field' | 'message'>
    >;
  }>;
};

export type CustomerActivateMutationVariables = StorefrontAPI.Exact<{
  id: StorefrontAPI.Scalars['ID']['input'];
  input: StorefrontAPI.CustomerActivateInput;
  country?: StorefrontAPI.InputMaybe<StorefrontAPI.CountryCode>;
  language?: StorefrontAPI.InputMaybe<StorefrontAPI.LanguageCode>;
}>;

export type CustomerActivateMutation = {
  customerActivate?: StorefrontAPI.Maybe<{
    customerAccessToken?: StorefrontAPI.Maybe<
      Pick<StorefrontAPI.CustomerAccessToken, 'accessToken' | 'expiresAt'>
    >;
    customerUserErrors: Array<
      Pick<StorefrontAPI.CustomerUserError, 'code' | 'field' | 'message'>
    >;
  }>;
};

export type LoginMutationVariables = StorefrontAPI.Exact<{
  input: StorefrontAPI.CustomerAccessTokenCreateInput;
}>;

export type LoginMutation = {
  customerAccessTokenCreate?: StorefrontAPI.Maybe<{
    customerUserErrors: Array<
      Pick<StorefrontAPI.CustomerUserError, 'code' | 'field' | 'message'>
    >;
    customerAccessToken?: StorefrontAPI.Maybe<
      Pick<StorefrontAPI.CustomerAccessToken, 'accessToken' | 'expiresAt'>
    >;
  }>;
};

export type CustomerRecoverMutationVariables = StorefrontAPI.Exact<{
  email: StorefrontAPI.Scalars['String']['input'];
  country?: StorefrontAPI.InputMaybe<StorefrontAPI.CountryCode>;
  language?: StorefrontAPI.InputMaybe<StorefrontAPI.LanguageCode>;
}>;

export type CustomerRecoverMutation = {
  customerRecover?: StorefrontAPI.Maybe<{
    customerUserErrors: Array<
      Pick<StorefrontAPI.CustomerUserError, 'code' | 'field' | 'message'>
    >;
  }>;
};

export type CustomerCreateMutationVariables = StorefrontAPI.Exact<{
  input: StorefrontAPI.CustomerCreateInput;
  country?: StorefrontAPI.InputMaybe<StorefrontAPI.CountryCode>;
  language?: StorefrontAPI.InputMaybe<StorefrontAPI.LanguageCode>;
}>;

export type CustomerCreateMutation = {
  customerCreate?: StorefrontAPI.Maybe<{
    customer?: StorefrontAPI.Maybe<Pick<StorefrontAPI.Customer, 'id'>>;
    customerUserErrors: Array<
      Pick<StorefrontAPI.CustomerUserError, 'code' | 'field' | 'message'>
    >;
  }>;
};

export type RegisterLoginMutationVariables = StorefrontAPI.Exact<{
  input: StorefrontAPI.CustomerAccessTokenCreateInput;
  country?: StorefrontAPI.InputMaybe<StorefrontAPI.CountryCode>;
  language?: StorefrontAPI.InputMaybe<StorefrontAPI.LanguageCode>;
}>;

export type RegisterLoginMutation = {
  customerAccessTokenCreate?: StorefrontAPI.Maybe<{
    customerUserErrors: Array<
      Pick<StorefrontAPI.CustomerUserError, 'code' | 'field' | 'message'>
    >;
    customerAccessToken?: StorefrontAPI.Maybe<
      Pick<StorefrontAPI.CustomerAccessToken, 'accessToken' | 'expiresAt'>
    >;
  }>;
};

export type CustomerResetMutationVariables = StorefrontAPI.Exact<{
  id: StorefrontAPI.Scalars['ID']['input'];
  input: StorefrontAPI.CustomerResetInput;
  country?: StorefrontAPI.InputMaybe<StorefrontAPI.CountryCode>;
  language?: StorefrontAPI.InputMaybe<StorefrontAPI.LanguageCode>;
}>;

export type CustomerResetMutation = {
  customerReset?: StorefrontAPI.Maybe<{
    customerAccessToken?: StorefrontAPI.Maybe<
      Pick<StorefrontAPI.CustomerAccessToken, 'accessToken' | 'expiresAt'>
    >;
    customerUserErrors: Array<
      Pick<StorefrontAPI.CustomerUserError, 'code' | 'field' | 'message'>
    >;
  }>;
};

export type ArticleQueryVariables = StorefrontAPI.Exact<{
  articleHandle: StorefrontAPI.Scalars['String']['input'];
  blogHandle: StorefrontAPI.Scalars['String']['input'];
  country?: StorefrontAPI.InputMaybe<StorefrontAPI.CountryCode>;
  language?: StorefrontAPI.InputMaybe<StorefrontAPI.LanguageCode>;
}>;

export type ArticleQuery = {
  blog?: StorefrontAPI.Maybe<{
    articleByHandle?: StorefrontAPI.Maybe<
      Pick<StorefrontAPI.Article, 'title' | 'contentHtml' | 'publishedAt'> & {
        author?: StorefrontAPI.Maybe<Pick<StorefrontAPI.ArticleAuthor, 'name'>>;
        image?: StorefrontAPI.Maybe<
          Pick<
            StorefrontAPI.Image,
            'id' | 'altText' | 'url' | 'width' | 'height'
          >
        >;
        seo?: StorefrontAPI.Maybe<
          Pick<StorefrontAPI.Seo, 'description' | 'title'>
        >;
      }
    >;
  }>;
};

export type CollectionDetailsQueryVariables = StorefrontAPI.Exact<{
  handle: StorefrontAPI.Scalars['String']['input'];
  language?: StorefrontAPI.InputMaybe<StorefrontAPI.LanguageCode>;
  filters?: StorefrontAPI.InputMaybe<
    Array<StorefrontAPI.ProductFilter> | StorefrontAPI.ProductFilter
  >;
  sortKey: StorefrontAPI.ProductCollectionSortKeys;
  reverse?: StorefrontAPI.InputMaybe<StorefrontAPI.Scalars['Boolean']['input']>;
  first?: StorefrontAPI.InputMaybe<StorefrontAPI.Scalars['Int']['input']>;
  last?: StorefrontAPI.InputMaybe<StorefrontAPI.Scalars['Int']['input']>;
  startCursor?: StorefrontAPI.InputMaybe<
    StorefrontAPI.Scalars['String']['input']
  >;
  endCursor?: StorefrontAPI.InputMaybe<
    StorefrontAPI.Scalars['String']['input']
  >;
}>;

export type CollectionDetailsQuery = {
  collection?: StorefrontAPI.Maybe<
    Pick<
      StorefrontAPI.Collection,
      'id' | 'handle' | 'title' | 'description'
    > & {
      seo: Pick<StorefrontAPI.Seo, 'description' | 'title'>;
      image?: StorefrontAPI.Maybe<
        Pick<StorefrontAPI.Image, 'id' | 'url' | 'width' | 'height' | 'altText'>
      >;
      products: {
        filters: Array<
          Pick<StorefrontAPI.Filter, 'id' | 'label' | 'type'> & {
            values: Array<
              Pick<
                StorefrontAPI.FilterValue,
                'id' | 'label' | 'count' | 'input'
              >
            >;
          }
        >;
        nodes: Array<
          Pick<
            StorefrontAPI.Product,
            'id' | 'title' | 'publishedAt' | 'handle' | 'vendor' | 'description'
          > & {
            media: {
              nodes: Array<
                | ({__typename: 'ExternalVideo'} & Pick<
                    StorefrontAPI.ExternalVideo,
                    'id' | 'embedUrl' | 'host' | 'mediaContentType' | 'alt'
                  > & {
                      previewImage?: StorefrontAPI.Maybe<
                        Pick<StorefrontAPI.Image, 'url'>
                      >;
                    })
                | ({__typename: 'MediaImage'} & Pick<
                    StorefrontAPI.MediaImage,
                    'id' | 'mediaContentType' | 'alt'
                  > & {
                      image?: StorefrontAPI.Maybe<
                        Pick<
                          StorefrontAPI.Image,
                          'id' | 'url' | 'width' | 'height'
                        >
                      >;
                      previewImage?: StorefrontAPI.Maybe<
                        Pick<StorefrontAPI.Image, 'url'>
                      >;
                    })
                | ({__typename: 'Model3d'} & Pick<
                    StorefrontAPI.Model3d,
                    'id' | 'mediaContentType' | 'alt'
                  > & {
                      sources: Array<
                        Pick<StorefrontAPI.Model3dSource, 'mimeType' | 'url'>
                      >;
                      previewImage?: StorefrontAPI.Maybe<
                        Pick<StorefrontAPI.Image, 'url'>
                      >;
                    })
                | ({__typename: 'Video'} & Pick<
                    StorefrontAPI.Video,
                    'id' | 'mediaContentType' | 'alt'
                  > & {
                      sources: Array<
                        Pick<StorefrontAPI.VideoSource, 'mimeType' | 'url'>
                      >;
                      previewImage?: StorefrontAPI.Maybe<
                        Pick<StorefrontAPI.Image, 'url'>
                      >;
                    })
              >;
            };
            options: Array<
              Pick<StorefrontAPI.ProductOption, 'name' | 'values'>
            >;
            variants: {
              nodes: Array<
                Pick<
                  StorefrontAPI.ProductVariant,
                  'id' | 'availableForSale' | 'sku' | 'title'
                > & {
                  selectedOptions: Array<
                    Pick<StorefrontAPI.SelectedOption, 'name' | 'value'>
                  >;
                  image?: StorefrontAPI.Maybe<
                    Pick<
                      StorefrontAPI.Image,
                      'id' | 'url' | 'altText' | 'width' | 'height'
                    >
                  >;
                  price: Pick<StorefrontAPI.MoneyV2, 'amount' | 'currencyCode'>;
                  compareAtPrice?: StorefrontAPI.Maybe<
                    Pick<StorefrontAPI.MoneyV2, 'amount' | 'currencyCode'>
                  >;
                  unitPrice?: StorefrontAPI.Maybe<
                    Pick<StorefrontAPI.MoneyV2, 'amount' | 'currencyCode'>
                  >;
                  product: Pick<StorefrontAPI.Product, 'title' | 'handle'>;
                }
              >;
            };
          }
        >;
        pageInfo: Pick<
          StorefrontAPI.PageInfo,
          'hasPreviousPage' | 'hasNextPage' | 'startCursor' | 'endCursor'
        >;
      };
    }
  >;
  collections: {
    edges: Array<{node: Pick<StorefrontAPI.Collection, 'title' | 'handle'>}>;
  };
};

export type CollectionFragment = Pick<
  StorefrontAPI.Collection,
  'id' | 'title' | 'handle'
> & {
  image?: StorefrontAPI.Maybe<
    Pick<StorefrontAPI.Image, 'id' | 'url' | 'altText' | 'width' | 'height'>
  >;
};

export type StoreCollectionsQueryVariables = StorefrontAPI.Exact<{
  country?: StorefrontAPI.InputMaybe<StorefrontAPI.CountryCode>;
  endCursor?: StorefrontAPI.InputMaybe<
    StorefrontAPI.Scalars['String']['input']
  >;
  first?: StorefrontAPI.InputMaybe<StorefrontAPI.Scalars['Int']['input']>;
  language?: StorefrontAPI.InputMaybe<StorefrontAPI.LanguageCode>;
  last?: StorefrontAPI.InputMaybe<StorefrontAPI.Scalars['Int']['input']>;
  startCursor?: StorefrontAPI.InputMaybe<
    StorefrontAPI.Scalars['String']['input']
  >;
}>;

export type StoreCollectionsQuery = {
  collections: {
    nodes: Array<
      Pick<StorefrontAPI.Collection, 'id' | 'title' | 'handle'> & {
        image?: StorefrontAPI.Maybe<
          Pick<
            StorefrontAPI.Image,
            'id' | 'url' | 'altText' | 'width' | 'height'
          >
        >;
      }
    >;
    pageInfo: Pick<
      StorefrontAPI.PageInfo,
      'hasNextPage' | 'hasPreviousPage' | 'startCursor' | 'endCursor'
    >;
  };
};

export type FeaturedItemsQueryVariables = StorefrontAPI.Exact<{
  pageBy?: StorefrontAPI.InputMaybe<StorefrontAPI.Scalars['Int']['input']>;
}>;

export type FeaturedItemsQuery = {
  featuredCollections: {
    nodes: Array<
      Pick<StorefrontAPI.Collection, 'id' | 'title' | 'handle'> & {
        image?: StorefrontAPI.Maybe<
          Pick<StorefrontAPI.Image, 'altText' | 'width' | 'height' | 'url'>
        >;
      }
    >;
  };
  featuredProducts: {
    nodes: Array<
      Pick<
        StorefrontAPI.Product,
        'id' | 'title' | 'publishedAt' | 'handle' | 'vendor' | 'description'
      > & {
        media: {
          nodes: Array<
            | ({__typename: 'ExternalVideo'} & Pick<
                StorefrontAPI.ExternalVideo,
                'id' | 'embedUrl' | 'host' | 'mediaContentType' | 'alt'
              > & {
                  previewImage?: StorefrontAPI.Maybe<
                    Pick<StorefrontAPI.Image, 'url'>
                  >;
                })
            | ({__typename: 'MediaImage'} & Pick<
                StorefrontAPI.MediaImage,
                'id' | 'mediaContentType' | 'alt'
              > & {
                  image?: StorefrontAPI.Maybe<
                    Pick<StorefrontAPI.Image, 'id' | 'url' | 'width' | 'height'>
                  >;
                  previewImage?: StorefrontAPI.Maybe<
                    Pick<StorefrontAPI.Image, 'url'>
                  >;
                })
            | ({__typename: 'Model3d'} & Pick<
                StorefrontAPI.Model3d,
                'id' | 'mediaContentType' | 'alt'
              > & {
                  sources: Array<
                    Pick<StorefrontAPI.Model3dSource, 'mimeType' | 'url'>
                  >;
                  previewImage?: StorefrontAPI.Maybe<
                    Pick<StorefrontAPI.Image, 'url'>
                  >;
                })
            | ({__typename: 'Video'} & Pick<
                StorefrontAPI.Video,
                'id' | 'mediaContentType' | 'alt'
              > & {
                  sources: Array<
                    Pick<StorefrontAPI.VideoSource, 'mimeType' | 'url'>
                  >;
                  previewImage?: StorefrontAPI.Maybe<
                    Pick<StorefrontAPI.Image, 'url'>
                  >;
                })
          >;
        };
        options: Array<Pick<StorefrontAPI.ProductOption, 'name' | 'values'>>;
        variants: {
          nodes: Array<
            Pick<
              StorefrontAPI.ProductVariant,
              'id' | 'availableForSale' | 'sku' | 'title'
            > & {
              selectedOptions: Array<
                Pick<StorefrontAPI.SelectedOption, 'name' | 'value'>
              >;
              image?: StorefrontAPI.Maybe<
                Pick<
                  StorefrontAPI.Image,
                  'id' | 'url' | 'altText' | 'width' | 'height'
                >
              >;
              price: Pick<StorefrontAPI.MoneyV2, 'amount' | 'currencyCode'>;
              compareAtPrice?: StorefrontAPI.Maybe<
                Pick<StorefrontAPI.MoneyV2, 'amount' | 'currencyCode'>
              >;
              unitPrice?: StorefrontAPI.Maybe<
                Pick<StorefrontAPI.MoneyV2, 'amount' | 'currencyCode'>
              >;
              product: Pick<StorefrontAPI.Product, 'title' | 'handle'>;
            }
          >;
        };
      }
    >;
  };
};

export type BlogQueryVariables = StorefrontAPI.Exact<{
  language?: StorefrontAPI.InputMaybe<StorefrontAPI.LanguageCode>;
  blogHandle: StorefrontAPI.Scalars['String']['input'];
  first?: StorefrontAPI.InputMaybe<StorefrontAPI.Scalars['Int']['input']>;
  last?: StorefrontAPI.InputMaybe<StorefrontAPI.Scalars['Int']['input']>;
  startCursor?: StorefrontAPI.InputMaybe<
    StorefrontAPI.Scalars['String']['input']
  >;
  endCursor?: StorefrontAPI.InputMaybe<
    StorefrontAPI.Scalars['String']['input']
  >;
}>;

export type BlogQuery = {
  blog?: StorefrontAPI.Maybe<
    Pick<StorefrontAPI.Blog, 'title'> & {
      seo?: StorefrontAPI.Maybe<
        Pick<StorefrontAPI.Seo, 'title' | 'description'>
      >;
      articles: {
        nodes: Array<
          Pick<
            StorefrontAPI.Article,
            'contentHtml' | 'handle' | 'id' | 'publishedAt' | 'title'
          > & {
            author?: StorefrontAPI.Maybe<
              Pick<StorefrontAPI.ArticleAuthor, 'name'>
            >;
            image?: StorefrontAPI.Maybe<
              Pick<
                StorefrontAPI.Image,
                'id' | 'altText' | 'url' | 'width' | 'height'
              >
            >;
            blog: Pick<StorefrontAPI.Blog, 'handle'>;
          }
        >;
        pageInfo: Pick<
          StorefrontAPI.PageInfo,
          'hasPreviousPage' | 'hasNextPage' | 'endCursor' | 'startCursor'
        >;
      };
    }
  >;
};

export type ArticleItemFragment = Pick<
  StorefrontAPI.Article,
  'contentHtml' | 'handle' | 'id' | 'publishedAt' | 'title'
> & {
  author?: StorefrontAPI.Maybe<Pick<StorefrontAPI.ArticleAuthor, 'name'>>;
  image?: StorefrontAPI.Maybe<
    Pick<StorefrontAPI.Image, 'id' | 'altText' | 'url' | 'width' | 'height'>
  >;
  blog: Pick<StorefrontAPI.Blog, 'handle'>;
};

export type PageDetailsQueryVariables = StorefrontAPI.Exact<{
  language?: StorefrontAPI.InputMaybe<StorefrontAPI.LanguageCode>;
  handle: StorefrontAPI.Scalars['String']['input'];
}>;

export type PageDetailsQuery = {
  page?: StorefrontAPI.Maybe<
    Pick<StorefrontAPI.Page, 'id' | 'title' | 'body'> & {
      seo?: StorefrontAPI.Maybe<
        Pick<StorefrontAPI.Seo, 'description' | 'title'>
      >;
    }
  >;
};

export type PolicyFragment = Pick<
  StorefrontAPI.ShopPolicy,
  'body' | 'handle' | 'id' | 'title' | 'url'
>;

export type PolicyQueryVariables = StorefrontAPI.Exact<{
  country?: StorefrontAPI.InputMaybe<StorefrontAPI.CountryCode>;
  language?: StorefrontAPI.InputMaybe<StorefrontAPI.LanguageCode>;
  privacyPolicy: StorefrontAPI.Scalars['Boolean']['input'];
  refundPolicy: StorefrontAPI.Scalars['Boolean']['input'];
  shippingPolicy: StorefrontAPI.Scalars['Boolean']['input'];
  termsOfService: StorefrontAPI.Scalars['Boolean']['input'];
}>;

export type PolicyQuery = {
  shop: {
    privacyPolicy?: StorefrontAPI.Maybe<
      Pick<StorefrontAPI.ShopPolicy, 'body' | 'handle' | 'id' | 'title' | 'url'>
    >;
    shippingPolicy?: StorefrontAPI.Maybe<
      Pick<StorefrontAPI.ShopPolicy, 'body' | 'handle' | 'id' | 'title' | 'url'>
    >;
    termsOfService?: StorefrontAPI.Maybe<
      Pick<StorefrontAPI.ShopPolicy, 'body' | 'handle' | 'id' | 'title' | 'url'>
    >;
    refundPolicy?: StorefrontAPI.Maybe<
      Pick<StorefrontAPI.ShopPolicy, 'body' | 'handle' | 'id' | 'title' | 'url'>
    >;
  };
};

export type PolicyItemFragment = Pick<
  StorefrontAPI.ShopPolicy,
  'id' | 'title' | 'handle'
>;

export type PoliciesQueryVariables = StorefrontAPI.Exact<{
  country?: StorefrontAPI.InputMaybe<StorefrontAPI.CountryCode>;
  language?: StorefrontAPI.InputMaybe<StorefrontAPI.LanguageCode>;
}>;

export type PoliciesQuery = {
  shop: {
    privacyPolicy?: StorefrontAPI.Maybe<
      Pick<StorefrontAPI.ShopPolicy, 'id' | 'title' | 'handle'>
    >;
    shippingPolicy?: StorefrontAPI.Maybe<
      Pick<StorefrontAPI.ShopPolicy, 'id' | 'title' | 'handle'>
    >;
    termsOfService?: StorefrontAPI.Maybe<
      Pick<StorefrontAPI.ShopPolicy, 'id' | 'title' | 'handle'>
    >;
    refundPolicy?: StorefrontAPI.Maybe<
      Pick<StorefrontAPI.ShopPolicy, 'id' | 'title' | 'handle'>
    >;
    subscriptionPolicy?: StorefrontAPI.Maybe<
      Pick<StorefrontAPI.ShopPolicyWithDefault, 'id' | 'title' | 'handle'>
    >;
  };
};

export type AllProductsQueryVariables = StorefrontAPI.Exact<{
  language?: StorefrontAPI.InputMaybe<StorefrontAPI.LanguageCode>;
  first?: StorefrontAPI.InputMaybe<StorefrontAPI.Scalars['Int']['input']>;
  last?: StorefrontAPI.InputMaybe<StorefrontAPI.Scalars['Int']['input']>;
  startCursor?: StorefrontAPI.InputMaybe<
    StorefrontAPI.Scalars['String']['input']
  >;
  endCursor?: StorefrontAPI.InputMaybe<
    StorefrontAPI.Scalars['String']['input']
  >;
}>;

export type AllProductsQuery = {
  products: {
    filters: Array<
      Pick<StorefrontAPI.Filter, 'id' | 'label' | 'type'> & {
        values: Array<
          Pick<StorefrontAPI.FilterValue, 'id' | 'label' | 'count' | 'input'>
        >;
      }
    >;
    nodes: Array<
      Pick<
        StorefrontAPI.Product,
        'id' | 'title' | 'publishedAt' | 'handle' | 'vendor' | 'description'
      > & {
        media: {
          nodes: Array<
            | ({__typename: 'ExternalVideo'} & Pick<
                StorefrontAPI.ExternalVideo,
                'id' | 'embedUrl' | 'host' | 'mediaContentType' | 'alt'
              > & {
                  previewImage?: StorefrontAPI.Maybe<
                    Pick<StorefrontAPI.Image, 'url'>
                  >;
                })
            | ({__typename: 'MediaImage'} & Pick<
                StorefrontAPI.MediaImage,
                'id' | 'mediaContentType' | 'alt'
              > & {
                  image?: StorefrontAPI.Maybe<
                    Pick<StorefrontAPI.Image, 'id' | 'url' | 'width' | 'height'>
                  >;
                  previewImage?: StorefrontAPI.Maybe<
                    Pick<StorefrontAPI.Image, 'url'>
                  >;
                })
            | ({__typename: 'Model3d'} & Pick<
                StorefrontAPI.Model3d,
                'id' | 'mediaContentType' | 'alt'
              > & {
                  sources: Array<
                    Pick<StorefrontAPI.Model3dSource, 'mimeType' | 'url'>
                  >;
                  previewImage?: StorefrontAPI.Maybe<
                    Pick<StorefrontAPI.Image, 'url'>
                  >;
                })
            | ({__typename: 'Video'} & Pick<
                StorefrontAPI.Video,
                'id' | 'mediaContentType' | 'alt'
              > & {
                  sources: Array<
                    Pick<StorefrontAPI.VideoSource, 'mimeType' | 'url'>
                  >;
                  previewImage?: StorefrontAPI.Maybe<
                    Pick<StorefrontAPI.Image, 'url'>
                  >;
                })
          >;
        };
        options: Array<Pick<StorefrontAPI.ProductOption, 'name' | 'values'>>;
        variants: {
          nodes: Array<
            Pick<
              StorefrontAPI.ProductVariant,
              'id' | 'availableForSale' | 'sku' | 'title'
            > & {
              selectedOptions: Array<
                Pick<StorefrontAPI.SelectedOption, 'name' | 'value'>
              >;
              image?: StorefrontAPI.Maybe<
                Pick<
                  StorefrontAPI.Image,
                  'id' | 'url' | 'altText' | 'width' | 'height'
                >
              >;
              price: Pick<StorefrontAPI.MoneyV2, 'amount' | 'currencyCode'>;
              compareAtPrice?: StorefrontAPI.Maybe<
                Pick<StorefrontAPI.MoneyV2, 'amount' | 'currencyCode'>
              >;
              unitPrice?: StorefrontAPI.Maybe<
                Pick<StorefrontAPI.MoneyV2, 'amount' | 'currencyCode'>
              >;
              product: Pick<StorefrontAPI.Product, 'title' | 'handle'>;
            }
          >;
        };
      }
    >;
    pageInfo: Pick<
      StorefrontAPI.PageInfo,
      'hasPreviousPage' | 'hasNextPage' | 'startCursor' | 'endCursor'
    >;
  };
};

export type PaginatedProductsSearchQueryVariables = StorefrontAPI.Exact<{
  country?: StorefrontAPI.InputMaybe<StorefrontAPI.CountryCode>;
  endCursor?: StorefrontAPI.InputMaybe<
    StorefrontAPI.Scalars['String']['input']
  >;
  first?: StorefrontAPI.InputMaybe<StorefrontAPI.Scalars['Int']['input']>;
  language?: StorefrontAPI.InputMaybe<StorefrontAPI.LanguageCode>;
  last?: StorefrontAPI.InputMaybe<StorefrontAPI.Scalars['Int']['input']>;
  searchTerm?: StorefrontAPI.InputMaybe<
    StorefrontAPI.Scalars['String']['input']
  >;
  startCursor?: StorefrontAPI.InputMaybe<
    StorefrontAPI.Scalars['String']['input']
  >;
}>;

export type PaginatedProductsSearchQuery = {
  products: {
    nodes: Array<
      Pick<
        StorefrontAPI.Product,
        'id' | 'title' | 'publishedAt' | 'handle' | 'vendor' | 'description'
      > & {
        media: {
          nodes: Array<
            | ({__typename: 'ExternalVideo'} & Pick<
                StorefrontAPI.ExternalVideo,
                'id' | 'embedUrl' | 'host' | 'mediaContentType' | 'alt'
              > & {
                  previewImage?: StorefrontAPI.Maybe<
                    Pick<StorefrontAPI.Image, 'url'>
                  >;
                })
            | ({__typename: 'MediaImage'} & Pick<
                StorefrontAPI.MediaImage,
                'id' | 'mediaContentType' | 'alt'
              > & {
                  image?: StorefrontAPI.Maybe<
                    Pick<StorefrontAPI.Image, 'id' | 'url' | 'width' | 'height'>
                  >;
                  previewImage?: StorefrontAPI.Maybe<
                    Pick<StorefrontAPI.Image, 'url'>
                  >;
                })
            | ({__typename: 'Model3d'} & Pick<
                StorefrontAPI.Model3d,
                'id' | 'mediaContentType' | 'alt'
              > & {
                  sources: Array<
                    Pick<StorefrontAPI.Model3dSource, 'mimeType' | 'url'>
                  >;
                  previewImage?: StorefrontAPI.Maybe<
                    Pick<StorefrontAPI.Image, 'url'>
                  >;
                })
            | ({__typename: 'Video'} & Pick<
                StorefrontAPI.Video,
                'id' | 'mediaContentType' | 'alt'
              > & {
                  sources: Array<
                    Pick<StorefrontAPI.VideoSource, 'mimeType' | 'url'>
                  >;
                  previewImage?: StorefrontAPI.Maybe<
                    Pick<StorefrontAPI.Image, 'url'>
                  >;
                })
          >;
        };
        options: Array<Pick<StorefrontAPI.ProductOption, 'name' | 'values'>>;
        variants: {
          nodes: Array<
            Pick<
              StorefrontAPI.ProductVariant,
              'id' | 'availableForSale' | 'sku' | 'title'
            > & {
              selectedOptions: Array<
                Pick<StorefrontAPI.SelectedOption, 'name' | 'value'>
              >;
              image?: StorefrontAPI.Maybe<
                Pick<
                  StorefrontAPI.Image,
                  'id' | 'url' | 'altText' | 'width' | 'height'
                >
              >;
              price: Pick<StorefrontAPI.MoneyV2, 'amount' | 'currencyCode'>;
              compareAtPrice?: StorefrontAPI.Maybe<
                Pick<StorefrontAPI.MoneyV2, 'amount' | 'currencyCode'>
              >;
              unitPrice?: StorefrontAPI.Maybe<
                Pick<StorefrontAPI.MoneyV2, 'amount' | 'currencyCode'>
              >;
              product: Pick<StorefrontAPI.Product, 'title' | 'handle'>;
            }
          >;
        };
      }
    >;
    pageInfo: Pick<
      StorefrontAPI.PageInfo,
      'startCursor' | 'endCursor' | 'hasNextPage' | 'hasPreviousPage'
    >;
  };
};

export type MoneyFragment = Pick<StorefrontAPI.MoneyV2, 'amount'>;

export type CartLineFragment = Pick<
  StorefrontAPI.CartLine,
  'id' | 'quantity'
> & {
  attributes: Array<Pick<StorefrontAPI.Attribute, 'key' | 'value'>>;
  cost: {
    totalAmount: Pick<StorefrontAPI.MoneyV2, 'amount'>;
    amountPerQuantity: Pick<StorefrontAPI.MoneyV2, 'amount'>;
    compareAtAmountPerQuantity?: StorefrontAPI.Maybe<
      Pick<StorefrontAPI.MoneyV2, 'amount'>
    >;
  };
  merchandise: Pick<
    StorefrontAPI.ProductVariant,
    'id' | 'availableForSale' | 'requiresShipping' | 'title'
  > & {
    compareAtPrice?: StorefrontAPI.Maybe<Pick<StorefrontAPI.MoneyV2, 'amount'>>;
    price: Pick<StorefrontAPI.MoneyV2, 'amount'>;
    image?: StorefrontAPI.Maybe<
      Pick<StorefrontAPI.Image, 'id' | 'url' | 'altText' | 'width' | 'height'>
    >;
    product: Pick<StorefrontAPI.Product, 'handle' | 'title' | 'id'>;
    selectedOptions: Array<
      Pick<StorefrontAPI.SelectedOption, 'name' | 'value'>
    >;
  };
};

export type CartApiQueryFragment = Pick<
  StorefrontAPI.Cart,
  'id' | 'checkoutUrl' | 'totalQuantity' | 'note'
> & {
  buyerIdentity: Pick<
    StorefrontAPI.CartBuyerIdentity,
    'countryCode' | 'email' | 'phone'
  > & {
    customer?: StorefrontAPI.Maybe<
      Pick<
        StorefrontAPI.Customer,
        'id' | 'email' | 'firstName' | 'lastName' | 'displayName'
      >
    >;
  };
  lines: {
    nodes: Array<
      Pick<StorefrontAPI.CartLine, 'id' | 'quantity'> & {
        attributes: Array<Pick<StorefrontAPI.Attribute, 'key' | 'value'>>;
        cost: {
          totalAmount: Pick<StorefrontAPI.MoneyV2, 'amount'>;
          amountPerQuantity: Pick<StorefrontAPI.MoneyV2, 'amount'>;
          compareAtAmountPerQuantity?: StorefrontAPI.Maybe<
            Pick<StorefrontAPI.MoneyV2, 'amount'>
          >;
        };
        merchandise: Pick<
          StorefrontAPI.ProductVariant,
          'id' | 'availableForSale' | 'requiresShipping' | 'title'
        > & {
          compareAtPrice?: StorefrontAPI.Maybe<
            Pick<StorefrontAPI.MoneyV2, 'amount'>
          >;
          price: Pick<StorefrontAPI.MoneyV2, 'amount'>;
          image?: StorefrontAPI.Maybe<
            Pick<
              StorefrontAPI.Image,
              'id' | 'url' | 'altText' | 'width' | 'height'
            >
          >;
          product: Pick<StorefrontAPI.Product, 'handle' | 'title' | 'id'>;
          selectedOptions: Array<
            Pick<StorefrontAPI.SelectedOption, 'name' | 'value'>
          >;
        };
      }
    >;
  };
  cost: {
    subtotalAmount: Pick<StorefrontAPI.MoneyV2, 'amount'>;
    totalAmount: Pick<StorefrontAPI.MoneyV2, 'amount'>;
    totalDutyAmount?: StorefrontAPI.Maybe<
      Pick<StorefrontAPI.MoneyV2, 'amount'>
    >;
    totalTaxAmount?: StorefrontAPI.Maybe<Pick<StorefrontAPI.MoneyV2, 'amount'>>;
  };
  attributes: Array<Pick<StorefrontAPI.Attribute, 'key' | 'value'>>;
  discountCodes: Array<
    Pick<StorefrontAPI.CartDiscountCode, 'code' | 'applicable'>
  >;
};

interface GeneratedQueryTypes {
  '#graphql\n  query layout(\n    $language: LanguageCode\n    $headerMenuHandle: String!\n    $footerMenuHandle: String!\n  ) @inContext(language: $language) {\n    shop {\n      ...Shop\n    }\n    headerMenu: menu(handle: $headerMenuHandle) {\n      ...Menu\n    }\n    footerMenu: menu(handle: $footerMenuHandle) {\n      ...Menu\n    }\n  }\n  fragment Shop on Shop {\n    id\n    name\n    description\n    primaryDomain {\n      url\n    }\n    brand {\n      logo {\n        image {\n          url\n        }\n      }\n    }\n  }\n  fragment MenuItem on MenuItem {\n    id\n    resourceId\n    tags\n    title\n    type\n    url\n  }\n  fragment ChildMenuItem on MenuItem {\n    ...MenuItem\n  }\n  fragment ParentMenuItem on MenuItem {\n    ...MenuItem\n    items {\n      ...ChildMenuItem\n    }\n  }\n  fragment Menu on Menu {\n    id\n    items {\n      ...ParentMenuItem\n    }\n  }\n': {
    return: LayoutQuery;
    variables: LayoutQueryVariables;
  };
  '#graphql\n  query StoreRobots($country: CountryCode, $language: LanguageCode)\n   @inContext(country: $country, language: $language) {\n    shop {\n      id\n    }\n  }\n': {
    return: StoreRobotsQuery;
    variables: StoreRobotsQueryVariables;
  };
  '#graphql\n  query Sitemap($urlLimits: Int, $language: LanguageCode)\n  @inContext(language: $language) {\n    products(\n      first: $urlLimits\n      query: "published_status:\'online_store:visible\'"\n    ) {\n      nodes {\n        updatedAt\n        handle\n        onlineStoreUrl\n        title\n        featuredImage {\n          url\n          altText\n        }\n      }\n    }\n    collections(\n      first: $urlLimits\n      query: "published_status:\'online_store:visible\'"\n    ) {\n      nodes {\n        updatedAt\n        handle\n        onlineStoreUrl\n      }\n    }\n    pages(first: $urlLimits, query: "published_status:\'published\'") {\n      nodes {\n        updatedAt\n        handle\n        onlineStoreUrl\n      }\n    }\n  }\n': {
    return: SitemapQuery;
    variables: SitemapQueryVariables;
  };
  '#graphql\n  query Customer(\n    $customerAccessToken: String!\n    $country: CountryCode\n    $language: LanguageCode\n  ) @inContext(country: $country, language: $language) {\n    customer(customerAccessToken: $customerAccessToken) {\n      ...Customer\n    }\n  }\n  #graphql\n  fragment CustomerOrders on Customer {\n    numberOfOrders\n    orders(\n      sortKey: PROCESSED_AT,\n      reverse: true,\n      first: $first,\n      last: $last,\n      before: $startCursor,\n      after: $endCursor\n    ) {\n      nodes {\n        ...OrderItem\n      }\n      pageInfo {\n        hasPreviousPage\n        hasNextPage\n        endCursor\n        startCursor\n      }\n    }\n  }\n  #graphql\n  fragment OrderItem on Order {\n    currentTotalPrice {\n      amount\n      currencyCode\n    }\n    financialStatus\n    fulfillmentStatus\n    id\n    lineItems(first: 10) {\n      nodes {\n        title\n        variant {\n          image {\n            url\n            altText\n            height\n            width\n          }\n        }\n      }\n    }\n    orderNumber\n    customerUrl\n    statusUrl\n    processedAt\n  }\n\n\n': {
    return: CustomerQuery;
    variables: CustomerQueryVariables;
  };
  '#graphql\n  fragment OrderMoney on MoneyV2 {\n    amount\n    currencyCode\n  }\n  fragment AddressFull on MailingAddress {\n    address1\n    address2\n    city\n    company\n    country\n    countryCodeV2\n    firstName\n    formatted\n    id\n    lastName\n    name\n    phone\n    province\n    provinceCode\n    zip\n  }\n  fragment DiscountApplication on DiscountApplication {\n    value {\n      __typename\n      ... on MoneyV2 {\n        ...OrderMoney\n      }\n      ... on PricingPercentageValue {\n        percentage\n      }\n    }\n  }\n  fragment OrderLineProductVariant on ProductVariant {\n    id\n    image {\n      altText\n      height\n      url\n      id\n      width\n    }\n    price {\n      ...OrderMoney\n    }\n    product {\n      handle\n    }\n    sku\n    title\n  }\n  fragment OrderLineItemFull on OrderLineItem {\n    title\n    quantity\n    discountAllocations {\n      allocatedAmount {\n        ...OrderMoney\n      }\n      discountApplication {\n        ...DiscountApplication\n      }\n    }\n    originalTotalPrice {\n      ...OrderMoney\n    }\n    discountedTotalPrice {\n      ...OrderMoney\n    }\n    variant {\n      ...OrderLineProductVariant\n    }\n  }\n  fragment Order on Order {\n    id\n    name\n    orderNumber\n    statusUrl\n    processedAt\n    fulfillmentStatus\n    totalTaxV2 {\n      ...OrderMoney\n    }\n    totalPriceV2 {\n      ...OrderMoney\n    }\n    subtotalPriceV2 {\n      ...OrderMoney\n    }\n    shippingAddress {\n      ...AddressFull\n    }\n    discountApplications(first: 100) {\n      nodes {\n        ...DiscountApplication\n      }\n    }\n    lineItems(first: 100) {\n      nodes {\n        ...OrderLineItemFull\n      }\n    }\n  }\n  query Order(\n    $country: CountryCode\n    $language: LanguageCode\n    $orderId: ID!\n  ) @inContext(country: $country, language: $language) {\n    order: node(id: $orderId) {\n      ... on Order {\n        ...Order\n      }\n    }\n  }\n': {
    return: OrderQuery;
    variables: OrderQueryVariables;
  };
  '#graphql\n  #graphql\n  fragment CustomerOrders on Customer {\n    numberOfOrders\n    orders(\n      sortKey: PROCESSED_AT,\n      reverse: true,\n      first: $first,\n      last: $last,\n      before: $startCursor,\n      after: $endCursor\n    ) {\n      nodes {\n        ...OrderItem\n      }\n      pageInfo {\n        hasPreviousPage\n        hasNextPage\n        endCursor\n        startCursor\n      }\n    }\n  }\n  #graphql\n  fragment OrderItem on Order {\n    currentTotalPrice {\n      amount\n      currencyCode\n    }\n    financialStatus\n    fulfillmentStatus\n    id\n    lineItems(first: 10) {\n      nodes {\n        title\n        variant {\n          image {\n            url\n            altText\n            height\n            width\n          }\n        }\n      }\n    }\n    orderNumber\n    customerUrl\n    statusUrl\n    processedAt\n  }\n\n\n  query CustomerOrders(\n    $country: CountryCode\n    $customerAccessToken: String!\n    $endCursor: String\n    $first: Int\n    $language: LanguageCode\n    $last: Int\n    $startCursor: String\n  ) @inContext(country: $country, language: $language) {\n    customer(customerAccessToken: $customerAccessToken) {\n      ...CustomerOrders\n    }\n  }\n': {
    return: CustomerOrdersQuery;
    variables: CustomerOrdersQueryVariables;
  };
  '#graphql\n  query Article(\n    $articleHandle: String!\n    $blogHandle: String!\n    $country: CountryCode\n    $language: LanguageCode\n  ) @inContext(language: $language, country: $country) {\n    blog(handle: $blogHandle) {\n      articleByHandle(handle: $articleHandle) {\n        title\n        contentHtml\n        publishedAt\n        author: authorV2 {\n          name\n        }\n        image {\n          id\n          altText\n          url\n          width\n          height\n        }\n        seo {\n          description\n          title\n        }\n      }\n    }\n  }\n': {
    return: ArticleQuery;
    variables: ArticleQueryVariables;
  };
  '#graphql\n  query CollectionDetails(\n    $handle: String!\n    $language: LanguageCode\n    $filters: [ProductFilter!]\n    $sortKey: ProductCollectionSortKeys!\n    $reverse: Boolean\n    $first: Int\n    $last: Int\n    $startCursor: String\n    $endCursor: String\n  ) @inContext(language: $language) {\n    collection(handle: $handle) {\n      id\n      handle\n      title\n      description\n      seo {\n        description\n        title\n      }\n      image {\n        id\n        url\n        width\n        height\n        altText\n      }\n      products(\n        first: $first,\n        last: $last,\n        before: $startCursor,\n        after: $endCursor,\n        filters: $filters,\n        sortKey: $sortKey,\n        reverse: $reverse\n      ) {\n        filters {\n          id\n          label\n          type\n          values {\n            id\n            label\n            count\n            input\n          }\n        }\n        nodes {\n          ...ProductCard\n        }\n        pageInfo {\n          hasPreviousPage\n          hasNextPage\n          startCursor\n          endCursor\n        }\n      }\n    }\n    collections(first: 100) {\n      edges {\n        node {\n          title\n          handle\n        }\n      }\n    }\n  }\n  #graphql\n  fragment ProductCard on Product {\n    id\n    title\n    publishedAt\n    handle\n    vendor\n    description \n    media(first: 10) {\n      nodes {\n        ...Media\n      }\n    }\n    options {\n      name\n      values\n    }\n   \n    variants(first: 250) {\n      nodes {\n        id\n        availableForSale\n        selectedOptions {\n          name\n          value\n        }\n        image {\n          id\n          url\n          altText\n          width\n          height\n        }\n        price {\n          amount\n          currencyCode\n        }\n        compareAtPrice {\n          amount\n          currencyCode\n        }\n        sku\n        title\n        unitPrice {\n          amount\n          currencyCode\n        }\n        product {\n          title\n          handle\n        }\n        \n      }\n    }\n  }\n  #graphql\n  fragment Media on Media {\n    __typename\n    mediaContentType\n    alt\n    previewImage {\n      url\n    }\n    ... on MediaImage {\n      id\n      image {\n        id\n        url\n        width\n        height\n      }\n    }\n    ... on Video {\n      id\n      sources {\n        mimeType\n        url\n      }\n    }\n    ... on Model3d {\n      id\n      sources {\n        mimeType\n        url\n      }\n    }\n    ... on ExternalVideo {\n      id\n      embedUrl\n      host\n    }\n  }\n\n\n': {
    return: CollectionDetailsQuery;
    variables: CollectionDetailsQueryVariables;
  };
  '#graphql\n  fragment Collection on Collection {\n    id\n    title\n    handle\n    image {\n      id\n      url\n      altText\n      width\n      height\n    }\n  }\n  query StoreCollections(\n    $country: CountryCode\n    $endCursor: String\n    $first: Int\n    $language: LanguageCode\n    $last: Int\n    $startCursor: String\n  ) @inContext(country: $country, language: $language) {\n    collections(\n      first: $first,\n      last: $last,\n      before: $startCursor,\n      after: $endCursor\n    ) {\n      nodes {\n        ...Collection\n      }\n      pageInfo {\n        hasNextPage\n        hasPreviousPage\n        startCursor\n        endCursor\n      }\n    }\n  }\n': {
    return: StoreCollectionsQuery;
    variables: StoreCollectionsQueryVariables;
  };
  '#graphql\n  query FeaturedItems(\n    $pageBy: Int = 12\n  )  {\n    featuredCollections: collections(first: 3, sortKey: UPDATED_AT) {\n      nodes {\n        ...FeaturedCollectionDetails\n      }\n    }\n    featuredProducts: products(first: $pageBy) {\n      nodes {\n        ...ProductCard\n      }\n    }\n  }\n\n  #graphql\n  fragment ProductCard on Product {\n    id\n    title\n    publishedAt\n    handle\n    vendor\n    description \n    media(first: 10) {\n      nodes {\n        ...Media\n      }\n    }\n    options {\n      name\n      values\n    }\n   \n    variants(first: 250) {\n      nodes {\n        id\n        availableForSale\n        selectedOptions {\n          name\n          value\n        }\n        image {\n          id\n          url\n          altText\n          width\n          height\n        }\n        price {\n          amount\n          currencyCode\n        }\n        compareAtPrice {\n          amount\n          currencyCode\n        }\n        sku\n        title\n        unitPrice {\n          amount\n          currencyCode\n        }\n        product {\n          title\n          handle\n        }\n        \n      }\n    }\n  }\n  #graphql\n  fragment Media on Media {\n    __typename\n    mediaContentType\n    alt\n    previewImage {\n      url\n    }\n    ... on MediaImage {\n      id\n      image {\n        id\n        url\n        width\n        height\n      }\n    }\n    ... on Video {\n      id\n      sources {\n        mimeType\n        url\n      }\n    }\n    ... on Model3d {\n      id\n      sources {\n        mimeType\n        url\n      }\n    }\n    ... on ExternalVideo {\n      id\n      embedUrl\n      host\n    }\n  }\n\n\n  #graphql\n  fragment FeaturedCollectionDetails on Collection {\n    id\n    title\n    handle\n    image {\n      altText\n      width\n      height\n      url\n    }\n  }\n\n': {
    return: FeaturedItemsQuery;
    variables: FeaturedItemsQueryVariables;
  };
  '#graphql\n  query Blog(\n    $language: LanguageCode\n    $blogHandle: String!\n    $first: Int\n    $last: Int\n    $startCursor: String\n    $endCursor: String\n  ) @inContext(language: $language) {\n    blog(handle: $blogHandle) {\n      title\n      seo {\n        title\n        description\n      }\n      articles(\n        first: $first,\n        last: $last,\n        before: $startCursor,\n        after: $endCursor\n      ) {\n        nodes {\n          ...ArticleItem\n        }\n        pageInfo {\n          hasPreviousPage\n          hasNextPage\n          hasNextPage\n          endCursor\n          startCursor\n        }\n\n      }\n    }\n  }\n  fragment ArticleItem on Article {\n    author: authorV2 {\n      name\n    }\n    contentHtml\n    handle\n    id\n    image {\n      id\n      altText\n      url\n      width\n      height\n    }\n    publishedAt\n    title\n    blog {\n      handle\n    }\n  }\n': {
    return: BlogQuery;
    variables: BlogQueryVariables;
  };
  '#graphql\n  query PageDetails($language: LanguageCode, $handle: String!)\n  @inContext(language: $language) {\n    page(handle: $handle) {\n      id\n      title\n      body\n      seo {\n        description\n        title\n      }\n    }\n  }\n': {
    return: PageDetailsQuery;
    variables: PageDetailsQueryVariables;
  };
  '#graphql\n  fragment Policy on ShopPolicy {\n    body\n    handle\n    id\n    title\n    url\n  }\n  query Policy(\n    $country: CountryCode\n    $language: LanguageCode\n    $privacyPolicy: Boolean!\n    $refundPolicy: Boolean!\n    $shippingPolicy: Boolean!\n    $termsOfService: Boolean!\n  ) @inContext(language: $language, country: $country) {\n    shop {\n      privacyPolicy @include(if: $privacyPolicy) {\n        ...Policy\n      }\n      shippingPolicy @include(if: $shippingPolicy) {\n        ...Policy\n      }\n      termsOfService @include(if: $termsOfService) {\n        ...Policy\n      }\n      refundPolicy @include(if: $refundPolicy) {\n        ...Policy\n      }\n    }\n  }\n': {
    return: PolicyQuery;
    variables: PolicyQueryVariables;
  };
  '#graphql\n  fragment PolicyItem on ShopPolicy {\n    id\n    title\n    handle\n  }\n  query Policies ($country: CountryCode, $language: LanguageCode)\n    @inContext(country: $country, language: $language) {\n    shop {\n      privacyPolicy {\n        ...PolicyItem\n      }\n      shippingPolicy {\n        ...PolicyItem\n      }\n      termsOfService {\n        ...PolicyItem\n      }\n      refundPolicy {\n        ...PolicyItem\n      }\n      subscriptionPolicy {\n        id\n        title\n        handle\n      }\n    }\n  }\n': {
    return: PoliciesQuery;
    variables: PoliciesQueryVariables;
  };
  '#graphql\n  query AllProducts(\n    $language: LanguageCode\n    $first: Int\n    $last: Int\n    $startCursor: String\n    $endCursor: String\n  ) @inContext(language: $language) {\n    products(first: $first, last: $last, before: $startCursor, after: $endCursor) {\n      filters {\n        id\n        label\n        type\n        values {\n          id\n          label\n          count\n          input\n        }\n      }\n      nodes {\n        ...ProductCard\n      }\n      pageInfo {\n        hasPreviousPage\n        hasNextPage\n        startCursor\n        endCursor\n      }\n    }\n  }\n  #graphql\n  fragment ProductCard on Product {\n    id\n    title\n    publishedAt\n    handle\n    vendor\n    description \n    media(first: 10) {\n      nodes {\n        ...Media\n      }\n    }\n    options {\n      name\n      values\n    }\n   \n    variants(first: 250) {\n      nodes {\n        id\n        availableForSale\n        selectedOptions {\n          name\n          value\n        }\n        image {\n          id\n          url\n          altText\n          width\n          height\n        }\n        price {\n          amount\n          currencyCode\n        }\n        compareAtPrice {\n          amount\n          currencyCode\n        }\n        sku\n        title\n        unitPrice {\n          amount\n          currencyCode\n        }\n        product {\n          title\n          handle\n        }\n        \n      }\n    }\n  }\n  #graphql\n  fragment Media on Media {\n    __typename\n    mediaContentType\n    alt\n    previewImage {\n      url\n    }\n    ... on MediaImage {\n      id\n      image {\n        id\n        url\n        width\n        height\n      }\n    }\n    ... on Video {\n      id\n      sources {\n        mimeType\n        url\n      }\n    }\n    ... on Model3d {\n      id\n      sources {\n        mimeType\n        url\n      }\n    }\n    ... on ExternalVideo {\n      id\n      embedUrl\n      host\n    }\n  }\n\n\n': {
    return: AllProductsQuery;
    variables: AllProductsQueryVariables;
  };
  '#graphql\nquery PaginatedProductsSearch(\n  $country: CountryCode\n  $endCursor: String\n  $first: Int\n  $language: LanguageCode\n  $last: Int\n  $searchTerm: String\n  $startCursor: String\n) @inContext(country: $country, language: $language) {\n  products(\n    first: $first,\n    last: $last,\n    before: $startCursor,\n    after: $endCursor,\n    sortKey: RELEVANCE,\n    query: $searchTerm\n  ) {\n    nodes {\n      ...ProductCard\n    }\n    pageInfo {\n      startCursor\n      endCursor\n      hasNextPage\n      hasPreviousPage\n    }\n  }\n}\n\n  #graphql\n  fragment ProductCard on Product {\n    id\n    title\n    publishedAt\n    handle\n    vendor\n    description \n    media(first: 10) {\n      nodes {\n        ...Media\n      }\n    }\n    options {\n      name\n      values\n    }\n   \n    variants(first: 250) {\n      nodes {\n        id\n        availableForSale\n        selectedOptions {\n          name\n          value\n        }\n        image {\n          id\n          url\n          altText\n          width\n          height\n        }\n        price {\n          amount\n          currencyCode\n        }\n        compareAtPrice {\n          amount\n          currencyCode\n        }\n        sku\n        title\n        unitPrice {\n          amount\n          currencyCode\n        }\n        product {\n          title\n          handle\n        }\n        \n      }\n    }\n  }\n  #graphql\n  fragment Media on Media {\n    __typename\n    mediaContentType\n    alt\n    previewImage {\n      url\n    }\n    ... on MediaImage {\n      id\n      image {\n        id\n        url\n        width\n        height\n      }\n    }\n    ... on Video {\n      id\n      sources {\n        mimeType\n        url\n      }\n    }\n    ... on Model3d {\n      id\n      sources {\n        mimeType\n        url\n      }\n    }\n    ... on ExternalVideo {\n      id\n      embedUrl\n      host\n    }\n  }\n\n\n': {
    return: PaginatedProductsSearchQuery;
    variables: PaginatedProductsSearchQueryVariables;
  };
}

interface GeneratedMutationTypes {
  '#graphql\n  mutation customerAddressUpdate(\n    $address: MailingAddressInput!\n    $customerAccessToken: String!\n    $id: ID!\n    $country: CountryCode\n    $language: LanguageCode\n ) @inContext(country: $country, language: $language) {\n    customerAddressUpdate(\n      address: $address\n      customerAccessToken: $customerAccessToken\n      id: $id\n    ) {\n      customerAddress {\n        id\n      }\n      customerUserErrors {\n        code\n        field\n        message\n      }\n    }\n  }\n': {
    return: CustomerAddressUpdateMutation;
    variables: CustomerAddressUpdateMutationVariables;
  };
  '#graphql\n  mutation customerAddressDelete(\n    $customerAccessToken: String!,\n    $id: ID!,\n    $country: CountryCode,\n    $language: LanguageCode\n  ) @inContext(country: $country, language: $language) {\n    customerAddressDelete(customerAccessToken: $customerAccessToken, id: $id) {\n      customerUserErrors {\n        code\n        field\n        message\n      }\n      deletedCustomerAddressId\n    }\n  }\n': {
    return: CustomerAddressDeleteMutation;
    variables: CustomerAddressDeleteMutationVariables;
  };
  '#graphql\n  mutation customerDefaultAddressUpdate(\n    $addressId: ID!\n    $customerAccessToken: String!\n    $country: CountryCode\n    $language: LanguageCode\n  ) @inContext(country: $country, language: $language) {\n    customerDefaultAddressUpdate(\n      addressId: $addressId\n      customerAccessToken: $customerAccessToken\n    ) {\n      customer {\n        defaultAddress {\n          id\n        }\n      }\n      customerUserErrors {\n        code\n        field\n        message\n      }\n    }\n  }\n': {
    return: CustomerDefaultAddressUpdateMutation;
    variables: CustomerDefaultAddressUpdateMutationVariables;
  };
  '#graphql\n  mutation customerAddressCreate(\n    $address: MailingAddressInput!\n    $customerAccessToken: String!\n    $country: CountryCode\n    $language: LanguageCode\n  ) @inContext(country: $country, language: $language) {\n    customerAddressCreate(\n      address: $address\n      customerAccessToken: $customerAccessToken\n    ) {\n      customerAddress {\n        id\n      }\n      customerUserErrors {\n        code\n        field\n        message\n      }\n    }\n  }\n': {
    return: CustomerAddressCreateMutation;
    variables: CustomerAddressCreateMutationVariables;
  };
  '#graphql\n  # https://shopify.dev/docs/api/storefront/latest/mutations/customerUpdate\n  mutation customerUpdate(\n    $customerAccessToken: String!,\n    $customer: CustomerUpdateInput!\n    $country: CountryCode\n    $language: LanguageCode\n  ) @inContext(language: $language, country: $country) {\n    customerUpdate(customerAccessToken: $customerAccessToken, customer: $customer) {\n      customer {\n        acceptsMarketing\n        email\n        firstName\n        id\n        lastName\n        phone\n      }\n      customerAccessToken {\n        accessToken\n        expiresAt\n      }\n      customerUserErrors {\n        code\n        field\n        message\n      }\n    }\n  }\n': {
    return: CustomerUpdateMutation;
    variables: CustomerUpdateMutationVariables;
  };
  '#graphql\n  mutation customerActivate(\n    $id: ID!,\n    $input: CustomerActivateInput!,\n    $country: CountryCode,\n    $language: LanguageCode\n  ) @inContext(country: $country, language: $language) {\n    customerActivate(id: $id, input: $input) {\n      customerAccessToken {\n        accessToken\n        expiresAt\n      }\n      customerUserErrors {\n        code\n        field\n        message\n      }\n    }\n  }\n': {
    return: CustomerActivateMutation;
    variables: CustomerActivateMutationVariables;
  };
  '#graphql\n  mutation login($input: CustomerAccessTokenCreateInput!) {\n    customerAccessTokenCreate(input: $input) {\n      customerUserErrors {\n        code\n        field\n        message\n      }\n      customerAccessToken {\n        accessToken\n        expiresAt\n      }\n    }\n  }\n': {
    return: LoginMutation;
    variables: LoginMutationVariables;
  };
  '#graphql\n  mutation customerRecover(\n    $email: String!,\n    $country: CountryCode,\n    $language: LanguageCode\n  ) @inContext(country: $country, language: $language) {\n    customerRecover(email: $email) {\n      customerUserErrors {\n        code\n        field\n        message\n      }\n    }\n  }\n': {
    return: CustomerRecoverMutation;
    variables: CustomerRecoverMutationVariables;
  };
  '#graphql\n  mutation customerCreate(\n    $input: CustomerCreateInput!,\n    $country: CountryCode,\n    $language: LanguageCode\n  ) @inContext(country: $country, language: $language) {\n    customerCreate(input: $input) {\n      customer {\n        id\n      }\n      customerUserErrors {\n        code\n        field\n        message\n      }\n    }\n  }\n': {
    return: CustomerCreateMutation;
    variables: CustomerCreateMutationVariables;
  };
  '#graphql\n  mutation registerLogin(\n    $input: CustomerAccessTokenCreateInput!,\n    $country: CountryCode,\n    $language: LanguageCode\n  ) @inContext(country: $country, language: $language) {\n    customerAccessTokenCreate(input: $input) {\n      customerUserErrors {\n        code\n        field\n        message\n      }\n      customerAccessToken {\n        accessToken\n        expiresAt\n      }\n    }\n  }\n': {
    return: RegisterLoginMutation;
    variables: RegisterLoginMutationVariables;
  };
  '#graphql\n  mutation customerReset(\n    $id: ID!,\n    $input: CustomerResetInput!\n    $country: CountryCode\n    $language: LanguageCode\n  ) @inContext(country: $country, language: $language) {\n    customerReset(id: $id, input: $input) {\n      customerAccessToken {\n        accessToken\n        expiresAt\n      }\n      customerUserErrors {\n        code\n        field\n        message\n      }\n    }\n  }\n': {
    return: CustomerResetMutation;
    variables: CustomerResetMutationVariables;
  };
}

declare module '@shopify/hydrogen' {
  interface StorefrontQueries extends GeneratedQueryTypes {}
  interface StorefrontMutations extends GeneratedMutationTypes {}
}
