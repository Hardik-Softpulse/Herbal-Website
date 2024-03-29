import {Pagination} from 'swiper/modules';
import {Swiper, SwiperSlide} from 'swiper/react';
import {ProductCards} from '~/components';
import Stamp from '../image/stamp.png';

const mockProducts = {
  nodes: new Array(12).fill(''),
};

export function ProductSwimlane({
  title = 'Featured Products',
  products = mockProducts,
  count = 12,
  ...props
}) {
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
                {products.nodes.map((product) => (
                  <SwiperSlide key={products.id}>
                    <ProductCards product={product} />
                  </SwiperSlide>
                ))}
              </div>
            </Swiper>
          </div>
        </div>
      </div>
    </section>
  );
}
