import React, {useEffect, useState} from 'react';
import {Swiper, SwiperSlide} from 'swiper/react';
import Banner1 from '../image/banner-vector1.png';
import Banner2 from '../image/banner-vector2.png';
import Banner3 from '../image/banner-vector3.png';
import Banner4 from '../image/banner-vector4.png';
import BannerResponsive from '../image/banner-responsive.avif';
import {Navigation, Pagination} from 'swiper/modules';

export function Hero({slide}) {
  const [contentLoaded, setContentLoaded] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setContentLoaded(true);
    }, 1000);

    return () => clearTimeout(timeout);
  }, []);

  return (
    <section className="banner_slider">
      <div className="main_banner">
        {contentLoaded ? (
          <Swiper
            modules={[Navigation, Pagination]}
            pagination={{clickable: true}}
            navigation={{clickable: true}}
            loadMinimal={true}
            loadMinimalSize={1}
            loadMinimalLoader={() => <span className="loader"></span>}
            id="banner_slider"
          >
            {Object.values(slide?.blocks)?.map((slides, i) => {
              return (
                <SwiperSlide key={`slide-${i}`}>
                  <div className="banner_img">
                    <img src={slides.settings.image} alt="" />
                  </div>
                  <div className="banner_responsive">
                    <img src={BannerResponsive} alt="" />
                  </div>
                  <div className="container">
                    <div className="main_banner_contant flex justify_end">
                      <div className="banner_contant">
                        <h4>{slides.settings.subheading}</h4>
                        <h1>{slides.settings.heading}</h1>
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
                        <a href={slide.settings.link} className="btn">
                          Shop Now
                        </a>
                      </div>
                    </div>
                  </div>
                </SwiperSlide>
              );
            })}
          </Swiper>
        ) : (
          <span className="loader"></span>
        )}
      </div>
    </section>
  );
}
