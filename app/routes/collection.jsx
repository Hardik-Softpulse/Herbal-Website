import React, { useEffect, useState } from 'react';
import Health2 from '../image/health1.png';
import Health3 from '../image/health3.png';
import Health4 from '../image/health4.png';
import Health1 from '../image/health1.png';
import DownArrow from '../image/down-arrow.svg';
import Pro2 from '../image/pro2.png';
import Pro3 from '../image/pro3.png';
import Pro4 from '../image/pro4.png';
import NewArrival from '../image/NewArrivals.png';
import {Link} from '@remix-run/react';
import Discount from '../image/discount.png';

function collection() {
    const [filterOpen , setFilterOpen] = useState(false)
  return (
    <main className="abt_sec">
      <section className="main_arrivals">
        <div>
          <div className="main_arrivals_banner">
            <div className="arrivals_banner_img">
              <img src={NewArrival} alt="" />
              <div className="arrivals_content flex align_center justify_center">
                <h2>New Arrivals</h2>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section>
        <div className="container">
          <div className="spacer">
            <div className="main_filter flex">
              <div className="left_filter">
                <h3>Filter</h3>
                <ul>
                  <li className={`flex justify_between filter_show ${filterOpen ? 'active' : ''}`}>
                    Shop by Health Interest
                    <button className="filter_down_arrow" onClick={() => setFilterOpen(!filterOpen)}>
                      <img src={DownArrow} alt="" />
                    </button>
                    <div className="filter_product_option">
                      <div className="filter_size flex">
                        <input type="checkbox" name="" id="xxl" />
                        <input type="checkbox" name="" id="xl" />
                        <input type="checkbox" name="" id="l" />
                        <input type="checkbox" name="" id="m" />
                        <input type="checkbox" name="" id="s" />

                        <div className="filter_size_content">
                          <label className="filter__button" htmlFor="xxl">
                            XXL
                          </label>
                        </div>
                        <div className="filter_size_content">
                          <label className="filter__button" htmlFor="xl">
                            Xl
                          </label>
                        </div>
                        <div className="filter_size_content">
                          <label className="filter__button" htmlFor="l">
                            L
                          </label>
                        </div>
                        <div className="filter_size_content">
                          <label className="filter__button" htmlFor="m">
                            M
                          </label>
                        </div>
                        <div className="filter_size_content">
                          <label className="filter__button" htmlFor="s">
                            S
                          </label>
                        </div>
                      </div>
                      <div className="filter_size_style flex">
                        <input type="checkbox" name="" id="size1" />
                        <input type="checkbox" name="" id="size2" />
                        <input type="checkbox" name="" id="size3" />
                        <input type="checkbox" name="" id="size4" />
                        <input type="checkbox" name="" id="size5" />
                        <input type="checkbox" name="" id="size6" />
                        <input type="checkbox" name="" id="size7" />
                        <input type="checkbox" name="" id="size8" />
                        <input type="checkbox" name="" id="size9" />
                        <input type="checkbox" name="" id="size10" />

                        <div className="size_style_content">
                          <label className="filter_button" htmlFor="size1">
                            EU 54 (UK 44)
                          </label>
                        </div>
                        <div className="size_style_content">
                          <label className="filter_button" htmlFor="size2">
                            EU 54 (UK 44)
                          </label>
                        </div>
                        <div className="size_style_content">
                          <label className="filter_button" htmlFor="size3">
                            EU 54 (UK 44)
                          </label>
                        </div>
                        <div className="size_style_content">
                          <label className="filter_button" htmlFor="size4">
                            EU 54 (UK 44)
                          </label>
                        </div>
                        <div className="size_style_content">
                          <label className="filter_button" htmlFor="size5">
                            EU 54 (UK 44)
                          </label>
                        </div>
                        <div className="size_style_content">
                          <label className="filter_button" htmlFor="size6">
                            EU 54 (UK 44)
                          </label>
                        </div>
                        <div className="size_style_content">
                          <label className="filter_button" htmlFor="size7">
                            EU 54 (UK 44)
                          </label>
                        </div>
                        <div className="size_style_content">
                          <label className="filter_button" htmlFor="size8">
                            EU 54 (UK 44)
                          </label>
                        </div>
                        <div className="size_style_content">
                          <label className="filter_button" htmlFor="size9">
                            EU 54 (UK 44)
                          </label>
                        </div>
                        <div className="size_style_content">
                          <label className="filter_button" htmlFor="size10">
                            EU 54 (UK 44)
                          </label>
                        </div>
                      </div>
                    </div>
                  </li>
                </ul>
                <ul>
                  <li className="flex justify_between filter_show">
                    Herb / Ingredient
                    <button className="filter_down_arrow">
                      <img src={DownArrow} alt="" />
                    </button>
                    <div className="filter_product_option">
                      <div className="filter_price flex justify_between">
                        <p>$ 990.00</p>
                        <p>$ 11,000.00</p>
                      </div>
                      <div className="filter_price_range">
                        <section className="range-slider">
                          <span className="full-range"></span>
                          <span className="incl-range"></span>
                          <input
                            name="rangeOne"
                            value="10"
                            min="0"
                            max="100"
                            step="1"
                            type="range"
                          />
                          <input
                            name="rangeTwo"
                            value="90"
                            min="0"
                            max="100"
                            step="1"
                            type="range"
                          />
                        </section>
                      </div>
                    </div>
                  </li>
                </ul>
                <ul>
                  <li className={`flex justify_between filter_show ${filterOpen ? 'active' : ''}`}>
                    Product Type
                    <button className="filter_down_arrow" onClick={() => setFilterOpen(!filterOpen)}>
                      <img src={DownArrow} alt="" />
                    </button>
                    <div className="filter_product_option">
                      <div className="filter_product_type flex">
                        <input type="checkbox" name="" id="bag" />
                        <input type="checkbox" name="" id="blazer" />
                        <input type="checkbox" name="" id="hoodie" />
                        <input type="checkbox" name="" id="jeans" />
                        <input type="checkbox" name="" id="purse" />
                        <input type="checkbox" name="" id="shooes" />
                        <input type="checkbox" name="" id="shirt" />
                        <input type="checkbox" name="" id="t-shirt" />
                        <input type="checkbox" name="" id="perfume" />

                        <div className="left_product_type">
                          <label className="pro_type_button" htmlFor="bag">
                            BAGS
                          </label>
                          <label className="pro_type_button" htmlFor="blazer">
                            BLAZER
                          </label>
                          <label className="pro_type_button" htmlFor="hoodie">
                            HOODIES
                          </label>
                          <label className="pro_type_button" htmlFor="jeans">
                            JEANS
                          </label>
                          <label className="pro_type_button" htmlFor="purse">
                            PURSE
                          </label>
                          <label className="pro_type_button" htmlFor="shooes">
                            SHOOES
                          </label>
                          <label className="pro_type_button" htmlFor="shirt">
                            SHIRTS
                          </label>
                          <label className="pro_type_button" htmlFor="t-shirt">
                            T-SHIRTS
                          </label>
                          <label className="pro_type_button" htmlFor="perfume">
                            PERFUMES
                          </label>
                        </div>
                        <div className="left_product_type">
                          <label className="pro_type_button" htmlFor="bag">
                            BAGS
                          </label>
                          <label className="pro_type_button" htmlFor="blazer">
                            BLAZER
                          </label>
                          <label className="pro_type_button" htmlFor="hoodie">
                            HOODIES
                          </label>
                          <label className="pro_type_button" htmlFor="jeans">
                            JEANS
                          </label>
                          <label className="pro_type_button" htmlFor="purse">
                            PURSE
                          </label>
                          <label className="pro_type_button" htmlFor="shooes">
                            SHOOES
                          </label>
                          <label className="pro_type_button" htmlFor="shirt">
                            SHIRTS
                          </label>
                          <label className="pro_type_button" htmlFor="t-shirt">
                            T-SHIRTS
                          </label>
                          <label className="pro_type_button" htmlFor="perfume">
                            PERFUMES
                          </label>
                        </div>
                      </div>
                    </div>
                  </li>
                </ul>
                <ul>
                  <li className={`flex justify_between filter_show ${filterOpen ? 'active' : ''}`}>
                    Family
                    <button className="filter_down_arrow" onClick={() => setFilterOpen(!filterOpen)}>
                      <img src={DownArrow} alt="" />
                    </button>
                    <div className="filter_product_option">
                      <div className="filter_product_color">
                        <input type="checkbox" name="" id="beige" />
                        <input type="checkbox" name="" id="black" />
                        <input type="checkbox" name="" id="brown" />
                        <input type="checkbox" name="" id="white" />
                        <div className="filter_color flex">
                          <label
                            htmlFor="beige"
                            className="filter_color1 flex align_center"
                          >
                            <p className="color_box"></p>
                            <span>BEIGE</span>
                          </label>
                          <label
                            htmlFor="black"
                            className="filter_color1 flex align_center"
                          >
                            <p className="color_box1"></p>
                            <span>BLACK</span>
                          </label>
                          <label
                            htmlFor="brown"
                            className="filter_color1 flex align_center"
                          >
                            <p className="color_box2"></p>
                            <span>BROWN</span>
                          </label>
                          <label
                            htmlFor="white"
                            className="filter_color1 flex align_center"
                          >
                            <p className="color_box3"></p>
                            <span>WHITE</span>
                          </label>
                        </div>
                      </div>
                    </div>
                  </li>
                </ul>
                <ul>
                  <li className={`flex justify_between filter_show ${filterOpen ? 'active' : ''}`}>
                    Other
                    <button className="filter_down_arrow" onClick={() => setFilterOpen(!filterOpen)}>
                      <img src={DownArrow} alt="" />
                    </button>
                    <div className="filter_product_option">
                      <div className="filter_product_type flex">
                        <input type="checkbox" name="" id="plain" />
                        <input type="checkbox" name="" id="print" />
                        <input type="checkbox" name="" id="striped" />
                        <div className="left_product_type">
                          <label className="pro_type_button" htmlFor="plain">
                            PLAIN
                          </label>
                          <label className="pro_type_button" htmlFor="print">
                            PRINTED
                          </label>
                        </div>
                        <div className="left_product_type">
                          <label className="pro_type_button" htmlFor="striped">
                            STRIPED
                          </label>
                        </div>
                      </div>
                    </div>
                  </li>
                </ul>
              </div>
              <div className="right_filter">
                <div className="right_filter_head flex justify_between">
                  <h4>14 Products</h4>
                  <select name="" id="">
                    <option value="">Sort By</option>
                  </select>
                </div>
                <div className="main_product flex">
                  <div className="product_item">
                    <div className="product_img">
                      <div className="product_img_wrap">
                        <Link to="/product">
                          <img
                            src={Pro2}
                            alt="product-list"
                            height="422px"
                            width="319px"
                          />
                        </Link>
                        <div className="product_top_price">
                          <p>NEW</p>
                        </div>
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

                  <div className="product_item">
                    <div className="product_img">
                      <div className="product_img_wrap">
                        <img
                          src={Pro3}
                          alt="product-list"
                          height="422px"
                          width="319px"
                        />
                        <div className="product_top_price">
                          <p>10% off</p>
                        </div>
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
                  <div className="product_item">
                    <div className="product_img">
                      <div className="product_img_wrap">
                        <img
                          src={Pro4}
                          alt="product-list"
                          height="422px"
                          width="319px"
                        />
                        <div className="product_top_price">
                          <p>10% off</p>
                        </div>
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
                  <div className="product_item">
                    <div className="product_img">
                      <div className="product_img_wrap">
                        <img
                          src={Pro2}
                          alt="product-list"
                          height="422px"
                          width="319px"
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
                  <div className="product_item">
                    <div className="product_img">
                      <div className="product_img_wrap">
                        <img
                          src={Pro3}
                          alt="product-list"
                          height="422px"
                          width="319px"
                        />
                        <div className="product_top_price">
                          <p>NEW</p>
                        </div>
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
                  <div className="product_item">
                    <div className="product_img">
                      <div className="product_img_wrap">
                        <img
                          src={Pro4}
                          alt="product-list"
                          height="422px"
                          width="319px"
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
                  <div className="product_item">
                    <div className="product_img">
                      <div className="product_img_wrap">
                        <img
                          src={Pro2}
                          alt="product-list"
                          height="422px"
                          width="319px"
                        />
                        <div className="product_top_price">
                          <p>NEW</p>
                        </div>
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
                  <div className="product_item">
                    <div className="product_img">
                      <div className="product_img_wrap">
                        <img
                          src={Pro3}
                          alt="product-list"
                          height="422px"
                          width="319px"
                        />
                        <div className="product_top_price">
                          <p>10% off</p>
                        </div>
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
                  <div className="product_item">
                    <div className="product_img">
                      <div className="product_img_wrap">
                        <img
                          src={Pro4}
                          alt="product-list"
                          height="422px"
                          width="319px"
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
                  <div className="product_item">
                    <div className="product_img">
                      <div className="product_img_wrap">
                        <img
                          src={Pro2}
                          alt="product-list"
                          height="422px"
                          width="319px"
                        />
                        <div className="product_top_price">
                          <p>10% off</p>
                        </div>
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
                  <div className="product_item">
                    <div className="product_img">
                      <div className="product_img_wrap">
                        <img
                          src={Pro3}
                          alt="product-list"
                          height="422px"
                          width="319px"
                        />
                        <div className="product_top_price">
                          <p>10% off</p>
                        </div>
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
                  <div className="product_item">
                    <div className="product_img">
                      <div className="product_img_wrap">
                        <img
                          src={Pro4}
                          alt="product-list"
                          height="422px"
                          width="319px"
                        />
                        <div className="product_top_price">
                          <p>10% off</p>
                        </div>
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
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section>
        <div className="container">
          <div className="sfpacer">
            <div className="main_health flex align_center justify_center">
              <div className="health">
                <img src={Health2} alt="" />
                <div className="health_content">
                  <h4>100% Hand Made</h4>
                  <p>
                    These handmade Herbal are loaded with anti-bacterial and
                    anti-inflammatory properties.
                  </p>
                </div>
              </div>
              <div className="health">
                <img src={Health3} alt="" />
                <div className="health_content">
                  <h4>1000 year old tradition</h4>
                  <p>
                    These handmade Herbal are loaded with anti-bacterial and
                    anti-inflammatory properties.
                  </p>
                </div>
              </div>
              <div className="health">
                <img src={Health4} alt="" />
                <div className="health_content">
                  <h4>Live Long & Healthy</h4>
                  <p>
                    These handmade Herbal are loaded with anti-bacterial and
                    anti-inflammatory properties.
                  </p>
                </div>
              </div>
              <div className="health">
                <img src={Health1} alt="" />
                <div className="health_content">
                  <h4>Balanced Life</h4>
                  <p>
                    These handmade Herbal are loaded with anti-bacterial and
                    anti-inflammatory properties.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section>
        <div className="container">
          <div className="spacer">
            <div className="main_discount_banner flex align_center">
              <div className="discount_vector">
                <img src={Discount} alt="" />
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

export default collection;
