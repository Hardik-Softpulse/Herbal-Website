import {json, redirect} from '@shopify/remix-oxygen';
import {Form, Link, useActionData} from '@remix-run/react';
import {getInputStyleClasses} from '~/lib/utils';
import {useState} from 'react';

export async function loader({context}) {
  const customerAccessToken = await context.session.get('customerAccessToken');
  if (customerAccessToken) {
    return redirect('/account');
  }

  return json({});
}

export async function action({request, context}) {
  if (request.method !== 'POST') {
    return json({error: 'Method not allowed'}, {status: 405});
  }

  const {storefront, session} = context;
  const form = await request.formData();
  const firstName = String(form.has('firstName') ? form.get('firstName') : '');
  const lastName = String(form.has('lastName') ? form.get('lastName') : '');
  const email = String(form.has('email') ? form.get('email') : '');
  const password = form.has('password') ? String(form.get('password')) : null;
  const passwordConfirm = form.has('passwordConfirm')
    ? String(form.get('passwordConfirm'))
    : null;

  const validPasswords =
    password && passwordConfirm && password === passwordConfirm;

  const validInputs = Boolean(email && password);
  try {
    if (!validPasswords) {
      throw new Error('Passwords do not match');
    }

    if (!validInputs) {
      throw new Error('Please provide both an email and a password.');
    }

    const {customerCreate} = await storefront.mutate(CUSTOMER_CREATE_MUTATION, {
      variables: {
        input: {email, password, firstName, lastName},
      },
    });

    if (customerCreate?.customerUserErrors?.length) {
      throw new Error(customerCreate?.customerUserErrors[0].message);
    }

    const newCustomer = customerCreate?.customer;
    if (!newCustomer?.id) {
      throw new Error('Could not create customer');
    }

    // get an access token for the new customer
    const {customerAccessTokenCreate} = await storefront.mutate(
      REGISTER_LOGIN_MUTATION,
      {
        variables: {
          input: {
            email,
            password,
            firstName,
            lastName,
          },
        },
      },
    );

    if (!customerAccessTokenCreate?.customerAccessToken?.accessToken) {
      throw new Error('Missing access token');
    }
    session.set(
      'customerAccessToken',
      customerAccessTokenCreate?.customerAccessToken,
    );

    return json(
      {error: null, newCustomer},
      {
        status: 302,
        headers: {
          'Set-Cookie': await session.commit(),
          Location: '/account',
        },
      },
    );
  } catch (error) {
    if (error instanceof Error) {
      return json({error: error.message}, {status: 400});
    }
    return json({error}, {status: 400});
  }
}

export default function Register() {
  const data = useActionData();
  console.log('data', data);
  const error = data?.error || null;
  const [nativeEmailError, setNativeEmailError] = useState(null);
  const [nativePasswordError, setNativePasswordError] = useState(null);

  return (
    <main class="abt_sec">
      <section>
        <div className="container">
          <div className="spacer">
            <div className="section_title">
              <h2>Sign Up & Get 10% off</h2>
            </div>
            <div className="register_frm">
              <div className="right_contact_form">
                <Form method="post" noValidate>
                  {error && (
                    <div className="flex items-center justify-center mb-6 bg-zinc-500">
                      <p className="m-4 text-s text-contrast text-red-500">
                        {error}
                      </p>
                    </div>
                  )}
                  <div className="contact_name flex">
                    <div className="first_name">
                      <label for="">First Name</label>
                      <br />
                      <input
                        id="firstName"
                        name="firstName"
                        type="text"
                        autoComplete="email"
                        placeholder="Enter your First name"
                        required
                        className={` ${getInputStyleClasses(nativeEmailError)}`}
                      />
                      {nativeEmailError && (
                        <p className="text-red-500">
                          {nativeEmailError} &nbsp;
                        </p>
                      )}
                    </div>
                    <div className="last_name">
                      <label for="">Last Name</label>
                      <br />
                      <input
                        type="text"
                        input
                        id="lastName"
                        name="lastName"
                        placeholder="Enter your last name"
                        required
                        className={`${getInputStyleClasses(nativeEmailError)}`}
                      />
                      {nativeEmailError && (
                        <p className="text-red-500">
                          {nativeEmailError} &nbsp;
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="contact_email">
                    <label for="">E-mail Address </label>
                    <br />
                    <input
                      type="email"
                      name="email"
                      placeholder="Enter your email address..."
                      className={`${getInputStyleClasses(nativeEmailError)}`}
                      autoComplete="email"
                      required
                      autoFocus
                      onBlur={(event) => {
                        setNativeEmailError(
                          event.currentTarget.value.length &&
                            !event.currentTarget.validity.valid
                            ? 'Invalid email address'
                            : null,
                        );
                      }}
                    />
                    {nativeEmailError && (
                      <p className="text-red-500">{nativeEmailError} &nbsp;</p>
                    )}
                  </div>
                  <div className="contact_email">
                    <label for="">Mobile Number </label>
                    <br />
                    <input
                      id="phoneno"
                      name="phoneno"
                      type="tel"
                      required
                      placeholder="Enter your phoneno."
                    />
                  </div>
                  <div className="contact_email">
                    <label for="">Password </label>
                    <br />
                    <input
                      type="password"
                      name="password"
                      placeholder="Enter your password"
                      className={`${getInputStyleClasses(nativePasswordError)}`}
                      minLength={8}
                      required
                      autoFocus
                      onBlur={(event) => {
                        if (
                          event.currentTarget.validity.valid ||
                          !event.currentTarget.value.length
                        ) {
                          setNativePasswordError(null);
                        } else {
                          setNativePasswordError(
                            event.currentTarget.validity.valueMissing
                              ? 'Please enter a password'
                              : 'Passwords must be at least 8 characters',
                          );
                        }
                      }}
                    />
                    {nativePasswordError && (
                      <p className="text-red-500">
                        {nativePasswordError} &nbsp;
                      </p>
                    )}
                  </div>
                  <div className="contact_email">
                    <label for="">Re-enter Password</label>
                    <br />
                    <input
                      type="password"
                      name="passwordConfirm"
                      placeholder="Enter your Conform password"
                    />
                  </div>
                  <div className="register_btn">
                    <button
                      className="btn"
                      // value="Register"
                      disabled={!!(nativePasswordError || nativeEmailError)}
                    >
                      Sign Up
                    </button>
                  </div>
                  <span>
                    Already registered? <Link to="/account/login"> Login </Link>
                    here
                  </span>
                </Form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

// NOTE: https://shopify.dev/docs/api/storefront/latest/mutations/customerCreate
const CUSTOMER_CREATE_MUTATION = `#graphql
  mutation customerCreate(
    $input: CustomerCreateInput!,
    $country: CountryCode,
    $language: LanguageCode
  ) @inContext(country: $country, language: $language) {
    customerCreate(input: $input) {
      customer {
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

// NOTE: https://shopify.dev/docs/api/storefront/latest/mutations/customeraccesstokencreate
const REGISTER_LOGIN_MUTATION = `#graphql
  mutation registerLogin(
    $input: CustomerAccessTokenCreateInput!,
    $country: CountryCode,
    $language: LanguageCode
  ) @inContext(country: $country, language: $language) {
    customerAccessTokenCreate(input: $input) {
      customerUserErrors {
        code
        field
        message
      }
      customerAccessToken {
        accessToken
        expiresAt
      }
    }
  }
`;

/**
 * @typedef {{
 *   error: string | null;
 *   newCustomer:
 *     | NonNullable<CustomerCreateMutation['customerCreate']>['customer']
 *     | null;
 * }} ActionResponse
 */

/** @typedef {import('@shopify/remix-oxygen').ActionFunctionArgs} ActionFunctionArgs */
/** @typedef {import('@shopify/remix-oxygen').LoaderFunctionArgs} LoaderFunctionArgs */
/** @typedef {import('storefrontapi.generated').CustomerCreateMutation} CustomerCreateMutation */
/** @typedef {import('@shopify/remix-oxygen').SerializeFrom<typeof loader>} LoaderReturnData */
/** @typedef {import('@shopify/remix-oxygen').SerializeFrom<typeof action>} ActionReturnData */
