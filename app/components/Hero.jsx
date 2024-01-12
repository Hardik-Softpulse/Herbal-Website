import React, {useState} from 'react';
import {Swiper, SwiperSlide} from 'swiper/react';
import Banner from '../image/banner-img.png';
import Banner1 from '../image/banner-vector1.png';
import Banner2 from '../image/banner-vector2.png';
import Banner3 from '../image/banner-vector3.png';
import Banner4 from '../image/banner-vector4.png';
import BannerResponsive from '../image/banner-responsive.avif';
import {Navigation, Pagination} from 'swiper/modules';

export function Hero() {

  return (
    <section className="banner_slider">
      <div className="main_banner">
        <Swiper
          modules={[Navigation, Pagination]}
          pagination={{clickable: true}}
          navigation={{clickable: true}}
          lazy={true}
          id="banner_slider"
        >
          <SwiperSlide loading="lazy">
            <div className="banner_img">
              <img src={Banner} alt="" loading="lazy" />
            </div>
            <div className="banner_responsive">
              <img src={BannerResponsive} alt="" loading="lazy" />
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
          <SwiperSlide loading="lazy">
            <div className="banner_img">
              <img src={Banner} alt="" loading="lazy" />
            </div>
            <div className="banner_responsive">
              <img src={BannerResponsive} alt="" loading="lazy" />
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
          <SwiperSlide loading="lazy">
            <div className="banner_img">
              <img src={Banner} alt="" loading="lazy" />
            </div>
            <div className="banner_responsive">
              <img src={BannerResponsive} alt="" loading="lazy" />
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
    </section>
  );
}
