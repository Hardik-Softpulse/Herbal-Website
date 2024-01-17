import ImgBanner2 from '../image/img-banner2.png';
import ImgBanner1 from '../image/img-banner1.png';

export function ImgBanner({collection, collage}) {
  console.log('collage', collage);

  const {blocks} = collage;
  const {collection_cLNd8V, collection_eKCctF} = blocks;

  const section1 = collection.find(
    (type) => type.handle === collection_cLNd8V.settings?.collection,
  );

  const section2 = collection.find(
    (type) => type.handle === collection_eKCctF.settings?.collection,
  );

  console.log('first', section1);

  return (
    <section className="img_banner_sec">
      <div className="container">
        <div className="spacer">
          <div className="main_news_banner flex justify_center ">
            <div className="banner_news">
              <div className="news_banner_img1">
                <div className="news_img_wrap">
                  <img
                    src={section1.image.url}
                    alt=""
                    height="690px"
                    width="690px"
                  />
                </div>
              </div>
              <div className="news_banner_content">
                {/* <p>Herbal products make you</p> */}
                <h4>{section1.title}</h4>
                <a href={`/collections/${section1.handle}`} className="btn">
                  Shop Now
                </a>
              </div>
            </div>
            <div className="banner_news">
              <div className="news_banner_img2">
                <div className="news_img_wrap">
                  <img src={section2.image.url} alt="" />
                </div>
              </div>
              <div className="news_banner_content2">
                {/* <p>Herbal products make you</p> */}
                <h4>{section2.title}</h4>
                <a href={`/collections/${section2.handle}`} className="btn">
                  Know More
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

