import React from 'react';
import {Swiper, SwiperSlide} from 'swiper/react';
import {Navigation, Pagination, Thumbs} from 'swiper/modules';
import ProDetail from '../image/pro-detail.png';
import Image1 from '../image/1.webp';
import Image2 from '../image/2.webp';
import Image3 from '../image/3.webp';
import Image4 from '../image/4.webp';
import Image5 from '../image/5.webp';
import Image6 from '../image/6.jpg';
import HalfStar from '../image/half-star.png';
import Pro1 from '../image/pro-1.png';
import Pro2 from '../image/pro-2.png';
import Pro3 from '../image/pro-3.png';
import Pro4 from '../image/pro-4.png';
import Clean from '../image/clean.png';
import Clean1 from '../image/clean1.png';
import Clean2 from '../image/clean2.png';
import Clean3 from '../image/clean3.png';
import Clean4 from '../image/clean4.png';
import Edit from '../image/edit.svg';
import Highlight from '../image/highlight.png';
import Highlight2 from '../image/highlight2.png';
import ThumbsUp from '../image/thumbs-up.png';
import ThumbsDown from '../image/thumbs-down.png';
import Pro2 from '../image/pro2.png';
import Pro1 from '../image/pro1.png';
import Pro3 from '../image/pro3.png';
import Pro4 from '../image/pro4.png';

function Product() {
  return (
    <main class="abt_sec">
      <section>
        <div className="container">
          <div className="spacer">
            <div className="main_product_detail flex align_center">
              <div className="left_product_detail">
                <div className="left_pro_detail_slider">
                  <div thumbsSlider="" id="product_detail_thumb">
                    <Swiper
                      modules={[Navigation]}
                      loop={true}
                      direction="vertical"
                      spaceBetween={10}
                      slidesPerView={4}
                      slideToClickedSlide={true}
                      breakpoints={{
                        100: {
                          slidesPerView: 4,
                          spaceBetween: 10,
                          direction: 'horizontal',
                        },
                        767: {
                          slidesPerView: 4,
                          spaceBetween: 10,
                          direction: 'horizontal',
                        },
                        768: {
                          slidesPerView: 4,
                          spaceBetween: 10,
                          direction: 'vertical',
                        },
                      }}
                    >
                      <SwiperSlide>
                        <div className="pro_thumb_detail_img">
                          <img
                            src={ProDetail}
                            alt="pro-detail"
                            height="120px"
                            width="120px"
                          />
                        </div>
                      </SwiperSlide>
                      <SwiperSlide>
                        <div className="pro_thumb_detail_img">
                          <img
                            src={Image1}
                            alt="pro-detail"
                            height="120px"
                            width="120px"
                          />
                        </div>
                      </SwiperSlide>
                      <SwiperSlide>
                        <div className="pro_thumb_detail_img">
                          <img
                            src={Image2}
                            alt="pro-detail"
                            height="120px"
                            width="120px"
                          />
                        </div>
                      </SwiperSlide>
                      <SwiperSlide>
                        <div className="pro_thumb_detail_img">
                          <img
                            src={Image3}
                            alt="pro-detail"
                            height="120px"
                            width="120px"
                          />
                        </div>
                      </SwiperSlide>
                      <SwiperSlide>
                        <div className="pro_thumb_detail_img">
                          <img
                            src={Image4}
                            alt="pro-detail"
                            height="120px"
                            width="120px"
                          />
                        </div>
                      </SwiperSlide>
                      <SwiperSlide>
                        <div className="pro_thumb_detail_img">
                          <img
                            src={Image5}
                            alt="pro-detail"
                            height="120px"
                            width="120px"
                          />
                        </div>
                      </SwiperSlide>
                      <SwiperSlide>
                        <div className="pro_thumb_detail_img">
                          <img
                            src={Image6}
                            alt="pro-detail"
                            height="120px"
                            width="120px"
                          />
                        </div>
                      </SwiperSlide>
                    </Swiper>
                  </div>
                </div>

                <div id="product_detail">
                  <Swiper
                    loop={true}
                    spaceBetween={10}
                    slidesPerView={1}
                    effect="fade"
                    loopedSlides={50}
                    // thumbs={{swiper: swiper}}
                  >
                    <SwiperSlide>
                      <div className="pro_detail_img">
                        <img
                          src={ProDetail}
                          alt="product-detail"
                          height="570px"
                          width="570px"
                        />
                      </div>
                    </SwiperSlide>
                    <SwiperSlide>
                      <div className="pro_detail_img">
                        <img
                          src={Image1}
                          alt="product-detail"
                          height="570px"
                          width="570px"
                        />
                      </div>
                    </SwiperSlide>
                    <SwiperSlide>
                      <div className="pro_detail_img">
                        <img
                          src={Image2}
                          alt="product-detail"
                          height="570px"
                          width="570px"
                        />
                      </div>
                    </SwiperSlide>
                    <SwiperSlide>
                      <div className="pro_detail_img">
                        <img
                          src={Image3}
                          alt="product-detail"
                          height="570px"
                          width="570px"
                        />
                      </div>
                    </SwiperSlide>
                    <SwiperSlide>
                      <div className="pro_detail_img">
                        <img
                          src={Image4}
                          alt="product-detail"
                          height="570px"
                          width="570px"
                        />
                      </div>
                    </SwiperSlide>
                    <SwiperSlide>
                      <div className="pro_detail_img">
                        <img
                          src={Image5}
                          alt="product-detail"
                          height="570px"
                          width="570px"
                        />
                      </div>
                    </SwiperSlide>
                    <SwiperSlide>
                      <div className="pro_detail_img">
                        <img
                          src={Image6}
                          alt="product-detail"
                          height="570px"
                          width="570px"
                        />
                      </div>
                    </SwiperSlide>
                  </Swiper>
                </div>
              </div>
              <div className="right_product_detail">
                <h6>CBD+CBG OIL 20%</h6>
                <h2>Full Moon Oil Cbd 20</h2>
                <div className="pro_detail_star flex align_center">
                  <img src="image/1star.png" alt="" />
                  <span>50 Reviews</span>
                </div>
                <div className="pro_detail_price flex align_center">
                  <h3>$14.99</h3>
                  <s>$19.99</s>
                </div>
                <div className="pro_detail_P">
                  <p>Formulated to help soothe occasional dry coughs*</p>
                </div>
                <div className="pro_detail_size flex align_center">
                  <h5>SIZE:</h5>
                  <h4>4 OZ</h4>
                  <p>12-day supply</p>
                </div>
                <div className="pro_detail_add_cart flex align_center">
                  <div className="num-block skin-2">
                    <div className="num-in">
                      <span className="minus dis"></span>
                      <input
                        type="text"
                        className="in-num"
                        value="1"
                        readonly=""
                      />
                      <span className="plus"></span>
                    </div>
                  </div>
                  <div className="add_to_cart_btn">
                    <a href="#" className="btn">
                      Add to Cart
                    </a>
                  </div>
                </div>
                <div className="pro_detail_fast_vector flex">
                  <img src="image/truck.svg" alt="" />
                  <p>Free Shipping on orders over $64</p>
                </div>
                <div className="pro_detail_highlight">
                  <h4>Highlight</h4>
                  <ul>
                    <li className="flex align_center">
                      <p>
                        Full-body wellness with six powerful, best-selling
                        supplements.*
                      </p>
                    </li>
                    <li className="flex align_center">
                      <p>
                        Perfect for the wellness warrior, supplement aficionado,
                        or herbal enthusiast.
                      </p>
                    </li>
                    <li className="flex align_center">
                      <p>
                        Full-body wellness with six powerful, best-selling
                        supplements.*
                      </p>
                    </li>
                    <li className="flex align_center">
                      <p>
                        Perfect for the wellness warrior, supplement aficionado,
                        or herbal enthusiast.
                      </p>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section>
        <div className="container">
          <div className="spacer">
            <div className="section_title">
              <h2>Clean, Pure & Certified</h2>
            </div>
            <div className="main_clean flex justify_center">
              <div className="clean">
                <div className="clean_img">
                  <img src={Clean} alt="" />
                </div>
                <p>Holistic wellness</p>
              </div>
              <div className="clean">
                <div className="clean_img">
                  <img src={Clean1} alt="" />
                </div>
                <p>100% Natural</p>
              </div>
              <div className="clean">
                <div className="clean_img">
                  <img src={Clean2} alt="" />
                </div>
                <p>Healthy Sleep</p>
              </div>
              <div className="clean">
                <div className="clean_img">
                  <img src={Clean3} alt="" />
                </div>
                <p>Everyday Energy</p>
              </div>
              <div className="clean">
                <div className="clean_img">
                  <img src={Clean4} alt="" />
                </div>
                <p>Everyday Healthy</p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section>
        <div className="container">
          <div className="spacer">
            <div className="main_highlight_sec flex align_center">
              <div className="left_highlight_sec">
                <h5>HIGHLIGHT</h5>
                <h6>
                  Soothe occasional dry coughs and helps you get the rest you
                  need to feel better tomorrow*
                </h6>
                <div className="highlight_sec_point">
                  <h3>Helps relieve occasional coughs*</h3>
                  <p>
                    Formulated with high-quality honey, South African Geranium,
                    Black Elderberry, and Ivy Leaf to soothe an occasional cough
                    when you’re feeling under the weather*
                  </p>
                </div>
                <div className="highlight_sec_point">
                  <h3>Melatonin-free sleep support*</h3>
                  <p>
                    Passionflower provides an herbal alternative to melatonin
                    for a good night’s sleep so you can rest up for a new day*
                  </p>
                </div>
                <div className="highlight_sec_point">
                  <h3>Plant-powered relief</h3>
                  <p>
                    Also formulated with premium grade organic Eucalyptus and
                    Peppermint essential oils to soothe your senses
                  </p>
                </div>
              </div>
              <div className="right_highlight_img">
                <img
                  src={Highlight}
                  alt="highlight"
                  height="700px"
                  width="700px"
                />
              </div>
            </div>
            <div className="main_highlight_sec2 flex align_center">
              <div className="left_highlight_sec">
                <h5>HIGHLIGHT</h5>
                <h6>
                  Soothe occasional dry coughs and helps you get the rest you
                  need to feel better tomorrow*
                </h6>
                <div className="highlight_sec_point">
                  <h3>Helps relieve occasional coughs*</h3>
                  <p>
                    Formulated with high-quality honey, South African Geranium,
                    Black Elderberry, and Ivy Leaf to soothe an occasional cough
                    when you’re feeling under the weather*
                  </p>
                </div>
                <div className="highlight_sec_point">
                  <h3>Melatonin-free sleep support*</h3>
                  <p>
                    Passionflower provides an herbal alternative to melatonin
                    for a good night’s sleep so you can rest up for a new day*
                  </p>
                </div>
                <div className="highlight_sec_point">
                  <h3>Plant-powered relief</h3>
                  <p>
                    Also formulated with premium grade organic Eucalyptus and
                    Peppermint essential oils to soothe your senses
                  </p>
                </div>
              </div>
              <div className="right_highlight_img">
                <img
                  src={Highlight2}
                  alt="highlight"
                  height="700px"
                  width="700px"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="pro_detail_review">
        <div className="container">
          <div className="spacer">
            <div className="section_title">
              <div className="title_star flex align_center justify_center">
                <img src={HalfStar} alt="" />
                <span>(1617 Ratings)</span>
              </div>
              <h2>Real Reviews From Real Customers</h2>
            </div>
            <div className="main_pro_detail_review">
              <div className="detail_sort_by flex align_center justify_end">
                <div className="write_review">
                  <span>
                    <img src={Edit} alt="" />
                    Write a Review
                  </span>
                </div>
                <select name="" id="">
                  <option value="">Sort By</option>
                </select>
              </div>

              <div className="pro_detail_review_slider">
                <div id="review_slider">
                  <Swiper
                    modules={[Navigation, Pagination]}
                    pagination={{clickable: 'true'}}
                  >
                    <SwiperSlide>
                      <div className="review_pro">
                        <div className="review_head flex align_center justify_between">
                          <div className="review_head_name flex align_center">
                            <div className="pro_detail_dp">
                              <h3>E</h3>
                              <div className="pro_detail_dp_check">
                                <svg
                                  width="9"
                                  height="9"
                                  viewBox="0 0 9 9"
                                  fill="none"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path
                                    d="M7.5 2.25L3.375 6.375L1.5 4.5"
                                    stroke="#1C6758"
                                    stroke-width="1.5"
                                    stroke-linecap="round"
                                    strokeLinejoin="round"
                                  />
                                </svg>
                              </div>
                            </div>
                            <div className="name">
                              <h6>ELLIOTT</h6>
                              <img src={HalfStar} alt="" />
                            </div>
                          </div>
                          <div className="review_date">
                            <p>6/6/2022</p>
                          </div>
                        </div>
                        <div className="review_content flex justify_between">
                          <div className="review_content_head">
                            <h5>neat</h5>
                            <p>
                              Lorem ipsum dolor sit amet, consectetur adipiscing
                              elit, sed do eiusmod tempor incididunt ut labore
                              et dolore magna aliqua. Ut enim ad minim veniam,
                              quis nostrud exercitation ullamco laboris nisi ut
                              aliquip ex ea commodo consequat.
                            </p>
                          </div>
                          <div className="revie_like flex align_center">
                            <h6>Was This Review Helpful?</h6>
                            <div className="like flex align_center">
                              <img src={ThumbsUp} alt="" />
                              <p>15</p>
                            </div>
                            <div className="like flex align_center">
                              <img src={ThumbsDown} alt="" />
                              <p>00</p>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="review_pro">
                        <div className="review_head flex align_center justify_between">
                          <div className="review_head_name flex align_center">
                            <div className="pro_detail_dp">
                              <h3>E</h3>
                            </div>
                            <div className="name">
                              <h6>ELLIOTT</h6>
                              <img src={HalfStar} alt="" />
                            </div>
                          </div>
                          <div className="review_date">
                            <p>6/6/2022</p>
                          </div>
                        </div>
                        <div className="review_content flex justify_between">
                          <div className="review_content_head">
                            <h5>neat</h5>
                            <p>
                              Lorem ipsum dolor sit amet, consectetur adipiscing
                              elit, sed do eiusmod tempor incididunt ut labore
                              et dolore magna aliqua. Ut enim ad minim veniam,
                              quis nostrud exercitation ullamco laboris nisi ut
                              aliquip ex ea commodo consequat.
                            </p>
                          </div>
                          <div className="revie_like flex align_center">
                            <h6>Was This Review Helpful?</h6>
                            <div className="like flex align_center">
                              <img src={ThumbsUp} alt="" />
                              <p>15</p>
                            </div>
                            <div className="like flex align_center">
                              <img src={ThumbsDown} alt="" />
                              <p>00</p>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="review_pro">
                        <div className="review_head flex align_center justify_between">
                          <div className="review_head_name flex align_center">
                            <div className="pro_detail_dp">
                              <h3>E</h3>
                            </div>
                            <div className="name">
                              <h6>ELLIOTT</h6>
                              <img src={HalfStar} alt="" />
                            </div>
                          </div>
                          <div className="review_date">
                            <p>6/6/2022</p>
                          </div>
                        </div>
                        <div className="review_content flex justify_between">
                          <div className="review_content_head">
                            <h5>neat</h5>
                            <p>
                              Lorem ipsum dolor sit amet, consectetur adipiscing
                              elit, sed do eiusmod tempor incididunt ut labore
                              et dolore magna aliqua. Ut enim ad minim veniam,
                              quis nostrud exercitation ullamco laboris nisi ut
                              aliquip ex ea commodo consequat.
                            </p>
                          </div>
                          <div className="revie_like flex align_center">
                            <h6>Was This Review Helpful?</h6>
                            <div className="like flex align_center">
                              <img src={ThumbsUp} alt="" />
                              <p>15</p>
                            </div>
                            <div className="like flex align_center">
                              <img src={ThumbsDown} alt="" />
                              <p>00</p>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="review_pro">
                        <div className="review_head flex align_center justify_between">
                          <div className="review_head_name flex align_center">
                            <div className="pro_detail_dp">
                              <h3>E</h3>
                              <div className="pro_detail_dp_check">
                                <svg
                                  width="9"
                                  height="9"
                                  viewBox="0 0 9 9"
                                  fill="none"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path
                                    d="M7.5 2.25L3.375 6.375L1.5 4.5"
                                    stroke="#1C6758"
                                    stroke-width="1.5"
                                    stroke-linecap="round"
                                    strokeLinejoin="round"
                                  />
                                </svg>
                              </div>
                            </div>
                            <div className="name">
                              <h6>ELLIOTT</h6>
                              <img src={HalfStar} alt="" />
                            </div>
                          </div>
                          <div className="review_date">
                            <p>6/6/2022</p>
                          </div>
                        </div>
                        <div className="review_content flex justify_between">
                          <div className="review_content_head">
                            <h5>neat</h5>
                            <p>
                              Lorem ipsum dolor sit amet, consectetur adipiscing
                              elit, sed do eiusmod tempor incididunt ut labore
                              et dolore magna aliqua. Ut enim ad minim veniam,
                              quis nostrud exercitation ullamco laboris nisi ut
                              aliquip ex ea commodo consequat.
                            </p>
                          </div>
                          <div className="revie_like flex align_center">
                            <h6>Was This Review Helpful?</h6>
                            <div className="like flex align_center">
                              <img src={ThumbsUp} alt="" />
                              <p>15</p>
                            </div>
                            <div className="like flex align_center">
                              <img src={ThumbsDown} alt="" />
                              <p>00</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </SwiperSlide>
                    <SwiperSlide>
                      <div className="review_pro">
                        <div className="review_head flex align_center justify_between">
                          <div className="review_head_name flex align_center">
                            <div className="pro_detail_dp">
                              <h3>E</h3>
                              <div className="pro_detail_dp_check">
                                <svg
                                  width="9"
                                  height="9"
                                  viewBox="0 0 9 9"
                                  fill="none"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path
                                    d="M7.5 2.25L3.375 6.375L1.5 4.5"
                                    stroke="#1C6758"
                                    stroke-width="1.5"
                                    stroke-linecap="round"
                                    strokeLinejoin="round"
                                  />
                                </svg>
                              </div>
                            </div>
                            <div className="name">
                              <h6>ELLIOTT</h6>
                              <img src={HalfStar} alt="" />
                            </div>
                          </div>
                          <div className="review_date">
                            <p>6/6/2022</p>
                          </div>
                        </div>
                        <div className="review_content flex justify_between">
                          <div className="review_content_head">
                            <h5>neat</h5>
                            <p>
                              Lorem ipsum dolor sit amet, consectetur adipiscing
                              elit, sed do eiusmod tempor incididunt ut labore
                              et dolore magna aliqua. Ut enim ad minim veniam,
                              quis nostrud exercitation ullamco laboris nisi ut
                              aliquip ex ea commodo consequat.
                            </p>
                          </div>
                          <div className="revie_like flex align_center">
                            <h6>Was This Review Helpful?</h6>
                            <div className="like flex align_center">
                              <img src={ThumbsUp} alt="" />
                              <p>15</p>
                            </div>
                            <div className="like flex align_center">
                              <img src={ThumbsDown} alt="" />
                              <p>00</p>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="review_pro">
                        <div className="review_head flex align_center justify_between">
                          <div className="review_head_name flex align_center">
                            <div className="pro_detail_dp">
                              <h3>E</h3>
                            </div>
                            <div className="name">
                              <h6>ELLIOTT</h6>
                              <img src={HalfStar} alt="" />
                            </div>
                          </div>
                          <div className="review_date">
                            <p>6/6/2022</p>
                          </div>
                        </div>
                        <div className="review_content flex justify_between">
                          <div className="review_content_head">
                            <h5>neat</h5>
                            <p>
                              Lorem ipsum dolor sit amet, consectetur adipiscing
                              elit, sed do eiusmod tempor incididunt ut labore
                              et dolore magna aliqua. Ut enim ad minim veniam,
                              quis nostrud exercitation ullamco laboris nisi ut
                              aliquip ex ea commodo consequat.
                            </p>
                          </div>
                          <div className="revie_like flex align_center">
                            <h6>Was This Review Helpful?</h6>
                            <div className="like flex align_center">
                              <img src={ThumbsUp} alt="" />
                              <p>15</p>
                            </div>
                            <div className="like flex align_center">
                              <img src={ThumbsDown} alt="" />
                              <p>00</p>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="review_pro">
                        <div className="review_head flex align_center justify_between">
                          <div className="review_head_name flex align_center">
                            <div className="pro_detail_dp">
                              <h3>E</h3>
                            </div>
                            <div className="name">
                              <h6>ELLIOTT</h6>
                              <img src={HalfStar} alt="" />
                            </div>
                          </div>
                          <div className="review_date">
                            <p>6/6/2022</p>
                          </div>
                        </div>
                        <div className="review_content flex justify_between">
                          <div className="review_content_head">
                            <h5>neat</h5>
                            <p>
                              Lorem ipsum dolor sit amet, consectetur adipiscing
                              elit, sed do eiusmod tempor incididunt ut labore
                              et dolore magna aliqua. Ut enim ad minim veniam,
                              quis nostrud exercitation ullamco laboris nisi ut
                              aliquip ex ea commodo consequat.
                            </p>
                          </div>
                          <div className="revie_like flex align_center">
                            <h6>Was This Review Helpful?</h6>
                            <div className="like flex align_center">
                              <img src={ThumbsUp} alt="" />
                              <p>15</p>
                            </div>
                            <div className="like flex align_center">
                              <img src={ThumbsDown} alt="" />
                              <p>00</p>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="review_pro">
                        <div className="review_head flex align_center justify_between">
                          <div className="review_head_name flex align_center">
                            <div className="pro_detail_dp">
                              <h3>E</h3>
                              <div className="pro_detail_dp_check">
                                <svg
                                  width="9"
                                  height="9"
                                  viewBox="0 0 9 9"
                                  fill="none"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path
                                    d="M7.5 2.25L3.375 6.375L1.5 4.5"
                                    stroke="#1C6758"
                                    stroke-width="1.5"
                                    stroke-linecap="round"
                                    strokeLinejoin="round"
                                  />
                                </svg>
                              </div>
                            </div>
                            <div className="name">
                              <h6>ELLIOTT</h6>
                              <img src={HalfStar} alt="" />
                            </div>
                          </div>
                          <div className="review_date">
                            <p>6/6/2022</p>
                          </div>
                        </div>
                        <div className="review_content flex justify_between">
                          <div className="review_content_head">
                            <h5>neat</h5>
                            <p>
                              Lorem ipsum dolor sit amet, consectetur adipiscing
                              elit, sed do eiusmod tempor incididunt ut labore
                              et dolore magna aliqua. Ut enim ad minim veniam,
                              quis nostrud exercitation ullamco laboris nisi ut
                              aliquip ex ea commodo consequat.
                            </p>
                          </div>
                          <div className="revie_like flex align_center">
                            <h6>Was This Review Helpful?</h6>
                            <div className="like flex align_center">
                              <img src={ThumbsUp} alt="" />
                              <p>15</p>
                            </div>
                            <div className="like flex align_center">
                              <img src={ThumbsDown} alt="" />
                              <p>00</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </SwiperSlide>
                    <SwiperSlide>
                      <div className="review_pro">
                        <div className="review_head flex align_center justify_between">
                          <div className="review_head_name flex align_center">
                            <div className="pro_detail_dp">
                              <h3>E</h3>
                              <div className="pro_detail_dp_check">
                                <svg
                                  width="9"
                                  height="9"
                                  viewBox="0 0 9 9"
                                  fill="none"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path
                                    d="M7.5 2.25L3.375 6.375L1.5 4.5"
                                    stroke="#1C6758"
                                    stroke-width="1.5"
                                    stroke-linecap="round"
                                    strokeLinejoin="round"
                                  />
                                </svg>
                              </div>
                            </div>
                            <div className="name">
                              <h6>ELLIOTT</h6>
                              <img src={HalfStar} alt="" />
                            </div>
                          </div>
                          <div className="review_date">
                            <p>6/6/2022</p>
                          </div>
                        </div>
                        <div className="review_content flex justify_between">
                          <div className="review_content_head">
                            <h5>neat</h5>
                            <p>
                              Lorem ipsum dolor sit amet, consectetur adipiscing
                              elit, sed do eiusmod tempor incididunt ut labore
                              et dolore magna aliqua. Ut enim ad minim veniam,
                              quis nostrud exercitation ullamco laboris nisi ut
                              aliquip ex ea commodo consequat.
                            </p>
                          </div>
                          <div className="revie_like flex align_center">
                            <h6>Was This Review Helpful?</h6>
                            <div className="like flex align_center">
                              <img src={ThumbsUp} alt="" />
                              <p>15</p>
                            </div>
                            <div className="like flex align_center">
                              <img src={ThumbsDown} alt="" />
                              <p>00</p>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="review_pro">
                        <div className="review_head flex align_center justify_between">
                          <div className="review_head_name flex align_center">
                            <div className="pro_detail_dp">
                              <h3>E</h3>
                            </div>
                            <div className="name">
                              <h6>ELLIOTT</h6>
                              <img src={HalfStar} alt="" />
                            </div>
                          </div>
                          <div className="review_date">
                            <p>6/6/2022</p>
                          </div>
                        </div>
                        <div className="review_content flex justify_between">
                          <div className="review_content_head">
                            <h5>neat</h5>
                            <p>
                              Lorem ipsum dolor sit amet, consectetur adipiscing
                              elit, sed do eiusmod tempor incididunt ut labore
                              et dolore magna aliqua. Ut enim ad minim veniam,
                              quis nostrud exercitation ullamco laboris nisi ut
                              aliquip ex ea commodo consequat.
                            </p>
                          </div>
                          <div className="revie_like flex align_center">
                            <h6>Was This Review Helpful?</h6>
                            <div className="like flex align_center">
                              <img src={ThumbsUp} alt="" />
                              <p>15</p>
                            </div>
                            <div className="like flex align_center">
                              <img src={ThumbsDown} alt="" />
                              <p>00</p>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="review_pro">
                        <div className="review_head flex align_center justify_between">
                          <div className="review_head_name flex align_center">
                            <div className="pro_detail_dp">
                              <h3>E</h3>
                            </div>
                            <div className="name">
                              <h6>ELLIOTT</h6>
                              <img src={HalfStar} alt="" />
                            </div>
                          </div>
                          <div className="review_date">
                            <p>6/6/2022</p>
                          </div>
                        </div>
                        <div className="review_content flex justify_between">
                          <div className="review_content_head">
                            <h5>neat</h5>
                            <p>
                              Lorem ipsum dolor sit amet, consectetur adipiscing
                              elit, sed do eiusmod tempor incididunt ut labore
                              et dolore magna aliqua. Ut enim ad minim veniam,
                              quis nostrud exercitation ullamco laboris nisi ut
                              aliquip ex ea commodo consequat.
                            </p>
                          </div>
                          <div className="revie_like flex align_center">
                            <h6>Was This Review Helpful?</h6>
                            <div className="like flex align_center">
                              <img src={ThumbsUp} alt="" />
                              <p>15</p>
                            </div>
                            <div className="like flex align_center">
                              <img src={ThumbsDown} alt="" />
                              <p>00</p>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="review_pro">
                        <div className="review_head flex align_center justify_between">
                          <div className="review_head_name flex align_center">
                            <div className="pro_detail_dp">
                              <h3>E</h3>
                              <div className="pro_detail_dp_check">
                                <svg
                                  width="9"
                                  height="9"
                                  viewBox="0 0 9 9"
                                  fill="none"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path
                                    d="M7.5 2.25L3.375 6.375L1.5 4.5"
                                    stroke="#1C6758"
                                    stroke-width="1.5"
                                    stroke-linecap="round"
                                    strokeLinejoin="round"
                                  />
                                </svg>
                              </div>
                            </div>
                            <div className="name">
                              <h6>ELLIOTT</h6>
                              <img src={HalfStar} alt="" />
                            </div>
                          </div>
                          <div className="review_date">
                            <p>6/6/2022</p>
                          </div>
                        </div>
                        <div className="review_content flex justify_between">
                          <div className="review_content_head">
                            <h5>neat</h5>
                            <p>
                              Lorem ipsum dolor sit amet, consectetur adipiscing
                              elit, sed do eiusmod tempor incididunt ut labore
                              et dolore magna aliqua. Ut enim ad minim veniam,
                              quis nostrud exercitation ullamco laboris nisi ut
                              aliquip ex ea commodo consequat.
                            </p>
                          </div>
                          <div className="revie_like flex align_center">
                            <h6>Was This Review Helpful?</h6>
                            <div className="like flex align_center">
                              <img src={ThumbsUp} alt="" />
                              <p>15</p>
                            </div>
                            <div className="like flex align_center">
                              <img src={ThumbsDown} alt="" />
                              <p>00</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </SwiperSlide>
                    <SwiperSlide>
                      <div className="review_pro">
                        <div className="review_head flex align_center justify_between">
                          <div className="review_head_name flex align_center">
                            <div className="pro_detail_dp">
                              <h3>E</h3>
                              <div className="pro_detail_dp_check">
                                <svg
                                  width="9"
                                  height="9"
                                  viewBox="0 0 9 9"
                                  fill="none"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path
                                    d="M7.5 2.25L3.375 6.375L1.5 4.5"
                                    stroke="#1C6758"
                                    stroke-width="1.5"
                                    stroke-linecap="round"
                                    strokeLinejoin="round"
                                  />
                                </svg>
                              </div>
                            </div>
                            <div className="name">
                              <h6>ELLIOTT</h6>
                              <img src={HalfStar} alt="" />
                            </div>
                          </div>
                          <div className="review_date">
                            <p>6/6/2022</p>
                          </div>
                        </div>
                        <div className="review_content flex justify_between">
                          <div className="review_content_head">
                            <h5>neat</h5>
                            <p>
                              Lorem ipsum dolor sit amet, consectetur adipiscing
                              elit, sed do eiusmod tempor incididunt ut labore
                              et dolore magna aliqua. Ut enim ad minim veniam,
                              quis nostrud exercitation ullamco laboris nisi ut
                              aliquip ex ea commodo consequat.
                            </p>
                          </div>
                          <div className="revie_like flex align_center">
                            <h6>Was This Review Helpful?</h6>
                            <div className="like flex align_center">
                              <img src={ThumbsUp} alt="" />
                              <p>15</p>
                            </div>
                            <div className="like flex align_center">
                              <img src={ThumbsDown} alt="" />
                              <p>00</p>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="review_pro">
                        <div className="review_head flex align_center justify_between">
                          <div className="review_head_name flex align_center">
                            <div className="pro_detail_dp">
                              <h3>E</h3>
                            </div>
                            <div className="name">
                              <h6>ELLIOTT</h6>
                              <img src={HalfStar} alt="" />
                            </div>
                          </div>
                          <div className="review_date">
                            <p>6/6/2022</p>
                          </div>
                        </div>
                        <div className="review_content flex justify_between">
                          <div className="review_content_head">
                            <h5>neat</h5>
                            <p>
                              Lorem ipsum dolor sit amet, consectetur adipiscing
                              elit, sed do eiusmod tempor incididunt ut labore
                              et dolore magna aliqua. Ut enim ad minim veniam,
                              quis nostrud exercitation ullamco laboris nisi ut
                              aliquip ex ea commodo consequat.
                            </p>
                          </div>
                          <div className="revie_like flex align_center">
                            <h6>Was This Review Helpful?</h6>
                            <div className="like flex align_center">
                              <img src={ThumbsUp} alt="" />
                              <p>15</p>
                            </div>
                            <div className="like flex align_center">
                              <img src={ThumbsDown} alt="" />
                              <p>00</p>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="review_pro">
                        <div className="review_head flex align_center justify_between">
                          <div className="review_head_name flex align_center">
                            <div className="pro_detail_dp">
                              <h3>E</h3>
                            </div>
                            <div className="name">
                              <h6>ELLIOTT</h6>
                              <img src={HalfStar} alt="" />
                            </div>
                          </div>
                          <div className="review_date">
                            <p>6/6/2022</p>
                          </div>
                        </div>
                        <div className="review_content flex justify_between">
                          <div className="review_content_head">
                            <h5>neat</h5>
                            <p>
                              Lorem ipsum dolor sit amet, consectetur adipiscing
                              elit, sed do eiusmod tempor incididunt ut labore
                              et dolore magna aliqua. Ut enim ad minim veniam,
                              quis nostrud exercitation ullamco laboris nisi ut
                              aliquip ex ea commodo consequat.
                            </p>
                          </div>
                          <div className="revie_like flex align_center">
                            <h6>Was This Review Helpful?</h6>
                            <div className="like flex align_center">
                              <img src={ThumbsUp} alt="" />
                              <p>15</p>
                            </div>
                            <div className="like flex align_center">
                              <img src={ThumbsDown} alt="" />
                              <p>00</p>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="review_pro">
                        <div className="review_head flex align_center justify_between">
                          <div className="review_head_name flex align_center">
                            <div className="pro_detail_dp">
                              <h3>E</h3>
                              <div className="pro_detail_dp_check">
                                <svg
                                  width="9"
                                  height="9"
                                  viewBox="0 0 9 9"
                                  fill="none"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path
                                    d="M7.5 2.25L3.375 6.375L1.5 4.5"
                                    stroke="#1C6758"
                                    stroke-width="1.5"
                                    stroke-linecap="round"
                                    strokeLinejoin="round"
                                  />
                                </svg>
                              </div>
                            </div>
                            <div className="name">
                              <h6>ELLIOTT</h6>
                              <img src={HalfStar} alt="" />
                            </div>
                          </div>
                          <div className="review_date">
                            <p>6/6/2022</p>
                          </div>
                        </div>
                        <div className="review_content flex justify_between">
                          <div className="review_content_head">
                            <h5>neat</h5>
                            <p>
                              Lorem ipsum dolor sit amet, consectetur adipiscing
                              elit, sed do eiusmod tempor incididunt ut labore
                              et dolore magna aliqua. Ut enim ad minim veniam,
                              quis nostrud exercitation ullamco laboris nisi ut
                              aliquip ex ea commodo consequat.
                            </p>
                          </div>
                          <div className="revie_like flex align_center">
                            <h6>Was This Review Helpful?</h6>
                            <div className="like flex align_center">
                              <img src={ThumbsUp} alt="" />
                              <p>15</p>
                            </div>
                            <div className="like flex align_center">
                              <img src={ThumbsDown} alt="" />
                              <p>00</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </SwiperSlide>
                    <SwiperSlide>
                      <div className="review_pro">
                        <div className="review_head flex align_center justify_between">
                          <div className="review_head_name flex align_center">
                            <div className="pro_detail_dp">
                              <h3>E</h3>
                              <div className="pro_detail_dp_check">
                                <svg
                                  width="9"
                                  height="9"
                                  viewBox="0 0 9 9"
                                  fill="none"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path
                                    d="M7.5 2.25L3.375 6.375L1.5 4.5"
                                    stroke="#1C6758"
                                    stroke-width="1.5"
                                    stroke-linecap="round"
                                    strokeLinejoin="round"
                                  />
                                </svg>
                              </div>
                            </div>
                            <div className="name">
                              <h6>ELLIOTT</h6>
                              <img src={HalfStar} alt="" />
                            </div>
                          </div>
                          <div className="review_date">
                            <p>6/6/2022</p>
                          </div>
                        </div>
                        <div className="review_content flex justify_between">
                          <div className="review_content_head">
                            <h5>neat</h5>
                            <p>
                              Lorem ipsum dolor sit amet, consectetur adipiscing
                              elit, sed do eiusmod tempor incididunt ut labore
                              et dolore magna aliqua. Ut enim ad minim veniam,
                              quis nostrud exercitation ullamco laboris nisi ut
                              aliquip ex ea commodo consequat.
                            </p>
                          </div>
                          <div className="revie_like flex align_center">
                            <h6>Was This Review Helpful?</h6>
                            <div className="like flex align_center">
                              <img src={ThumbsUp} alt="" />
                              <p>15</p>
                            </div>
                            <div className="like flex align_center">
                              <img src={ThumbsDown} alt="" />
                              <p>00</p>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="review_pro">
                        <div className="review_head flex align_center justify_between">
                          <div className="review_head_name flex align_center">
                            <div className="pro_detail_dp">
                              <h3>E</h3>
                            </div>
                            <div className="name">
                              <h6>ELLIOTT</h6>
                              <img src={HalfStar} alt="" />
                            </div>
                          </div>
                          <div className="review_date">
                            <p>6/6/2022</p>
                          </div>
                        </div>
                        <div className="review_content flex justify_between">
                          <div className="review_content_head">
                            <h5>neat</h5>
                            <p>
                              Lorem ipsum dolor sit amet, consectetur adipiscing
                              elit, sed do eiusmod tempor incididunt ut labore
                              et dolore magna aliqua. Ut enim ad minim veniam,
                              quis nostrud exercitation ullamco laboris nisi ut
                              aliquip ex ea commodo consequat.
                            </p>
                          </div>
                          <div className="revie_like flex align_center">
                            <h6>Was This Review Helpful?</h6>
                            <div className="like flex align_center">
                              <img src={ThumbsUp} alt="" />
                              <p>15</p>
                            </div>
                            <div className="like flex align_center">
                              <img src={ThumbsDown} alt="" />
                              <p>00</p>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="review_pro">
                        <div className="review_head flex align_center justify_between">
                          <div className="review_head_name flex align_center">
                            <div className="pro_detail_dp">
                              <h3>E</h3>
                            </div>
                            <div className="name">
                              <h6>ELLIOTT</h6>
                              <img src={HalfStar} alt="" />
                            </div>
                          </div>
                          <div className="review_date">
                            <p>6/6/2022</p>
                          </div>
                        </div>
                        <div className="review_content flex justify_between">
                          <div className="review_content_head">
                            <h5>neat</h5>
                            <p>
                              Lorem ipsum dolor sit amet, consectetur adipiscing
                              elit, sed do eiusmod tempor incididunt ut labore
                              et dolore magna aliqua. Ut enim ad minim veniam,
                              quis nostrud exercitation ullamco laboris nisi ut
                              aliquip ex ea commodo consequat.
                            </p>
                          </div>
                          <div className="revie_like flex align_center">
                            <h6>Was This Review Helpful?</h6>
                            <div className="like flex align_center">
                              <img src={ThumbsUp} alt="" />
                              <p>15</p>
                            </div>
                            <div className="like flex align_center">
                              <img src={ThumbsDown} alt="" />
                              <p>00</p>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="review_pro">
                        <div className="review_head flex align_center justify_between">
                          <div className="review_head_name flex align_center">
                            <div className="pro_detail_dp">
                              <h3>E</h3>
                              <div className="pro_detail_dp_check">
                                <svg
                                  width="9"
                                  height="9"
                                  viewBox="0 0 9 9"
                                  fill="none"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path
                                    d="M7.5 2.25L3.375 6.375L1.5 4.5"
                                    stroke="#1C6758"
                                    stroke-width="1.5"
                                    stroke-linecap="round"
                                    strokeLinejoin="round"
                                  />
                                </svg>
                              </div>
                            </div>
                            <div className="name">
                              <h6>ELLIOTT</h6>
                              <img src={HalfStar} alt="" />
                            </div>
                          </div>
                          <div className="review_date">
                            <p>6/6/2022</p>
                          </div>
                        </div>
                        <div className="review_content flex justify_between">
                          <div className="review_content_head">
                            <h5>neat</h5>
                            <p>
                              Lorem ipsum dolor sit amet, consectetur adipiscing
                              elit, sed do eiusmod tempor incididunt ut labore
                              et dolore magna aliqua. Ut enim ad minim veniam,
                              quis nostrud exercitation ullamco laboris nisi ut
                              aliquip ex ea commodo consequat.
                            </p>
                          </div>
                          <div className="revie_like flex align_center">
                            <h6>Was This Review Helpful?</h6>
                            <div className="like flex align_center">
                              <img src={ThumbsUp} alt="" />
                              <p>15</p>
                            </div>
                            <div className="like flex align_center">
                              <img src={ThumbsDown} alt="" />
                              <p>00</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </SwiperSlide>
                  </Swiper>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="new_product">
        <div className="container">
          <div className="spacer">
            <div className="section_title">
              <h2>You Might Also Like</h2>
            </div>

            <div id="new-product">
              <Swiper
                modules={[Pagination]}
                pagination={{clickable: 'true'}}
                slidesPerView={4}
                spaceBetween={20}
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
                  <SwiperSlide>
                    <div className="product_item">
                      <div className="product_img">
                        <div className="product_img_wrap">
                          <img
                            src={Pro2}
                            alt="new-product"
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
                            alt="new-product"
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
                            alt="new-product"
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
                    {' '}
                    <div className="product_item">
                      <div className="product_img">
                        <div className="product_img_wrap">
                          <img
                            src={Pro1}
                            alt="new-product"
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
      <section>
        <div className="container">
          <div className="spacer">
            <div className="section_title">
              <h2>Know More from Blog</h2>
            </div>
            <div className="main_blog flex">
              <div className="blog">
                <div className="blog_img">
                  <img
                    src="image/blog1.png"
                    alt="blog"
                    width="453px"
                    height="197px"
                  />
                </div>
                <div className="blog_content">
                  <h2>
                    14 Self-Care Ideas to Manage Stress and Maintain Your
                    Well-Being
                  </h2>
                  <p>
                    In a stressful and fast-paced world, self-care is an
                    essential aspect of managing stress and safeguarding your
                    health and well-being—both physical and mental. If you're
                    not sure...
                  </p>
                  <a href="#">Read More</a>
                </div>
              </div>
              <div className="blog">
                <div className="blog_img">
                  <img
                    src="image/blog2.png"
                    alt="blog"
                    width="453px"
                    height="197px"
                  />
                </div>
                <div className="blog_content">
                  <h2>
                    14 Self-Care Ideas to Manage Stress and Maintain Your
                    Well-Being
                  </h2>
                  <p>
                    In a stressful and fast-paced world, self-care is an
                    essential aspect of managing stress and safeguarding your
                    health and well-being—both physical and mental. If you're
                    not sure...
                  </p>
                  <a href="#">Read More</a>
                </div>
              </div>
              <div className="blog">
                <div className="blog_img">
                  <img
                    src="image/blog3.png"
                    alt="blog"
                    width="453px"
                    height="197px"
                  />
                </div>
                <div className="blog_content">
                  <h2>
                    14 Self-Care Ideas to Manage Stress and Maintain Your
                    Well-Being
                  </h2>
                  <p>
                    In a stressful and fast-paced world, self-care is an
                    essential aspect of managing stress and safeguarding your
                    health and well-being—both physical and mental. If you're
                    not sure...
                  </p>
                  <a href="#">Read More</a>
                </div>
              </div>
            </div>
            <div className="product_btn">
              <a href="#" className="btn">
                View All
              </a>
            </div>
          </div>
        </div>
      </section>
      <section>
        <div className="container">
          <div className="spacer">
            <div className="main_discount_banner flex align_center">
              <div className="discount_vector">
                <img src="image/discount.png" alt="" />
              </div>
              <div className="discount_content">
                <h4>Do you want a 10% discount for your first purchase?</h4>
                <p>Join our newsletter and get discount</p>
                <input type="email" placeholder="Enter your email address" />
                <div className="discount_btn">
                  <a href="#" className="btn">
                    Subscribe
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

export default Product;
