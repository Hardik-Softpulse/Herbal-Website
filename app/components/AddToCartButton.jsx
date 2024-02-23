import {CartForm} from '@shopify/hydrogen';
import {CartAction} from '~/lib/type';
import {useFetcher, useMatches} from '@remix-run/react';

export function AddToCartButton({
  title,
  lines,
  className = '',
  variant = 'primary',
  disabled,
  analytics,
  isModalOpen,
  setIsModalOpen,
  ...props
}) {
  const [root] = useMatches();
  const selectedLocale = root?.data?.selectedLocale;
  const fetcher = useFetcher();
  const fetcherIsNotIdle = fetcher.state !== 'idle';

  return (
    <fetcher.Form action="/cart" method="post">
      <input type="hidden" name="cartAction" value={CartAction.ADD_TO_CART} />
      <input type="hidden" name="countryCode" value={selectedLocale.country} />
      <input type="hidden" name="lines" value={JSON.stringify(lines)} />
      <input type="hidden" name="analytics" value={JSON.stringify(analytics)} />
      <button
        type="submit"
        variant={variant}
        className={className}
        disabled={disabled ?? fetcher.state !== 'idle'}
        {...props}
      >
        {title}
      </button>
    </fetcher.Form>
  );
}
