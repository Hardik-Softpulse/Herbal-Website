import Medicine2 from '../image/medicine2.png';
import Medicine1 from '../image/medicine1.png';

export function Banner({banner}) {
  const {blocks} = banner;
  const {heading_CmWefn, text_JUEM86, button_NtNXcH} = blocks;

  return (
    <section id="medicine_banner">
      <div className="medicine_banner">
        <div className="container">
          <div className="main_medicine_banner flex align_center justify_between">
            <div className="left_medicine_img">
              <img src={Medicine2} alt="" />
            </div>
            <div className="medicine_content">
              <div className="section_title">
                <h2>{heading_CmWefn.settings?.heading}</h2>
              </div>
              <p
                dangerouslySetInnerHTML={{__html: text_JUEM86.settings.text}}
              ></p>
              <a href="#" className="btn">
                Know More
              </a>
            </div>
            <div className="right_medicine_img">
              <img src={Medicine1} alt="" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
