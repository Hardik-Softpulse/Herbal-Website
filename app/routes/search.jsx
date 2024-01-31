import {defer} from '@shopify/remix-oxygen';
import {useLoaderData} from '@remix-run/react';
import {getPaginationVariables} from '@shopify/hydrogen';
import {seoPayload} from '~/lib/seo.server';
import {SearchForm, SearchResults} from '~/components';
import {PRODUCT_CARD_FRAGMENT} from '~/data/fragments';
import {PAGINATION_SIZE} from '~/lib/const';
import {getFeaturedData} from './featured-products';

export const meta = () => {
  return [{title: `Hydrogen | Search`}];
};

export async function loader({request, context: {storefront}}) {
  const searchParams = new URL(request.url).searchParams;
  const searchTerm = searchParams.get('q');
  const variables = getPaginationVariables(request, {pageBy: 8});

  const {products} = await storefront.query(SEARCH_QUERY, {
    variables: {
      searchTerm,
      ...variables,
      language: storefront.i18n.language,
    },
  });

  const shouldGetRecommendations = !searchTerm || products?.nodes?.length === 0;

  const seo = seoPayload.collection({
    url: request.url,
    collection: {
      id: 'search',
      title: 'Search',
      handle: 'search',
      descriptionHtml: 'Search results',
      description: 'Search results',
      seo: {
        title: 'Search',
        description: `Showing ${products.nodes.length} search results for "${searchTerm}"`,
      },
      metafields: [],
      products,
      updatedAt: new Date().toISOString(),
    },
  });

  return defer({
    seo,
    searchTerm,
    products,
    noResultRecommendations: shouldGetRecommendations
      ? getNoResultRecommendations(storefront)
      : Promise.resolve(null),
  });
}

export default function SearchPage() {
  const {searchTerm, products, noResultRecommendations, seo} = useLoaderData();

  console.log('searchTerm', searchTerm);
  console.log('products', products);
  console.log('noResultRecommendations', noResultRecommendations);

  return (
    <main className="abt_sec">
      <section className="main_search_form">
        <div className="container">
          <div className="spacer">
            <div className="section_title">
              <h2>{seo.title}</h2>
            </div>
            <SearchForm searchTerm={searchTerm} />
            {!searchTerm || products.nodes.length === 0 ? (
              <NoSearchResults searchTerm={searchTerm} />
            ) : (
              <SearchResults results={products} />
            )}
          </div>
        </div>
      </section>
    </main>
  );
}

function NoSearchResults({noResults, recommendations, searchTerm}) {
  return (
    <>
      <div className="searchResult">
        <ul>
          <li>
            We are sorry! We couldn't find results for
            <span className="search-text">{` "${searchTerm}".`}</span>
          </li>
          <li>
            But don't give up – check the spelling or try less specific search
            terms.
          </li>
        </ul>
      </div>
    </>
  );
}

const SEARCH_QUERY = `#graphql
query PaginatedProductsSearch(
  $country: CountryCode
  $endCursor: String
  $first: Int
  $language: LanguageCode
  $last: Int
  $searchTerm: String
  $startCursor: String
) @inContext(country: $country, language: $language) {
  products(
    first: $first,
    last: $last,
    before: $startCursor,
    after: $endCursor,
    sortKey: RELEVANCE,
    query: $searchTerm
  ) {
    nodes {
      ...ProductCard
    }
    pageInfo {
      startCursor
      endCursor
      hasNextPage
      hasPreviousPage
    }
  }
}

  ${PRODUCT_CARD_FRAGMENT}
`;
export function getNoResultRecommendations(storefront) {
  return getFeaturedData(storefront, {pageBy: PAGINATION_SIZE});
}
