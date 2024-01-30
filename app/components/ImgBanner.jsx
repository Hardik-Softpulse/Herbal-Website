import {Link} from '@remix-run/react';

export function ImgBanner({collection, data}) {
  const {block_order, blocks} = data;

  return (
    <section className="img_banner_sec">
      <div className="container">
        <div className="spacer">
          <div className="main_news_banner flex justify_center ">
            {block_order.map((blockId) => {
              const {settings} = blocks[blockId];
              const collectionData = blocks[blockId].settings;
              const catagory = collection.find(
                (data) => data.handle === collectionData.collection,
              );

              return (
                <div className="banner_news">
                  <div className="news_banner_img1">
                    <div className="news_img_wrap">
                      <Link to={`/collections/${settings.collection}`}>
                        <img
                          src={catagory.image.url}
                          alt="Collection-Image"
                          height="690px"
                          width="690px"
                        />
                      </Link>
                    </div>
                  </div>
                  <div className="news_banner_content">
                    <h4>{catagory.title}</h4>
                    <a
                      href={`/collections/${settings.collection}`}
                      className="btn"
                    >
                      Shop Now
                    </a>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
