import React, {useEffect, useState} from 'react';
import {Swiper, SwiperSlide} from 'swiper/react';
import BannerResponsive from '../image/banner-responsive.avif';
import {Navigation, Pagination} from 'swiper/modules';

export function Hero({data}) {
  const [contentLoaded, setContentLoaded] = useState(false);
  const {block_order, blocks, settings} = data;

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
            // loadMinimal={true}
            // loadMinimalSize={1}
            // loadMinimalLoader={() => <span className="loader"></span>}
            id="banner_slider"
          >
            {block_order.map((blockId) => {
              const {settings} = blocks[blockId];
              return (
                <SwiperSlide key={blockId}>
                  <div className="banner_img">
                    <img src={settings.image} alt="banner_img" />
                  </div>
                  <div className="banner_responsive">
                    <img src={settings.image} alt="banner_responsive" />
                  </div>
                  <div className="container">
                    <div className="main_banner_contant flex justify_end">
                      <div className="banner_contant">
                        <h4>{settings.subheading}</h4>
                        <h1>{settings.heading}</h1>
                        <a href="/collections/new-arrival" className="btn">
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
