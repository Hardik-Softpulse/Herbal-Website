import {json, redirect} from '@shopify/remix-oxygen';
import {Form, Link, useActionData} from '@remix-run/react';
import {useState} from 'react';
import {getInputStyleClasses} from '~/lib/utils';

export const meta = () => {
  return [{title: 'Login'}];
};

export async function loader({context}) {
  if (await context.session.get('customerAccessToken')) {
    return redirect('/account');
  }
  return json({});
}

/**
 * @param {ActionFunctionArgs}
 */
export async function action({request, context}) {
  const {session, storefront} = context;

  if (request.method !== 'POST') {
    return json({error: 'Method not allowed'}, {status: 405});
  }

  try {
    const form = await request.formData();
    const email = String(form.has('email') ? form.get('email') : '');
    const password = String(form.has('password') ? form.get('password') : '');
    const validInputs = Boolean(email && password);

    if (!validInputs) {
      throw new Error('Please provide both an email and a password.');
    }

    const {customerAccessTokenCreate} = await storefront.mutate(
      LOGIN_MUTATION,
      {
        variables: {
          input: {email, password},
        },
      },
    );

    if (!customerAccessTokenCreate?.customerAccessToken?.accessToken) {
      throw new Error(customerAccessTokenCreate?.customerUserErrors[0].message);
    }

    const {customerAccessToken} = customerAccessTokenCreate;
    session.set('customerAccessToken', customerAccessToken);

    return redirect('/account', {
      headers: {
        'Set-Cookie': await session.commit(),
      },
    });
  } catch (error) {
    if (error instanceof Error) {
      return json({error: error.message}, {status: 400});
    }
    return json({error}, {status: 400});
  }
}

export default function Login() {
  /** @type {ActionReturnData} */
  const data = useActionData();
  const error = data?.error || null;
  console.log('data?.error', data);
  const [nativeEmailError, setNativeEmailError] = useState(null);
  const [nativePasswordError, setNativePasswordError] = useState(null);
  const [showPassword, setShowPassword] = useState(false);

  return (
    <main class="abt_sec">
      <section>
        <div className="container">
          <div className="spacer">
            <div className="section_title">
              <h2>Welcome Back, Login here</h2>
            </div>
            <div className="register_frm">
              <div className="right_contact_form">
                <Form method="post" noValidate>
                  {error && <p className="text-red-500 text-xs">{error}</p>}
                  <div className="contact_email">
                    <label htmlFor="">E-mail Address </label>
                    <br />
                    <input
                      type="email"
                      id="email"
                      name="email"
                      autoComplete="email"
                      required
                      placeholder="Email address"
                      aria-label="Email address"
                      autoFocus
                      onBlur={(event) => {
                        setNativeEmailError(
                          event.currentTarget.value.length &&
                            !event.currentTarget.validity.valid
                            ? 'Invalid email address'
                            : null,
                        );
                      }}
                      className={`${getInputStyleClasses(nativePasswordError)}`}
                    />
                    {nativeEmailError && (
                      <p className="text-red-500 text-xs">
                        {nativeEmailError} &nbsp;
                      </p>
                    )}
                  </div>

                  <div className="contact_email">
                    <label htmlFor="">Password </label>
                    <br />
                    <input
                      id="password"
                      name="password"
                      type={showPassword ? 'text' : 'password'}
                      autoComplete="current-password"
                      placeholder="Password"
                      aria-label="Password"
                      minLength={8}
                      required
                      className={` ${getInputStyleClasses(
                        nativePasswordError,
                      )}`}
                      // eslint-disable-next-line jsx-a11y/no-autofocus
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
                      <p className="text-red-500 text-xs">
                        {nativePasswordError} &nbsp;
                      </p>
                    )}
                  </div>
                  <div className="login_btn">
                    <button
                      disabled={!!(nativePasswordError || nativeEmailError)}
                    >
                      LogIn
                    </button>
                  </div>
                  <span>
                    Not have an account?
                    <Link to="/account/register">Signup </Link> here
                  </span>
                  <div className="forgot_pass">
                    <Link to="/account/recover">Forgot Password?</Link>
                  </div>
                </Form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

// NOTE: https://shopify.dev/docs/api/storefront/latest/mutations/customeraccesstokencreate
const LOGIN_MUTATION = `#graphql
  mutation login($input: CustomerAccessTokenCreateInput!) {
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
 * }} ActionResponse
 */

/** @typedef {import('@shopify/remix-oxygen').ActionFunctionArgs} ActionFunctionArgs */
/** @typedef {import('@shopify/remix-oxygen').LoaderFunctionArgs} LoaderFunctionArgs */
/** @template T @typedef {import('@remix-run/react').MetaFunction<T>} MetaFunction */
/** @typedef {import('@shopify/remix-oxygen').SerializeFrom<typeof loader>} LoaderReturnData */
/** @typedef {import('@shopify/remix-oxygen').SerializeFrom<typeof action>} ActionReturnData */
