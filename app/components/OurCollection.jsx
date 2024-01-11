import Support1 from '../image/support-1.png';
import Support7 from '../image/support-7.png';
import Support6 from '../image/support-6.png';
import Support5 from '../image/support-5.png';
import Support4 from '../image/support-4.png';
import Support3 from '../image/support-3.png';
import Support2 from '../image/support-2.png';
import {Swiper, SwiperSlide} from 'swiper/react';
import {Navigation} from 'swiper/modules';

export function OurCollection() {
  return (
    <section>
      <div className="container">
        <div className="spacer">
          <div className="section_title">
            <h2>Shop By Interest</h2>
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
                  slidesPerView: 6,
                  spaceBetween: 20,
                },
                1300: {
                  slidesPerView: 7,
                  spaceBetween: 20,
                },
              }}
            >
              <SwiperSlide>
                <div className="interest_content">
                  <div className="interest_img">
                    <a href="">
                      <img src={Support1} alt="" />
                    </a>
                  </div>
                  <a href="">Immune Support</a>
                </div>
              </SwiperSlide>
              <SwiperSlide>
                <div className="interest_content">
                  <div className="interest_img">
                    <a href="">
                      <img src={Support7} alt="" />
                    </a>
                  </div>
                  <a href="">Immune Support</a>
                </div>
              </SwiperSlide>
              <SwiperSlide>
                <div className="interest_content">
                  <div className="interest_img">
                    <a href="">
                      <img src={Support6} alt="" />
                    </a>
                  </div>
                  <a href="">Immune Support</a>
                </div>
              </SwiperSlide>
              <SwiperSlide>
                <div className="interest_content">
                  <div className="interest_img">
                    <a href="">
                      <img src={Support5} alt="" />
                    </a>
                  </div>
                  <a href="">Immune Support</a>
                </div>
              </SwiperSlide>
              <SwiperSlide>
                <div className="interest_content">
                  <div className="interest_img">
                    <a href="">
                      <img src={Support4} alt="" />
                    </a>
                  </div>
                  <a href="">Immune Support</a>
                </div>
              </SwiperSlide>
              <SwiperSlide>
                <div className="interest_content">
                  <div className="interest_img">
                    <a href="">
                      <img src={Support3} alt="" />
                    </a>
                  </div>
                  <a href="">Immune Support</a>
                </div>
              </SwiperSlide>
              <SwiperSlide>
                <div className="interest_content">
                  <div className="interest_img">
                    <a href="">
                      <img src={Support2} alt="" />
                    </a>
                  </div>
                  <a href="">Immune Support</a>
                </div>
              </SwiperSlide>
              <SwiperSlide>
                <div className="interest_content">
                  <div className="interest_img">
                    <a href="">
                      <img src={Support1} alt="" />
                    </a>
                  </div>
                  <a href="">Immune Support</a>
                </div>
              </SwiperSlide>
              <SwiperSlide>
                <div className="interest_content">
                  <div className="interest_img">
                    <a href="">
                      <img src={Support5} alt="" />
                    </a>
                  </div>
                  <a href="">Immune Support</a>
                </div>
              </SwiperSlide>
            </Swiper>
          </div>
        </div>
      </div>
    </section>
  );
}
