import {useEffect, useState} from 'react';
import {Swiper, SwiperSlide} from 'swiper/react';
import {Pagination} from 'swiper/modules';
import Stamp from '../image/stamp.png';
import {ProductCards} from './ProductCards';

export function ResentlyView({product}) {
  const [items, setItems] = useState([]);

  const resentProduct = () => {
    const info = JSON.parse(localStorage.getItem('recentlyViewed')) || [];
    setItems(info);

    if (info) {
      const isProductInList = info.some((item) => item.id === product.id);

      if (!isProductInList) {
        const updatedItems = [product, ...info.slice(0, 5)];
        setItems(updatedItems);

        localStorage.setItem('recentlyViewed', JSON.stringify(updatedItems));
      }
    }
  };

  useEffect(() => {
    resentProduct();
  }, [product]);

  return (
    <section className="new_product">
      <div className="container">
        <div className="spacer">
          <div className="section_title">
            <h2>Recently Viewed</h2>
          </div>
          <div className="stamp">
            <div className="stamp_wrap">
              <img src={Stamp} alt="" />
            </div>
          </div>
          <div id="new-product">
            {items.length === 0 || items.length === 1 ? (
              <p className="sctn-title text-center">
                No recently viewed products.
              </p>
            ) : (
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
                {items?.slice(1).map((item, index) => (
                  <SwiperSlide key={item.id}>
                    <ProductCards product={item} />
                  </SwiperSlide>
                ))}
              </Swiper>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

// items state in set array in this array in 0-4 object i have map only 1-4 how to set
