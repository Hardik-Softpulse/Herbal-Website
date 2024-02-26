import {Link} from '@remix-run/react';
import {Image} from '@shopify/hydrogen';
import React from 'react';
import {Swiper, SwiperSlide} from 'swiper/react';
import {Pagination} from 'swiper/modules';

export function FeaturedBlog({articles, seo}) {
  return (
    <section>
      <div className="container">
        <div className="spacer">
          <div className="section_title">
            <h2>{seo.jsonLd.name}</h2>
          </div>
          <div className="main_health flex align_center justify_center">
            <Swiper
              slidesPerView={3}
              spaceBetween={20}
              modules={[Pagination]}
              pagination={{clickable: true}}
              breakpoints={{
                100: {
                  slidesPerView: 1,
                  spaceBetween: 20,
                },
                200: {
                  slidesPerView: 1.3,
                  spaceBetween: 20,
                },
                511: {
                  slidesPerView: 1.6,
                  spaceBetween: 20,
                },
                767: {
                  slidesPerView: 3,
                  spaceBetween: 20,
                },
              }}
            >
              {articles.map((article) => (
                <SwiperSlide key={article.id}>
                  <div className="blog_list" key={article.id}>
                    {article.image && (
                      <div className="blog_list_img">
                        <Link
                          to={`/blogs/${article.blog?.handle}/${article.handle}`}
                        >
                          <Image
                            alt={article.image.altText || article.title}
                            aspectRatio="3/2"
                            data={article.image}
                            sizes="(min-width: 768px) 50vw, 100vw"
                          />
                        </Link>
                      </div>
                    )}
                    <div className="blog_list_content">
                      <h2>{article.title}</h2>
                      <h5>{article.publishedAt}</h5>
                      <p
                        dangerouslySetInnerHTML={{__html: article.contentHtml}}
                      ></p>
                      <Link
                        to={`/blogs/${article.blog?.handle}/${article.handle}`}
                      >
                        Read More
                      </Link>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      </div>
    </section>
  );
}
