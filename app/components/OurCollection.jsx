import {Swiper, SwiperSlide} from 'swiper/react';
import {Navigation} from 'swiper/modules';

export function OurCollection({collection, data}) {
  return (
    <section>
      <div className="container">
        <div className="spacer">
          <div className="section_title">
            <h2>Shop By Category</h2>
          </div>

          <div id="interest">
            <Swiper
              loop={true}
              spaceBetween={20}
              slidesPerView={7}
              modules={[Navigation]}
              navigation={{clickable: true}}
              breakpoints={{
                100: {
                  slidesPerView: 1,
                  spaceBetween: 20,
                },
                200: {
                  slidesPerView: 2,
                  spaceBetween: 20,
                },
                415: {
                  slidesPerView: 2,
                  spaceBetween: 20,
                },
                501: {
                  slidesPerView: 3,
                  spaceBetween: 20,
                },
                700: {
                  slidesPerView: 4,
                  spaceBetween: 20,
                },
                1000: {
                  slidesPerView: 5,
                  spaceBetween: 20,
                },
                1100: {
                  slidesPerView: 5,
                  spaceBetween: 20,
                },
                1300: {
                  slidesPerView: 5,
                  spaceBetween: 20,
                },
              }}
            >
              {data.block_order.map((blockId,i) => {
                const collectionData = data.blocks[blockId].settings;
                const catagory = collection.find(
                  (data) => data.handle === collectionData.collection,
                );

                return (
                  <SwiperSlide key={i}>
                    <div className="interest_content">
                      <div className="interest_img">
                        <a href={`/collections/${catagory.handle}`}>
                          <img
                            src={catagory.image?.url}
                            alt="Collection-Image"
                          />
                        </a>
                      </div>
                      <a href={`/collections/${catagory.handle}`}>
                        {catagory.title}
                      </a>
                    </div>
                  </SwiperSlide>
                );
              })}
            </Swiper>
          </div>
        </div>
      </div>
    </section>
  );
}
