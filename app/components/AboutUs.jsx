import React, {useState} from 'react';
import aboutPage from '../json/about.json';
import {Swiper, SwiperSlide} from 'swiper/react';
import {Navigation} from 'swiper/modules';

export function AboutUs({title}) {
  const [data, setData] = useState(aboutPage);
  const {
    main,
    image_banner_XYcMUF,
    rich_text_RnpWhB,
    multirow_Ye8Fxb,
    multicolumn_G33tGJ,
  } = data.sections;

  return (
    <main className="abt_sec">
      <div className="section_title">
        <h2>{title}</h2>
      </div>

      <div className="main_banner_about">
        <div className="banner_img_about">
          <img src={image_banner_XYcMUF.settings.image} alt="" />
        </div>

        <div className="banner_contant_about">
          <h1
            dangerouslySetInnerHTML={{
              __html:
                image_banner_XYcMUF.blocks.heading_h8Mm97.settings.heading,
            }}
          />
          <h4>{image_banner_XYcMUF.blocks.text_djVYq7.settings.text}</h4>
        </div>
      </div>
      <div className="rich_text">
        <h1>{rich_text_RnpWhB.blocks.heading_eRBG6M.settings.heading}</h1>
        <p
          dangerouslySetInnerHTML={{
            __html: rich_text_RnpWhB.blocks.text_weTU76.settings.text,
          }}
        />
      </div>
      <section className="collage">
        <div className="container">
          <div className="spacer">
            <div className="main_highlight_sec flex align_center">
              <div className="left_highlight_sec">
                <h6>{multirow_Ye8Fxb.blocks.row_AyqK9J.settings.heading}</h6>
                <div className="highlight_sec_point">
                  <p
                    dangerouslySetInnerHTML={{
                      __html: multirow_Ye8Fxb.blocks.row_AyqK9J.settings.text,
                    }}
                  ></p>
                </div>
              </div>
              <div className="right_highlight_img">
                <img
                  src={multirow_Ye8Fxb.blocks.row_AyqK9J.settings.image}
                  alt="highlight"
                  height="700px"
                  width="700px"
                />
              </div>
            </div>
            <div className="main_highlight_sec2 flex align_center">
              <div className="left_highlight_sec">
                <h6>{multirow_Ye8Fxb.blocks.row_UKQg8g.settings.heading}</h6>
                <div className="highlight_sec_point">
                  <p
                    dangerouslySetInnerHTML={{
                      __html: multirow_Ye8Fxb.blocks.row_UKQg8g.settings.text,
                    }}
                  ></p>
                </div>
              </div>
              <div className="right_highlight_img">
                <img
                  src={multirow_Ye8Fxb.blocks.row_UKQg8g.settings.image}
                  alt="highlight"
                  height="700px"
                  width="700px"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
      <div>
        <div className="section_title">
          <h2>{multicolumn_G33tGJ.settings.title}</h2>
        </div>
        <div className="brands_values">
          <Swiper
            modules={[Navigation]}
            navigation={{clickable: true}}
            breakpoints={{
              200: {
                slidesPerView: 2,
                spaceBetween: 20,
              },
              511: {
                slidesPerView: 3,
                spaceBetween: 20,
              },
              767: {
                slidesPerView: 4,
                spaceBetween: 20,
              },
            }}
          >
            <SwiperSlide>
              <div className="brand-image">
                <img
                  src={multicolumn_G33tGJ.blocks.column_NgMYYW.settings.image}
                  alt="Brands-Image"
                />
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="brand-image">
                <img
                  src={multicolumn_G33tGJ.blocks.column_XCJrDG.settings.image}
                  alt="Brands-Image"
                />
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="brand-image">
                <img
                  src={multicolumn_G33tGJ.blocks.column_ry9CW6.settings.image}
                  alt="Brands-Image"
                />
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="brand-image">
                <img
                  src={multicolumn_G33tGJ.blocks.column_tfpU77.settings.image}
                  alt="Brands-Image"
                />
              </div>
            </SwiperSlide>
          </Swiper>
        </div>
      </div>
    </main>
  );
}
