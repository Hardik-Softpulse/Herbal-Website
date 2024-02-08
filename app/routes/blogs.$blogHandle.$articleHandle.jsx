import {json} from '@shopify/remix-oxygen';
import {useLoaderData} from '@remix-run/react';
import {Image} from '@shopify/hydrogen';
import Discount from '../image/discount.png';
import {FeaturedSection} from '~/components';

export const meta = ({data}) => {
  return [{title: `Hydrogen | ${data?.article.title ?? ''} article`}];
};

/**
 * @param {LoaderFunctionArgs}
 */
export async function loader({params, context}) {
  const {blogHandle, articleHandle} = params;

  if (!articleHandle || !blogHandle) {
    throw new Response('Not found', {status: 404});
  }

  const {blog} = await context.storefront.query(ARTICLE_QUERY, {
    variables: {blogHandle, articleHandle},
  });

  if (!blog?.articleByHandle) {
    throw new Response(null, {status: 404});
  }

  const article = blog.articleByHandle;

  return json({article});
}

export default function Article() {
  /** @type {LoaderReturnData} */
  const {article} = useLoaderData();
  const {title, image, contentHtml, author} = article;

  const publishedDate = new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(new Date(article.publishedAt));

  return (
    // <div className="article">
    //   <h1>
    //     {title}
    //     <span>
    //       {publishedDate} &middot; {author?.name}
    //     </span>
    //   </h1>

    //   {image && <Image data={image} sizes="90vw" loading="eager" />}
    //   <div
    //     dangerouslySetInnerHTML={{__html: contentHtml}}
    //     className="article"
    //   />
    // </div>
    <main className="abt_sec">
      <section className="blog_detail">
        <div className="container">
          <div className="spacer">
            <div className="section_title">
              <h2>{title}</h2>
              <p> {publishedDate} </p>
            </div>
            <div className="main_blog_detail flex">
              <div className="left_blog_detail">
                <div className="left_blog_detail_img">
                  {image && (
                    <Image
                      data={image}
                      loading="eager"
                      lt="blog"
                      height="452px"
                      width="1065px"
                    />
                  )}
                </div>
                <div class="left_blog_detail_content">
                  <p dangerouslySetInnerHTML={{__html: contentHtml}}></p>
                  <div className="blog_detail_share">
                    <h3>Share:</h3>
                    <div className="blog_detail_icon">
                      <ul className="flex">
                        <li>
                          <a href="">
                            <svg
                              width="30"
                              height="30"
                              viewBox="0 0 30 30"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <rect width="30" height="30" fill="#F5F5F5" />
                              <g id="Blog Detail" clipPath="url(#clip0_0_1)">
                                <rect
                                  width="1920"
                                  height="4303"
                                  transform="translate(-250 -3369)"
                                  fill="white"
                                />
                                <g id="Blog Detail_2">
                                  <g id="Social Media">
                                    <g id="Group 110">
                                      <g id="Frame" clipPath="url(#clip1_0_1)">
                                        <rect
                                          width="30"
                                          height="30"
                                          fill="white"
                                        />
                                        <g id="Group">
                                          <path
                                            id="Vector"
                                            d="M15 29C22.732 29 29 22.732 29 15C29 7.26801 22.732 1 15 1C7.26801 1 1 7.26801 1 15C1 22.732 7.26801 29 15 29Z"
                                            stroke="#1C6758"
                                          />
                                          <path
                                            id="Vector_2"
                                            d="M13.6 21.8V15.933H12V13.8H13.6V11.933C13.6 10.423 14.548 9 16.8 9C17.704 9 18.4 9.118 18.4 9.118L18.311 11.133H16.933C16.119 11.133 16 11.578 16 12.2V13.8H18.4L18.237 15.933H16V21.8H13.6Z"
                                            fill="#1C6758"
                                          />
                                        </g>
                                      </g>
                                    </g>
                                  </g>
                                </g>
                              </g>
                              <defs>
                                <clipPath id="clip0_0_1">
                                  <rect
                                    width="1920"
                                    height="4303"
                                    fill="white"
                                    transform="translate(-250 -3369)"
                                  />
                                </clipPath>
                                <clipPath id="clip1_0_1">
                                  <rect width="30" height="30" fill="white" />
                                </clipPath>
                              </defs>
                            </svg>
                          </a>
                        </li>
                        <li>
                          <a href="">
                            <svg
                              width="30"
                              height="30"
                              viewBox="0 0 30 30"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <g clipPath="url(#clip0_220_1646)">
                                <path
                                  d="M15 29C22.732 29 29 22.732 29 15C29 7.26801 22.732 1 15 1C7.26801 1 1 7.26801 1 15C1 22.732 7.26801 29 15 29Z"
                                  stroke="#1C6758"
                                  strokeWidth="0.875"
                                />
                                <path
                                  d="M21.8 11.229C21.444 11.763 21 12.222 20.496 12.592V12.933C20.496 16.4 17.859 20.4 13.03 20.4C11.548 20.4 10.156 20.074 9 19.333C9.207 19.363 9.415 19.377 9.622 19.377C10.852 19.377 11.992 18.844 12.882 18.133C12.3351 18.123 11.8052 17.9419 11.3666 17.6151C10.928 17.2882 10.6029 16.8322 10.437 16.311C10.8305 16.3831 11.2351 16.3677 11.622 16.266C11.0278 16.1454 10.4936 15.8229 10.1102 15.3531C9.72689 14.8833 9.51798 14.2953 9.519 13.689V13.659C9.874 13.851 10.274 13.97 10.704 13.985C10.3442 13.747 10.0489 13.4234 9.84475 13.0433C9.64057 12.6632 9.5338 12.2385 9.534 11.807C9.534 11.318 9.667 10.918 9.889 10.533C11.193 12.118 13.119 13.111 15.296 13.229C15.252 13.037 15.237 12.829 15.237 12.622C15.2365 12.2775 15.3039 11.9363 15.4355 11.618C15.5671 11.2996 15.7602 11.0104 16.0038 10.7668C16.2474 10.5232 16.5366 10.3301 16.855 10.1985C17.1733 10.0669 17.5145 9.99948 17.859 10C18.615 10 19.296 10.326 19.785 10.83C20.37 10.7113 20.9311 10.4956 21.445 10.192C21.2501 10.801 20.8388 11.3176 20.289 11.644C20.8108 11.5829 21.3202 11.443 21.8 11.229Z"
                                  fill="#1C6758"
                                />
                              </g>
                              <defs>
                                <clipPath id="clip0_220_1646">
                                  <rect width="30" height="30" fill="white" />
                                </clipPath>
                              </defs>
                            </svg>
                          </a>
                        </li>
                        <li>
                          <a href="">
                            <svg
                              width="30"
                              height="30"
                              viewBox="0 0 30 30"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <g clipPath="url(#clip0_220_1650)">
                                <path
                                  d="M15 29C22.732 29 29 22.732 29 15C29 7.26801 22.732 1 15 1C7.26801 1 1 7.26801 1 15C1 22.732 7.26801 29 15 29Z"
                                  stroke="#1C6758"
                                  strokeWidth="0.875"
                                />
                                <path
                                  d="M14.5718 17.1014L14.4613 16.8989C14.7754 17.2619 15.2511 17.485 15.777 17.485C16.7177 17.485 17.4379 16.8751 17.8969 16.0725C18.3572 15.2676 18.604 14.1998 18.604 13.075C18.604 12.1534 18.2933 11.3125 17.6651 10.7024C17.0371 10.0923 16.1397 9.759 15.052 9.759C12.5253 9.759 10.922 11.6566 10.922 13.77C10.922 14.534 11.1529 15.0912 11.5221 15.5364C11.5067 15.609 11.4797 15.715 11.4522 15.8209C10.8443 15.4324 10.5 14.6289 10.5 13.593C10.5 11.7722 12.0311 9.5 15.244 9.5C17.8017 9.5 19.396 11.3246 19.396 13.207C19.396 15.9481 17.9079 17.744 15.941 17.744C15.625 17.744 15.3181 17.6616 15.0666 17.5317C14.8095 17.3988 14.6447 17.2349 14.5718 17.1014ZM14.138 16.3068L13.9547 15.9711L13.6474 17.2217L14.133 17.341L13.6474 17.2217L13.6474 17.2218L13.6474 17.222L13.6472 17.2229L13.6463 17.2264L13.6428 17.2405L13.6295 17.2945L13.5812 17.4897C13.5408 17.6527 13.4859 17.8734 13.4278 18.1041C13.309 18.5755 13.1841 19.0603 13.1382 19.2054L13.135 19.2156L13.1322 19.226C13.005 19.6982 12.7568 20.179 12.5166 20.5717C12.499 20.0968 12.5162 19.5402 12.6345 19.0414L12.6345 19.0414L12.6359 19.0354C12.7017 18.7418 12.9343 17.7449 13.1512 16.8175C13.2595 16.3547 13.3636 15.9104 13.4407 15.5818L13.5331 15.1878L13.5588 15.0787L13.5655 15.0501L13.5672 15.0428L13.5676 15.0409L13.5677 15.0405L13.5678 15.0403L13.081 14.926L13.5678 15.0403L13.6075 14.8712L13.5349 14.7164L13.5318 14.7091C13.5283 14.7008 13.5222 14.6859 13.5143 14.665C13.4985 14.623 13.4759 14.5573 13.4527 14.4716C13.4062 14.2996 13.359 14.0515 13.359 13.756C13.359 12.7942 13.8796 12.359 14.267 12.359C14.4658 12.359 14.5672 12.426 14.6281 12.4993C14.6996 12.5854 14.759 12.736 14.759 12.956C14.759 13.2056 14.6745 13.5573 14.5372 14.016C14.5032 14.1297 14.466 14.2496 14.4277 14.3735C14.3212 14.717 14.2054 15.0908 14.1206 15.4473L14.1206 15.4473L14.1194 15.4524C14.05 15.7582 14.0623 16.0475 14.138 16.3068Z"
                                  fill="white"
                                  stroke="#1C6758"
                                />
                              </g>
                              <defs>
                                <clipPath id="clip0_220_1650">
                                  <rect width="30" height="30" fill="white" />
                                </clipPath>
                              </defs>
                            </svg>
                          </a>
                        </li>
                        <li>
                          <a href="">
                            <svg
                              width="30"
                              height="30"
                              viewBox="0 0 30 30"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <g clipPath="url(#clip0_220_1654)">
                                <path
                                  d="M15 29C22.732 29 29 22.732 29 15C29 7.26801 22.732 1 15 1C7.26801 1 1 7.26801 1 15C1 22.732 7.26801 29 15 29Z"
                                  stroke="#1C6758"
                                  strokeWidth="0.875"
                                />
                                <path
                                  d="M9.267 13.266H11.933V21.533H9.267V13.266ZM16.2 16.733V21.533H13.533V15.133C13.533 15.133 13.489 13.548 13.489 13.266H16.111L16.2 14.407C16.733 13.607 17.533 13 18.6 13C20.467 13 21.8 14.333 21.8 16.733V21.533H19.133V17C19.133 15.666 18.482 15.133 17.682 15.133C16.882 15.133 16.2 15.666 16.2 16.733ZM10.585 11.933H10.57C9.622 11.933 9 11.281 9 10.466C9 9.636 9.637 9 10.615 9C11.578 9 12.185 9.637 12.2 10.466C12.2 11.281 11.578 11.933 10.585 11.933Z"
                                  fill="#1C6758"
                                />
                              </g>
                              <defs>
                                <clipPath id="clip0_220_1654">
                                  <rect width="30" height="30" fill="white" />
                                </clipPath>
                              </defs>
                            </svg>
                          </a>
                        </li>
                        <li>
                          <a href="">
                            <svg
                              width="30"
                              height="30"
                              viewBox="0 0 30 30"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <g clipPath="url(#clip0_220_1658)">
                                <path
                                  d="M14.9997 29.1892C22.8362 29.1892 29.1889 22.8365 29.1889 15C29.1889 7.16351 22.8362 0.810791 14.9997 0.810791C7.16326 0.810791 0.810547 7.16351 0.810547 15C0.810547 22.8365 7.16326 29.1892 14.9997 29.1892Z"
                                  stroke="#1C6758"
                                  strokeWidth="0.810811"
                                />
                                <path
                                  fillRule="evenodd"
                                  clipRule="evenodd"
                                  d="M21.973 10.8108L15.4865 15.6757L9 10.8108C9 10.36 9.36 10 9.81081 10H21.1622C21.613 10 21.973 10.36 21.973 10.8108ZM9 12.267L15.4865 17.1319L21.973 12.267V18.9189C21.973 19.3697 21.613 19.7297 21.1622 19.7297H9.81081C9.36 19.7297 9 19.3697 9 18.9189V12.267Z"
                                  fill="#1C6758"
                                />
                              </g>
                              <defs>
                                <clipPath id="clip0_220_1658">
                                  <rect width="30" height="30" fill="white" />
                                </clipPath>
                              </defs>
                            </svg>
                          </a>
                        </li>
                        <li>
                          <a href="">
                            <svg
                              width="30"
                              height="30"
                              viewBox="0 0 30 30"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <g clipPath="url(#clip0_220_1662)">
                                <path
                                  fillRule="evenodd"
                                  clipRule="evenodd"
                                  d="M20.4409 18.7889V21.3608C20.4409 21.5016 20.385 21.6367 20.2854 21.7363C20.1858 21.8359 20.0507 21.8919 19.9098 21.8919H10.0893C9.94846 21.8919 9.81337 21.8359 9.71378 21.7363C9.61418 21.6367 9.55823 21.5016 9.55823 21.3608V18.7889H7.82796C7.6871 18.7889 7.55202 18.7329 7.45242 18.6333C7.35283 18.5337 7.29688 18.3987 7.29688 18.2578V10.9556C7.29688 10.6621 7.53444 10.4246 7.82796 10.4246H22.1712C22.4647 10.4246 22.7023 10.6621 22.7023 10.9556V18.2578C22.7023 18.3987 22.6463 18.5337 22.5467 18.6333C22.4471 18.7329 22.312 18.7889 22.1712 18.7889H20.4401H20.4409ZM10.6885 15.6859V20.8127H19.3107V15.6859H10.6885Z"
                                  fill="#1C6758"
                                />
                                <path
                                  fillRule="evenodd"
                                  clipRule="evenodd"
                                  d="M11.5462 16.6793H18.4519V17.722H11.5462V16.6793ZM11.5462 18.7647H18.4519V19.8074H11.5462V18.7647ZM9.95296 7.29736H19.5148C19.8084 7.29736 20.0459 7.53493 20.0459 7.82844V9.38196H9.42188V7.82844C9.42188 7.53493 9.65944 7.29736 9.95296 7.29736Z"
                                  fill="#1C6758"
                                />
                                <path
                                  d="M14.9997 29.1892C22.8362 29.1892 29.1889 22.8365 29.1889 15C29.1889 7.16351 22.8362 0.810791 14.9997 0.810791C7.16326 0.810791 0.810547 7.16351 0.810547 15C0.810547 22.8365 7.16326 29.1892 14.9997 29.1892Z"
                                  stroke="#1C6758"
                                  strokeWidth="0.810811"
                                />
                              </g>
                              <defs>
                                <clipPath id="clip0_220_1662">
                                  <rect width="30" height="30" fill="white" />
                                </clipPath>
                              </defs>
                            </svg>
                          </a>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
              <div className="right_blog_detail">
                <FeaturedSection />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section>
        <div class="container">
          <div class="spacer">
            <div class="main_discount_banner flex align_center">
              <div class="discount_vector">
                <img src={Discount} alt="" />
              </div>
              <div class="discount_content">
                <h4>Do you want a 10% discount for your first purchase?</h4>
                <p>Join our newsletter and get discount</p>
                <input type="email" placeholder="Enter your email address" />
                <div class="discount_btn">
                  <a href="#" class="btn">
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

// NOTE: https://shopify.dev/docs/api/storefront/latest/objects/blog#field-blog-articlebyhandle
const ARTICLE_QUERY = `#graphql
  query Article(
    $articleHandle: String!
    $blogHandle: String!
    $language: LanguageCode
  ) @inContext(language: $language ) {
    blog(handle: $blogHandle) {
      articleByHandle(handle: $articleHandle) {
        title
        contentHtml
        publishedAt
        author: authorV2 {
          name
        }
        image {
          id
          altText
          url
          width
          height
        }
        seo {
          description
          title
        }
      }
    }
  }
`;

/** @typedef {import('@shopify/remix-oxygen').LoaderFunctionArgs} LoaderFunctionArgs */
/** @template T @typedef {import('@remix-run/react').MetaFunction<T>} MetaFunction */
/** @typedef {import('@shopify/remix-oxygen').SerializeFrom<typeof loader>} LoaderReturnData */
