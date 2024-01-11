import Stam2 from '../image/stam2.png';
import Pro2 from '../image/pro-2.png';
import Pro3 from '../image/pro-3.png';
import Pro4 from '../image/pro-4.png';
import Pro1 from '../image/pro-1.png';
import {Swiper, SwiperSlide} from 'swiper/react';
import {Pagination} from 'swiper/modules';

export function BestSeller() {
  return (
    <section className="new_product">
      <div className="container">
        <div className="spacer">
          <div className="section_title">
            <h2>Best Selling of The Year 2022</h2>
          </div>

          <div className="stamp">
            <img src={Stam2} alt="" />
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
              <div className=" main_product">
                <SwiperSlide>
                  <div className="product_item">
                    <div className="product_img">
                      <div className="product_img_wrap">
                        <img
                          src={Pro2}
                          alt="best-sell"
                          height="450px"
                          width="340px"
                        />
                      </div>
                    </div>
                    <div className="product_content">
                      <p>CBD+CBG OIL 20%</p>
                      <h4>Full Moon Oil Cbd 20</h4>
                      <div className="product_price flex">
                        <h5>$19.00</h5>
                        <s>$24.00</s>
                        <span>20% off</span>
                      </div>
                    </div>
                  </div>
                </SwiperSlide>
                <SwiperSlide>
                  <div className="product_item">
                    <div className="product_img">
                      <div className="product_img_wrap">
                        <img
                          src={Pro3}
                          alt="best-sell"
                          height="450px"
                          width="340px"
                        />
                      </div>
                    </div>
                    <div className="product_content">
                      <p>CBD+CBG OIL 20%</p>
                      <h4>Full Moon Oil Cbd 20</h4>
                      <div className="product_price flex">
                        <h5>$19.00</h5>
                        <s>$24.00</s>
                        <span>20% off</span>
                      </div>
                    </div>
                  </div>
                </SwiperSlide>
                <SwiperSlide>
                  <div className="product_item">
                    <div className="product_img">
                      <div className="product_img_wrap">
                        <img
                          src={Pro4}
                          alt="best-sell"
                          height="450px"
                          width="340px"
                        />
                      </div>
                    </div>
                    <div className="product_content">
                      <p>CBD+CBG OIL 20%</p>
                      <h4>Full Moon Oil Cbd 20</h4>
                      <div className="product_price flex">
                        <h5>$19.00</h5>
                        <s>$24.00</s>
                        <span>20% off</span>
                      </div>
                    </div>
                  </div>
                </SwiperSlide>
                <SwiperSlide>
                  <div className="product_item">
                    <div className="product_img">
                      <div className="product_img_wrap">
                        <img
                          src={Pro1}
                          alt="best-sell"
                          height="450px"
                          width="340px"
                        />
                      </div>
                    </div>
                    <div className="product_content">
                      <p>CBD+CBG OIL 20%</p>
                      <h4>Full Moon Oil Cbd 20</h4>
                      <div className="product_price flex">
                        <h5>$19.00</h5>
                        <s>$24.00</s>
                        <span>20% off</span>
                      </div>
                    </div>
                  </div>
                </SwiperSlide>
              </div>
            </Swiper>
          </div>
          <div className="product_btn">
            <a href="#" className="btn">
              Shop More
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
