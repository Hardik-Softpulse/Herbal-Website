import {Swiper, SwiperSlide} from 'swiper/react';
import {Autoplay, Navigation} from 'swiper/modules';

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
              slidesPerView={4}
              slidesPerGroup={4}
              autoplay={{
                delay: 2500,
              }}
              modules={[Navigation, Autoplay]}
              navigation={{clickable: true}}
              draggable={true}
              breakpoints={{
                100: {
                  slidesPerView: 1,
                  spaceBetween: 20,
                  slidesPerGroup: 1,
                },
                200: {
                  slidesPerView: 2,
                  spaceBetween: 20,
                  slidesPerGroup: 2,
                },
                415: {
                  slidesPerView: 2.5,
                  spaceBetween: 20,
                  slidesPerGroup: 2.5,
                },
                501: {
                  slidesPerView: 3,
                  spaceBetween: 20,
                  slidesPerGroup: 3,
                },
                700: {
                  slidesPerView: 3.2,
                  spaceBetween: 20,
                  slidesPerGroup: 3.2,
                },
                1000: {
                  slidesPerView: 4.5,
                  spaceBetween: 20,
                  slidesPerGroup: 4.5,
                },
                1100: {
                  slidesPerView: 4,
                  spaceBetween: 20,
                  slidesPerGroup: 4,
                },
                1300: {
                  slidesPerView: 4,
                  spaceBetween: 20,
                  slidesPerGroup: 4,
                },
              }}
            >
              {data.block_order.map((blockId, id) => {
                const collectionData = data.blocks[blockId].settings;
                const catagory = collection.find(
                  (data) => data.handle === collectionData.collection,
                );

                return (
                  <SwiperSlide key={catagory.id}>
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
