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
  const [nativeEmailError, setNativeEmailError] = useState(null);
  const [nativePasswordError, setNativePasswordError] = useState(null);
  const [showPassword, setShowPassword] = useState(false);

  return (
    <main className="abt_sec">
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
                    <div className="showPass">
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
                      <span onClick={() => setShowPassword((prev) => !prev)}>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="18"
                          height="18"
                          fill="currentColor"
                          className="bi bi-eye ms-2"
                          viewBox="0 0 16 16"
                        >
                          <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8M1.173 8a13 13 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5s3.879 1.168 5.168 2.457A13 13 0 0 1 14.828 8q-.086.13-.195.288c-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5s-3.879-1.168-5.168-2.457A13 13 0 0 1 1.172 8z" />
                          <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5M4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0" />
                        </svg>
                      </span>
                    </div>
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
                  <Link to="/account/register">
                    <span>
                      Not have an account? <span>Signup</span> here.
                    </span>
                  </Link>

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
