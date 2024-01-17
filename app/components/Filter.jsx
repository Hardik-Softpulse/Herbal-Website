import React, {useState} from 'react';
import DownArrow from '../image/down-arrow.svg';

function Filter({filters}) {
  console.log('filters', filters);
  const [filterOpen, setFilterOpen] = useState(false);
  return (
    <div className="left_filter">
      <h3>Filter</h3>

      <ul>
        {filters.map((item) => {
          console.log('item', item);
          return (
            <li
              key={item.id}
              className={`flex justify_between filter_show ${
                filterOpen ? 'active' : ''
              }`}
            >
              {item.label}
              <button
                className="filter_down_arrow"
                onClick={() => setFilterOpen(!filterOpen)}
              >
                <img src={DownArrow} alt="" />
              </button>
              {item.values.map((items) => {
                console.log('items', items),
                <div className="filter_product_option" key={items.id}>
                  <div className="filter_size flex">
                    <input type="checkbox" name="" id={items.label} />

                    <div className="filter_size_content">
                      <label className="filter__button" htmlFor="xxl">
                        {items.label}
                      </label>
                    </div>
                  </div>
                  <div className="filter_size_style flex">
                    <input type="checkbox" name="" id="size1" />

                    <div className="size_style_content">
                      <label className="filter_button" htmlFor="size1">
                        EU 54 (UK 44)
                      </label>
                    </div>
                  </div>
                </div>;
              })}
            </li>
          );
        })}
      </ul>
      {/* <ul>
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
        <li
          className={`flex justify_between filter_show ${
            filterOpen ? 'active' : ''
          }`}
        >
          Product Type
          <button
            className="filter_down_arrow"
            onClick={() => setFilterOpen(!filterOpen)}
          >
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
        <li
          className={`flex justify_between filter_show ${
            filterOpen ? 'active' : ''
          }`}
        >
          Family
          <button
            className="filter_down_arrow"
            onClick={() => setFilterOpen(!filterOpen)}
          >
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
        <li
          className={`flex justify_between filter_show ${
            filterOpen ? 'active' : ''
          }`}
        >
          Other
          <button
            className="filter_down_arrow"
            onClick={() => setFilterOpen(!filterOpen)}
          >
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
      </ul> */}
    </div>
  );
}

export default Filter;
