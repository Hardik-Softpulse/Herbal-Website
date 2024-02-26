import MailchimpSubscribe from 'react-mailchimp-subscribe';
import Discount from '../image/discount.png';

const url =
  'https://dev.us21.list-manage.com/subscribe/post?u=945f970b3cd9b345dcb4b1a4b&amp;id=c57f035bdf';

export const SimpleForm = () => (
  <MailchimpSubscribe url={url}  />
);

export const Waiting = ({data}) => {
  const {heading_3xJ7Q3, paragraph_yV7tRm} = data?.blocks;
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
            <div
              dangerouslySetInnerHTML={{
                __html: paragraph_yV7tRm.settings?.text,
              }}
            ></div>
            <MailchimpSubscribe
              url={url}
              render={({subscribe, status, message}) => (
                <SimpleForm
                  onSubmitted={(formData) => subscribe(formData)}
                >
                  {status === 'sending' && (
                    <span className="statusMsg" style={{color: 'red' , paddingBottom:'10px'}}>
                      sending...
                    </span>
                  )}
                  {status === 'error' && (
                    <span
                      className="statusMsg"
                      style={{color: 'red', paddingBottom:'10px'}}
                      dangerouslySetInnerHTML={{__html: message}}
                    />
                  )}
                  {status === 'success' && (
                    <span
                      className="statusMsg"
                      style={{color: 'green', marginTop: '120px'}}
                    >
                      Subscribed !
                    </span>
                  )}
                </SimpleForm>
              )}
            />
          </div>
        </div>
      </div>
    </div>
  </section>
  )
 
};

export default Waiting;
