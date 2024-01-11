import React from 'react';
import {Swiper, SwiperSlide} from 'swiper/react';
import Banner from '../image/banner-img.png'
import Banner1 from '../image/banner-vector1.png'
import Banner2 from '../image/banner-vector2.png'
import Banner3 from '../image/banner-vector3.png'
import Banner4 from '../image/banner-vector4.png'
import BannerResponsive from '../image/banner-responsive.avif'
import { Navigation, Pagination } from 'swiper/modules';

export function Hero() {
  return (
    <section className="banner_slider">
      <div className="main_banner">
        <div id="banner_slider">
          <Swiper modules={[Navigation , Pagination]} pagination={{clickable: true}} navigation>
            <SwiperSlide>
              <div className="banner_img">
                <img src={Banner} alt="" />
              </div>
              <div className="banner_responsive">
                <img src={BannerResponsive} alt="" />
              </div>
              <div className="container">
                <div className="main_banner_contant flex justify_end">
                  <div className="banner_contant">
                    <h4>Herbs that help you</h4>
                    <h1>Live longer and healthy on planet Earth</h1>
                    <div className="banner_vector_contant flex">
                      <div className="banner_vector">
                        <img src={Banner1} alt="" />
                        <p>Handmade</p>
                      </div>
                      <div className="banner_vector">
                        <img src={Banner2} alt="" />
                        <p>Handmade</p>
                      </div>
                      <div className="banner_vector">
                        <img src={Banner3} alt="" />
                        <p>Handmade</p>
                      </div>
                      <div className="banner_vector">
                        <img src={Banner4} alt="" />
                        <p>Handmade</p>
                      </div>
                    </div>
                    <a href="#" className="btn">
                      Shop Now
                    </a>
                  </div>
                </div>
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="banner_img">
                <img src={Banner} alt="" />
              </div>
              <div className="banner_responsive">
                <img src={BannerResponsive} alt="" />
              </div>
              <div className="container">
                <div className="main_banner_contant flex justify_end">
                  <div className="banner_contant">
                    <h4>Herbs that help you</h4>
                    <h1>Live longer and healthy on planet Earth</h1>
                    <div className="banner_vector_contant flex">
                      <div className="banner_vector">
                        <img src={Banner1} alt="" />
                        <p>Handmade</p>
                      </div>
                      <div className="banner_vector">
                        <img src={Banner2} alt="" />
                        <p>Handmade</p>
                      </div>
                      <div className="banner_vector">
                        <img src={Banner3} alt="" />
                        <p>Handmade</p>
                      </div>
                      <div className="banner_vector">
                        <img src={Banner4} alt="" />
                        <p>Handmade</p>
                      </div>
                    </div>
                    <a href="#" className="btn">
                      Shop Now
                    </a>
                  </div>
                </div>
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="banner_img">
                <img src={Banner} alt="" />
              </div>
              <div className="banner_responsive">
                <img src={BannerResponsive} alt="" />
              </div>
              <div className="container">
                <div className="main_banner_contant flex justify_end">
                  <div className="banner_contant">
                    <h4>Herbs that help you</h4>
                    <h1>Live longer and healthy on planet Earth</h1>
                    <div className="banner_vector_contant flex">
                      <div className="banner_vector">
                        <img src={Banner1} alt="" />
                        <p>Handmade</p>
                      </div>
                      <div className="banner_vector">
                        <img src={Banner2} alt="" />
                        <p>Handmade</p>
                      </div>
                      <div className="banner_vector">
                        <img src={Banner3} alt="" />
                        <p>Handmade</p>
                      </div>
                      <div className="banner_vector">
                        <img src={Banner4} alt="" />
                        <p>Handmade</p>
                      </div>
                    </div>
                    <a href="#" className="btn">
                      Shop Now
                    </a>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          </Swiper>
        </div>
      </div>
    </section>
  );
}

