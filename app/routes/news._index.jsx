import {json} from '@shopify/remix-oxygen';
import {Link, useLoaderData} from '@remix-run/react';
import {
  flattenConnection,
  getPaginationVariables,
  Image,
  Pagination,
} from '@shopify/hydrogen';
import {getImageLoadingPriority, PAGINATION_SIZE} from '~/lib/const';
import {seoPayload} from '~/lib/seo.server';
import {routeHeaders} from '~/data/cache';
import Discount from '../image/discount.png';

const BLOG_HANDLE = 'news';

export const headers = routeHeaders;

export const loader = async ({request, context: {storefront}, params}) => {
  const paginationVariables = getPaginationVariables(request, {
    pageBy: 4,
  });

  if (!BLOG_HANDLE) {
    throw new Response(`blog not found`, {status: 404});
  }

  const {blog} = await storefront.query(BLOGS_QUERY, {
    variables: {
      blogHandle: BLOG_HANDLE,
      ...paginationVariables,
    },
  });

  if (!blog?.articles) {
    throw new Response('Not found', {status: 404});
  }

  return json({blog});
};

export default function Blog() {
  const {blog} = useLoaderData();
  const {articles} = blog;
  console.log('first', articles)

  return (
    <main className="abt_sec">
      <section>
        <div className="container">
          <Pagination connection={articles}>
            {({nodes, isLoading, PreviousLink, NextLink}) => {
              return (
                <div className="spacer">
                  <div className="section_title">
                    <h2>{blog.title}</h2>
                  </div>
                  <div className="main_blog_list flex">
                    {nodes.map((article, index) => {
                      return (
                        <ArticleItem
                          article={article}
                          key={article.id}
                          loading={index < 2 ? 'eager' : 'lazy'}
                        />
                      );
                    })}
                  </div>
                  <div className="product_btn">
                    <NextLink className="btn">Load More</NextLink>
                    <PreviousLink>
                      {isLoading ? (
                        'Loading...'
                      ) : (
                        <button className="btn">Previous</button>
                      )}
                    </PreviousLink>
                  </div>
                </div>
              );
            }}
          </Pagination>
        </div>
      </section>

      <section>
        <div className="container">
          <div className="spacer">
            <div className="main_discount_banner flex align_center">
              <div className="discount_vector">
                <img src={Discount} alt="" />
              </div>
              <div className="discount_content">
                <h4>Do you want a 10% discount for your first purchase?</h4>
                <p>Join our newsletter and get discount</p>
                <input type="email" placeholder="Enter your email address" />
                <div className="discount_btn">
                  <a href="#" className="btn">
                    Subscribe
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

function ArticleItem({article, loading}) {
  const publishedAt = new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(new Date(article.publishedAt));

  return (
    <div className="blog_list" key={article.id}>
      {article.image && (
        <div className="blog_list_img">
          <Link to={`/blogs/${article.blog.handle}/${article.handle}`}>
            <Image
              alt={article.image.altText || article.title}
              aspectRatio="3/2"
              data={article.image}
              loading={loading}
              sizes="(min-width: 768px) 50vw, 100vw"
            />
          </Link>
        </div>
      )}
      <div className="blog_list_content">
        <h2>{article.title}</h2> <h5>{publishedAt}</h5>
        <p dangerouslySetInnerHTML={{__html: article.contentHtml}}></p>
        <Link to={`/blogs/${article.blog.handle}/${article.handle}`}>
          Read More
        </Link>
      </div>
    </div>
  );
}

const BLOGS_QUERY = `#graphql
  query Blog(
    $language: LanguageCode
    $blogHandle: String!
    $first: Int
    $last: Int
    $startCursor: String
    $endCursor: String
  ) @inContext(language: $language) {
    blog(handle: $blogHandle) {
      title
      seo {
        title
        description
      }
      articles(
        first: $first,
        last: $last,
        before: $startCursor,
        after: $endCursor
      ) {
        nodes {
          ...ArticleItem
        }
        pageInfo {
          hasPreviousPage
          hasNextPage
          hasNextPage
          endCursor
          startCursor
        }

      }
    }
  }
  fragment ArticleItem on Article {
    author: authorV2 {
      name
    }
    contentHtml
    handle
    id
    image {
      id
      altText
      url
      width
      height
    }
    publishedAt
    title
    blog {
      handle
    }
  }
`;
