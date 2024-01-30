import Discount from '../image/discount.png';

export function Newsletter({data}) {
  const {heading_3xJ7Q3, paragraph_yV7tRm} = data.blocks;
  return (
    <section className="dis_banner">
      <div className="container">
        <div className="spacer">
          <div className="main_discount_banner flex align_center">
            <div className="discount_vector">
              <img src={Discount} alt="" />
            </div>
            <div className="discount_content">
              <h4>{heading_3xJ7Q3.settings?.heading}</h4>
              <p
                dangerouslySetInnerHTML={{
                  __html: paragraph_yV7tRm.settings?.text,
                }}
              >
                
              </p>
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
  );
}
