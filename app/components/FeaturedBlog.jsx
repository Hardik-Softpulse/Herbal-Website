import {Link} from '@remix-run/react';
import {Image} from '@shopify/hydrogen';
import React from 'react';

export function FeaturedBlog({articles, seo}) {
  return (
    <section>
      <div className="container">
        <div className="spacer">
          <div className="section_title">
            <h2>{seo.jsonLd.name}</h2>
          </div>
          <div className="main_health flex align_center justify_center">
            <img src={articles.image?.url} alt="" />
            {articles.map((article) => (
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
                  <Link to={`/blogs/${article.blog?.handle}/${article.handle}`}>
                    Read More
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
