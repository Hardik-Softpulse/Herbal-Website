import Stamp from '../image/stamp.png';
import {Swiper, SwiperSlide} from 'swiper/react';
import {Pagination} from 'swiper/modules';
import {ProductCards} from '~/components';

export function NewArrival({product, title, collectionHandle}) {
  return (
    <section className="new_product">
      <div className="container">
        <div className="spacer">
          <div className="section_title">
            <h2>{title}</h2>
          </div>

          <div className="stamp">
            <div className="stamp_wrap">
              <img src={Stamp} alt="" />
            </div>
          </div>
          <div id="new-product">
            <Swiper
              slidesPerView={4}
              spaceBetween={20}
              modules={[Pagination]}
              pagination={{clickable: true}}
              breakpoints={{
                100: {
                  slidesPerView: 1,
                  spaceBetween: 20,
                },
                200: {
                  slidesPerView: 1,
                  spaceBetween: 20,
                },
                511: {
                  slidesPerView: 2,
                  spaceBetween: 20,
                },
                767: {
                  slidesPerView: 4,
                  spaceBetween: 20,
                },
              }}
            >
              <div className="main_product">
                {product?.map((products) => (
                  <SwiperSlide key={products.id}>
                    <ProductCards product={products} />
                  </SwiperSlide>
                ))}
              </div>
            </Swiper>
          </div>
          <div className="product_btn">
            <a
              href={
                collectionHandle
                  ? `collections/${collectionHandle}`
                  : '/collections/all'
              }
              className="btn"
            >
              Shop More
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
