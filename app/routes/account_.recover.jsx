import {json, redirect} from '@shopify/remix-oxygen';
import {Form, Link, useActionData} from '@remix-run/react';

/**
 * @param {LoaderFunctionArgs}
 */
export async function loader({context, params}) {
  const customerAccessToken = await context.session.get('customerAccessToken');
  if (customerAccessToken) {
    return redirect(params.locale ? `${params.locale}/account` : '/account');
  }
  return new Response(null);
}

const badRequest = (data) => json(data, {status: 400});

export const action = async ({request, context}) => {
  const formData = await request.formData();
  const email = formData.get('email');

  if (!email || typeof email !== 'string') {
    return badRequest({
      formError: 'Please provide an email.',
    });
  }

  try {
    await context.storefront.mutate(CUSTOMER_RECOVER_MUTATION, {
      variables: {email},
    });

    return json({resetRequested: true});
  } catch (error) {
    return badRequest({
      formError: 'Something went wrong. Please try again later.',
    });
  }
};

export default function Recover() {
  /** @type {ActionReturnData} */
  const action = useActionData();

  return (
    <main className="abt_sec">
    <section>
      <div className="container">
        <div className="spacer">
          <div className="account-recover">
            <div>
              {action?.resetRequested ? (
                <>

                  <div class="section_title">
                    <h2>Request Sent.</h2>
                  </div>
                  <div className="main_forgot_pass">
                    <p>
                      If that email address is in our system, you will receive an email
                      with instructions about how to reset your password in a few
                      minutes.
                    </p>
                    <br />
                    <p><Link className='btn' to="/account/login">Return to Login</Link></p>
                  </div>
                </>
              ) : (
                <>
                  <div className="section_title">
                    <h2>Forgot Password.</h2>
                  </div>
                  <div className="main_forgot_pass">
                    <p>
                      Enter the email address associated with your account to receive a
                      link to reset your password.
                    </p>
                    <br />
                    <Form method="POST">
                      <fieldset>
                        <label htmlFor="email">Email</label>
                        <input
                          aria-label="Email address"
                          autoComplete="email"
                          // eslint-disable-next-line jsx-a11y/no-autofocus
                          autoFocus
                          id="email"
                          name="email"
                          placeholder="Email address"
                          required
                          type="email"
                        />
                      </fieldset>
                      {action?.error ? (
                        <p className='text-red-500'>
                          <mark>
                            <small>{action.error}</small>
                          </mark>
                        </p>
                      ) : (
                        <br />
                      )}
                      <button className='btn' type="submit">Request Reset Link</button>
                    </Form>
                    <div>
                      <br />
                      <p>
                        <Link className='btn' to="/account/login">Login →</Link>
                      </p>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  </main>
  );
}

// NOTE: https://shopify.dev/docs/api/storefront/latest/mutations/customerrecover
const CUSTOMER_RECOVER_MUTATION = `#graphql
  mutation customerRecover(
    $email: String!,
    $language: LanguageCode
  ) @inContext( language: $language) {
    customerRecover(email: $email) {
      customerUserErrors {
        code
        field
        message
      }
    }
  }
`;

/**
 * @typedef {{
 *   error?: string;
 *   resetRequested?: boolean;
 * }} ActionResponse
 */

/** @typedef {import('@shopify/remix-oxygen').LoaderFunctionArgs} LoaderFunctionArgs */
/** @typedef {import('@shopify/remix-oxygen').ActionFunctionArgs} ActionFunctionArgs */
/** @typedef {import('@shopify/remix-oxygen').SerializeFrom<typeof loader>} LoaderReturnData */
/** @typedef {import('@shopify/remix-oxygen').SerializeFrom<typeof action>} ActionReturnData */
