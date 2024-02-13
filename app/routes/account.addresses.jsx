import {json} from '@shopify/remix-oxygen';
import {
  Form,
  useActionData,
  useNavigation,
  useOutletContext,
} from '@remix-run/react';
import {useState} from 'react';
import Cross from '../image/cross.svg'

export const meta = () => {
  return [{title: 'Addresses'}];
};

export async function loader({context}) {
  await context.customerAccount?.handleAuthStatus();

  return json(
    {},
    {
      headers: {
        'Set-Cookie': await context.session.commit(),
      },
    },
  );
}

export async function action({request, context}) {
  const {storefront, session} = context;

  try {
    const form = await request.formData();

    const addressId = form.has('addressId')
      ? String(form.get('addressId'))
      : null;
    if (!addressId) {
      throw new Error('You must provide an address id.');
    }

    const customerAccessToken = await session.get('customerAccessToken');
    if (!customerAccessToken) {
      return json({error: {[addressId]: 'Unauthorized'}}, {status: 401});
    }
    const {accessToken} = customerAccessToken;

    const defaultAddress = form.has('defaultAddress')
      ? String(form.get('defaultAddress')) === 'on'
      : null;
    const address = {};
    const keys = [
      'address1',
      'address2',
      'city',
      'company',
      'country',
      'firstName',
      'lastName',
      'phone',
      'province',
      'zip',
    ];

    for (const key of keys) {
      const value = form.get(key);
      if (typeof value === 'string') {
        address[key] = value;
      }
    }

    switch (request.method) {
      case 'POST': {
        // handle new address creation
        try {
          const {customerAddressCreate} = await storefront.mutate(
            CREATE_ADDRESS_MUTATION,
            {
              variables: {customerAccessToken: accessToken, address},
            },
          );

          if (customerAddressCreate?.customerUserErrors?.length) {
            const error = customerAddressCreate.customerUserErrors[0];
            throw new Error(error.message);
          }

          const createdAddress = customerAddressCreate?.customerAddress;
          if (!createdAddress?.id) {
            throw new Error(
              'Expected customer address to be created, but the id is missing',
            );
          }

          if (defaultAddress) {
            const createdAddressId = decodeURIComponent(createdAddress.id);
            const {customerDefaultAddressUpdate} = await storefront.mutate(
              UPDATE_DEFAULT_ADDRESS_MUTATION,
              {
                variables: {
                  customerAccessToken: accessToken,
                  addressId: createdAddressId,
                },
              },
            );

            if (customerDefaultAddressUpdate?.customerUserErrors?.length) {
              const error = customerDefaultAddressUpdate.customerUserErrors[0];
              throw new Error(error.message);
            }
          }

          return json({error: null, createdAddress, defaultAddress});
        } catch (error) {
          if (error instanceof Error) {
            return json({error: {[addressId]: error.message}}, {status: 400});
          }
          return json({error: {[addressId]: error}}, {status: 400});
        }
      }

      case 'PUT': {
        // handle address updates
        try {
          const {customerAddressUpdate} = await storefront.mutate(
            UPDATE_ADDRESS_MUTATION,
            {
              variables: {
                address,
                customerAccessToken: accessToken,
                id: decodeURIComponent(addressId),
              },
            },
          );

          const updatedAddress = customerAddressUpdate?.customerAddress;

          if (customerAddressUpdate?.customerUserErrors?.length) {
            const error = customerAddressUpdate.customerUserErrors[0];
            throw new Error(error.message);
          }

          if (defaultAddress) {
            const {customerDefaultAddressUpdate} = await storefront.mutate(
              UPDATE_DEFAULT_ADDRESS_MUTATION,
              {
                variables: {
                  customerAccessToken: accessToken,
                  addressId: decodeURIComponent(addressId),
                },
              },
            );

            if (customerDefaultAddressUpdate?.customerUserErrors?.length) {
              const error = customerDefaultAddressUpdate.customerUserErrors[0];
              throw new Error(error.message);
            }
          }

          return json({error: null, updatedAddress});
        } catch (error) {
          if (error instanceof Error) {
            return json({error: {[addressId]: error.message}}, {status: 400});
          }
          return json({error: {[addressId]: error}}, {status: 400});
        }
      }

      case 'DELETE': {
        // handles address deletion
        try {
          const {customerAddressDelete} = await storefront.mutate(
            DELETE_ADDRESS_MUTATION,
            {
              variables: {customerAccessToken: accessToken, id: addressId},
            },
          );

          if (customerAddressDelete?.customerUserErrors?.length) {
            const error = customerAddressDelete.customerUserErrors[0];
            throw new Error(error.message);
          }
          return json({error: null, deletedAddress: addressId});
        } catch (error) {
          if (error instanceof Error) {
            return json({error: {[addressId]: error.message}}, {status: 400});
          }
          return json({error: {[addressId]: error}}, {status: 400});
        }
      }

      default: {
        return json(
          {error: {[addressId]: 'Method not allowed'}},
          {status: 405},
        );
      }
    }
  } catch (error) {
    if (error instanceof Error) {
      return json({error: error.message}, {status: 400});
    }
    return json({error}, {status: 400});
  }
}

export default function Addresses() {
  const {customer} = useOutletContext();
  const {defaultAddress, addresses} = customer;

  return (
    <div className="account-addresses">
      <div className="section_title">
        <h2>Addresses</h2>
      </div>
      <br />
      {!addresses.nodes.length ? (
        <p>You have no addresses saved.</p>
      ) : (
        <div className="address_accounnt_order">
          <div className="address_account_wrap create_account">
            <legend>Create address</legend>
            <NewAddressForm />
          </div>
          <br />
          <br />
          <div className="address_account_wrap">
            <legend>Existing addresses</legend>
            <ExistingAddresses
              addresses={addresses}
              defaultAddress={defaultAddress}
            />
          </div>
        </div>
      )}
    </div>
  );
}

function NewAddressForm() {
  const newAddress = {
    address1: '',
    address2: '',
    city: '',
    company: '',
    country: '',
    firstName: '',
    id: 'new',
    lastName: '',
    phone: '',
    province: '',
    zip: '',
  };

  return (
    <AddressForm
      addressId={'NEW_ADDRESS_ID'}
      address={newAddress}
      defaultAddress={null}
      isOpen={true}
    >
      {({stateForMethod}) => (
        <div>
          <button
            disabled={stateForMethod('POST') !== 'idle'}
            formMethod="POST"
            type="submit"
            className="btn"
          >
            {stateForMethod('POST') !== 'idle' ? 'Creating' : 'Create'}
          </button>
        </div>
      )}
    </AddressForm>
  );
}

function ExistingAddresses({addresses, defaultAddress}) {
  const [editAddressId, setEditAddressId] = useState(null);

  const handleEditClick = (addressId) => {
    setEditAddressId(addressId);
  };

  return (
    <div className="address_book_wrap address-details">
      {addresses.nodes.map((address) => {
        const isDefaultAddress = defaultAddress?.id === address.id;
        return (
          <>
            <div className="address-book">
              <h5>
                {(address.firstName || address.lastName) && (
                  <span>
                    {'' +
                      (address.firstName && address.firstName + ' ') +
                      address?.lastName}
                  </span>
                )}
                {isDefaultAddress && <span>(Default)</span>}
              </h5>
              <div className="divider"></div>
              <p>
                {address.company}
                <br /> {address.address1}, {address.address2}
                <br /> {address.city}
                <br /> {address.province}
                <br /> {address.zip}
                <br /> {address.country}
                <br /> {address.phone}
              </p>
              <button
                className="btn"
                onClick={() => {
                  handleEditClick(address.id);
                }}
              >
                Edit
              </button>
            </div>
            {editAddressId === address.id && (
              <AddressForm
                key={address.id}
                addressId={address.id}
                address={address}
                defaultAddress={defaultAddress}
                isOpen={false}
              >
                {({stateForMethod}) => (
                  <div className='address_save_dlt_btn'>
                    <button
                      disabled={stateForMethod('PUT') !== 'idle'}
                      formMethod="PUT"
                      type="submit"
                      className="btn"
                    >
                      {stateForMethod('PUT') !== 'idle' ? 'Saving' : 'Save'}
                    </button>
                    <button
                      disabled={stateForMethod('DELETE') !== 'idle'}
                      formMethod="DELETE"
                      type="submit"
                      className="btn"
                    >
                      {stateForMethod('DELETE') !== 'idle'
                        ? 'Deleting'
                        : 'Delete'}
                    </button>
                  </div>
                )}
              </AddressForm>
            )}
          </>
        );
      })}
    </div>
  );
}

export function AddressForm({addressId, address, defaultAddress, children}) {
  const {state, formMethod} = useNavigation();
  const action = useActionData();
  const error = action?.error?.[addressId];
  const isDefaultAddress = defaultAddress?.id === addressId;
  return (
    <div className="address_edit_form">
    <Form id={addressId}>
    <button class="close_cart">
          <img src={Cross} alt="" />
        </button>
      <fieldset>
        <input type="hidden" name="addressId" defaultValue={addressId} />
        <div>
        <label htmlFor="firstName">First name*</label>
        <input
          aria-label="First name"
          autoComplete="given-name"
          defaultValue={address?.firstName ?? ''}
          id="firstName"
          name="firstName"
          placeholder="First name"
          required
          type="text"
        /></div> <div>
        <label htmlFor="lastName">Last name*</label>
        <input
          aria-label="Last name"
          autoComplete="family-name"
          defaultValue={address?.lastName ?? ''}
          id="lastName"
          name="lastName"
          placeholder="Last name"
          required
          type="text"
        /></div> <div>
        <label htmlFor="company">Company</label>
        <input
          aria-label="Company"
          autoComplete="organization"
          defaultValue={address?.company ?? ''}
          id="company"
          name="company"
          placeholder="Company"
          type="text"
        /></div> <div>
        <label htmlFor="address1">Address line*</label>
        <input
          aria-label="Address line 1"
          autoComplete="address-line1"
          defaultValue={address?.address1 ?? ''}
          id="address1"
          name="address1"
          placeholder="Address line 1*"
          required
          type="text"
        /></div> <div>
        <label htmlFor="address2">Address line 2</label>
        <input
          aria-label="Address line 2"
          autoComplete="address-line2"
          defaultValue={address?.address2 ?? ''}
          id="address2"
          name="address2"
          placeholder="Address line 2"
          type="text"
        /></div> <div>
        <label htmlFor="city">City*</label>
        <input
          aria-label="City"
          autoComplete="address-level2"
          defaultValue={address?.city ?? ''}
          id="city"
          name="city"
          placeholder="City"
          required
          type="text"
        /></div> <div>
        <label htmlFor="zoneCode">State / Province*</label>
        <input
          aria-label="State/Province"
          autoComplete="address-level1"
          defaultValue={address?.province ?? ''}
          id="province"
          name="province"
          placeholder="State / Province"
          required
          type="text"
        /></div> <div>
        <label htmlFor="zip">Zip / Postal Code*</label>
        <input
          aria-label="Zip"
          autoComplete="postal-code"
          defaultValue={address?.zip ?? ''}
          id="zip"
          name="zip"
          placeholder="Zip / Postal Code"
          required
          type="text"
        /></div> <div>
        <label htmlFor="territoryCode">Country Code*</label>
        <input
          aria-label="territoryCode"
          autoComplete="country"
          defaultValue={address?.country ?? ''}
          id="country"
          name="country"
          placeholder="Country"
          required
          type="text"
          maxLength={2}
        /></div> <div>
        <label htmlFor="phoneNumber">Phone</label>
        <input
          aria-label="Phone Number"
          autoComplete="tel"
          defaultValue={address?.phone ?? ''}
          id="phone"
          name="phone"
          placeholder="+16135551111"
          pattern="^\+?[1-9]\d{3,14}$"
          type="tel"
        /></div>
        <div className="set-default">
          <input
            defaultChecked={isDefaultAddress}
            id="defaultAddress"
            name="defaultAddress"
            type="checkbox"
          />
          <label htmlFor="defaultAddress">Set as default address</label>
        </div>
        {error ? (
          <p className="text-red-500">
            <small>{error}</small>
          </p>
        ) : (
          <br />
        )}
        {children({
          stateForMethod: (method) => (formMethod === method ? state : 'idle'),
        })}
      </fieldset>
    </Form></div>
  );
}

// i have set this type NewAddressForm( this type form olready open and ExistingAddresses this tyme i hve click edit button after open how to set this type

const UPDATE_ADDRESS_MUTATION = `#graphql
  mutation customerAddressUpdate(
    $address: MailingAddressInput!
    $customerAccessToken: String!
    $id: ID!
  ) {
    customerAddressUpdate(
      address: $address
      customerAccessToken: $customerAccessToken
      id: $id
    ) {
      customerUserErrors {
        code
        field
        message
      }
    }
  }
`;

const DELETE_ADDRESS_MUTATION = `#graphql
  mutation customerAddressDelete($customerAccessToken: String!, $id: ID!) {
    customerAddressDelete(customerAccessToken: $customerAccessToken, id: $id) {
      customerUserErrors {
        code
        field
        message
      }
      deletedCustomerAddressId
    }
  }
`;

const UPDATE_DEFAULT_ADDRESS_MUTATION = `#graphql
  mutation customerDefaultAddressUpdate(
    $addressId: ID!
    $customerAccessToken: String!
  ) {
    customerDefaultAddressUpdate(
      addressId: $addressId
      customerAccessToken: $customerAccessToken
    ) {
      customerUserErrors {
        code
        field
        message
      }
    }
  }
`;

const CREATE_ADDRESS_MUTATION = `#graphql
  mutation customerAddressCreate(
    $address: MailingAddressInput!
    $customerAccessToken: String!
  ) {
    customerAddressCreate(
      address: $address
      customerAccessToken: $customerAccessToken
    ) {
      customerAddress {
        id
      }
      customerUserErrors {
        code
        field
        message
      }
    }
  }
`;
