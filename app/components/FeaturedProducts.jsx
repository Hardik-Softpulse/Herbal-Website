import clsx from 'clsx';
import {useEffect, useId, useMemo} from 'react';
import {useFetcher} from '@remix-run/react';

import {ProductCard} from '~/components';
import {usePrefixPathWithLocale} from '~/lib/utils';

export function FeaturedProducts({
  count = 4,
  heading = 'Featured Products',
  layout = 'drawer',
  onClose,
  query,
  reverse,
  sortKey = 'BEST_SELLING',
}) {
  const {load, data} = useFetcher();
  const queryString = useMemo(
    () =>
      Object.entries({count, sortKey, query, reverse})
        .map(([key, val]) => (val ? `${key}=${val}` : null))
        .filter(Boolean)
        .join('&'),
    [count, sortKey, query, reverse],
  );
  const productsApiPath = usePrefixPathWithLocale(`/products?${queryString}`);

  useEffect(() => {
    load(productsApiPath);
  }, [load, productsApiPath]);

  return (
    <div class="right_blog_detail">
      <h3>{heading}</h3>
        <FeatureProductsContent
          count={count}
          onClick={onClose}
          products={data?.products}
        />
      
    </div>
  );
}

/**
 * Render the FeaturedProducts content based on the fetcher's state. "loading", "empty" or "products"
 */
function FeatureProductsContent({count = 4, onClick, products}) {
  const id = useId();

  if (!products) {
    return (
      <>
        {[...new Array(count)].map((_, i) => (
          <div key={`${id + i}`} className="grid gap-2">
            <span className="aspect-[3/4]" />
            <span className="w-32 h-4" />
          </div>
        ))}
      </>
    );
  }

  if (products?.length === 0) {
    return <span format>No products found.</span>;
  }

  return (
    <>
      {products.nodes.map((product) => (
        <ProductCard
          product={product}
          key={product.id}
          onClick={onClick}
          quickAdd
        />
      ))}
    </>
  );
}
