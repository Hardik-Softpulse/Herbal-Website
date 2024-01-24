import {Form, useParams} from '@remix-run/react';
import {Pagination} from '@shopify/hydrogen';
import React, {useRef, useEffect} from 'react';
import {ProductCard} from './ProductCard';
import {getImageLoadingPriority} from '~/lib/const';

export function SearchForm({searchTerm}) {
  const inputRef = useRef(null);
  const params = useParams();

  useEffect(() => {
    function handleKeyDown(event) {
      if (event.key === 'k' && event.metaKey) {
        event.preventDefault();
        inputRef.current?.focus();
      }

      if (event.key === 'Escape') {
        inputRef.current?.blur();
      }
    }

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  return (
    <Form
      className="searchForm"
      method="get"
      action={params.locale ? `/${params.locale}/search` : '/search'}
    >
      <input
        defaultValue={searchTerm}
        name="q"
        className="search"
        placeholder="Search…"
        ref={inputRef}
        type="search"
      />
      <button className="btn" type="submit">
        Search
      </button>
    </Form>
  );
}

export function SearchResults({results}) {
  if (!results) {
    return null;
  }

  return <SearchResultsProductsGrid key="products" products={results} />;
}

function SearchResultsProductsGrid({products}) {
  return (
    <Pagination connection={products}>
      {({nodes, isLoading, PreviousLink, NextLink}) => (
        <>
          <div className="flex collection-card">
            {nodes.map((product, i) => {
              return (
                <ProductCard
                  key={product.id}
                  loading={getImageLoadingPriority(i)}
                  product={product}
                />
              );
            })}
          </div>
          {!isLoading && (
            <>
              <PreviousLink>
                <button className="btn">Previous</button>
              </PreviousLink>

              <NextLink>
                <button className="btn">Load More</button>
              </NextLink>
            </>
          )}
        </>
      )}
    </Pagination>
  );
}
