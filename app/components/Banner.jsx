
export function Banner({data}) {
  const { heading_66hLiQ, text_AYzYTT} = data.blocks;

  return (
    <section id="medicine_banner">
      <div className="medicine_banner">
        <div className="container">
          <div className="main_medicine_banner flex align_center justify_between">
            <div className="left_medicine_img">
              <img src={data.settings?.image} alt="" />
            </div>
            <div className="medicine_content">
              <div className="section_title">
                <h2>{heading_66hLiQ.settings?.heading}</h2>
              </div>
              <p
                dangerouslySetInnerHTML={{__html: text_AYzYTT.settings?.text}}
              ></p>
              <a href="/news" className="btn">
                Know More
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
