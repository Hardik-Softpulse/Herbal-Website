import Logo3 from '../image/logo(white).png';
import Card1 from '../image/card1.png';
import Card2 from '../image/card2.png';
import Card3 from '../image/card3.png';
import Card4 from '../image/card4.png';
import Card5 from '../image/card5.png';
import Card6 from '../image/card6.png';
import {Link} from '@remix-run/react';

export function Footer({footer}) {
  return (
    <footer>
      <div className="container">
        <div className="main_footer flex justify_between">
          <div className="foot1">
            <div className="main_logo ">
              <a href="#">
                <img src={Logo3} alt="" />
              </a>
            </div>
            <div className="foot1_content"></div>
            <div className="foot1_social">
              <h3>Follow us:</h3>
              <div className="social_media">
                <a href="https://instagram.com/shopify">
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g clipPath="url(#clip0_88_1091)">
                      <path
                        d="M11.3333 1.3335H4.66665C2.8257 1.3335 1.33331 2.82588 1.33331 4.66683V11.3335C1.33331 13.1744 2.8257 14.6668 4.66665 14.6668H11.3333C13.1743 14.6668 14.6666 13.1744 14.6666 11.3335V4.66683C14.6666 2.82588 13.1743 1.3335 11.3333 1.3335Z"
                        stroke="#3D8361"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M10.6667 7.5802C10.7489 8.13503 10.6542 8.70168 10.3958 9.19954C10.1375 9.69741 9.72877 10.1011 9.22776 10.3533C8.72675 10.6055 8.15897 10.6933 7.6052 10.6042C7.05143 10.515 6.53985 10.2536 6.14323 9.85698C5.74662 9.46036 5.48516 8.94878 5.39605 8.39501C5.30694 7.84124 5.39472 7.27346 5.64689 6.77245C5.89907 6.27144 6.3028 5.86269 6.80066 5.60436C7.29853 5.34603 7.86518 5.25126 8.42001 5.33353C8.98596 5.41746 9.50991 5.68118 9.91447 6.08574C10.319 6.4903 10.5828 7.01425 10.6667 7.5802Z"
                        stroke="#3D8361"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M11.6667 4.3335H11.6742"
                        stroke="#3D8361"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </g>
                    <defs>
                      <clipPath id="clip0_88_1091">
                        <rect width="16" height="16" fill="white" />
                      </clipPath>
                    </defs>
                  </svg>
                </a>
                <a href="https://youtube.com/shopify">
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g clipPath="url(#clip0_88_1097)">
                      <path
                        d="M15.0266 4.27984C14.9475 3.96344 14.7862 3.67355 14.5591 3.43944C14.332 3.20533 14.0471 3.03529 13.7333 2.9465C12.5866 2.6665 7.99997 2.6665 7.99997 2.6665C7.99997 2.6665 3.41331 2.6665 2.26664 2.97317C1.95281 3.06196 1.66796 3.232 1.44087 3.46611C1.21378 3.70022 1.0525 3.99011 0.973308 4.3065C0.763451 5.47021 0.660798 6.65071 0.666641 7.83317C0.65916 9.02453 0.761819 10.214 0.973308 11.3865C1.06061 11.6931 1.22551 11.9719 1.45207 12.1962C1.67863 12.4204 1.95919 12.5824 2.26664 12.6665C3.41331 12.9732 7.99997 12.9732 7.99997 12.9732C7.99997 12.9732 12.5866 12.9732 13.7333 12.6665C14.0471 12.5777 14.332 12.4077 14.5591 12.1736C14.7862 11.9395 14.9475 11.6496 15.0266 11.3332C15.2349 10.1782 15.3375 9.00673 15.3333 7.83317C15.3408 6.64181 15.2381 5.4523 15.0266 4.27984Z"
                        stroke="#3D8361"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M6.5 10.0133L10.3333 7.83332L6.5 5.65332V10.0133Z"
                        stroke="#3D8361"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </g>
                    <defs>
                      <clipPath id="clip0_88_1097">
                        <rect width="16" height="16" fill="white" />
                      </clipPath>
                    </defs>
                  </svg>
                </a>
                <a href="https://facebook.com/shopify">
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M12 1.3335H10C9.11597 1.3335 8.26812 1.68469 7.643 2.30981C7.01788 2.93493 6.66669 3.78277 6.66669 4.66683V6.66683H4.66669V9.33349H6.66669V14.6668H9.33335V9.33349H11.3334L12 6.66683H9.33335V4.66683C9.33335 4.49002 9.40359 4.32045 9.52862 4.19542C9.65364 4.0704 9.82321 4.00016 10 4.00016H12V1.3335Z"
                      stroke="#3D8361"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </a>
                <a href="#">
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M10.6667 5.3335C11.7276 5.3335 12.745 5.75492 13.4951 6.50507C14.2453 7.25521 14.6667 8.27263 14.6667 9.3335V14.0002H12V9.3335C12 8.97987 11.8595 8.64074 11.6095 8.39069C11.3594 8.14064 11.0203 8.00016 10.6667 8.00016C10.3131 8.00016 9.97393 8.14064 9.72388 8.39069C9.47383 8.64074 9.33335 8.97987 9.33335 9.3335V14.0002H6.66669V9.3335C6.66669 8.27263 7.08811 7.25521 7.83826 6.50507C8.58841 5.75492 9.60582 5.3335 10.6667 5.3335Z"
                      stroke="#3D8361"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M3.99998 6H1.33331V14H3.99998V6Z"
                      stroke="#3D8361"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M2.66665 4.00016C3.40303 4.00016 3.99998 3.40321 3.99998 2.66683C3.99998 1.93045 3.40303 1.3335 2.66665 1.3335C1.93027 1.3335 1.33331 1.93045 1.33331 2.66683C1.33331 3.40321 1.93027 4.00016 2.66665 4.00016Z"
                      stroke="#3D8361"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </a>
                <a href="https://twitter.com/shopify">
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 16 14"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M15.3334 0.999868C14.6949 1.45019 13.9881 1.79461 13.24 2.01987C12.8385 1.55821 12.3049 1.231 11.7114 1.08249C11.1178 0.933975 10.493 0.971332 9.92141 1.1895C9.3498 1.40768 8.85898 1.79614 8.51534 2.30235C8.1717 2.80856 7.99182 3.40809 8.00002 4.01987V4.68653C6.82844 4.71691 5.66754 4.45708 4.62069 3.93017C3.57385 3.40325 2.67357 2.62562 2.00002 1.66653C2.00002 1.66653 -0.666646 7.66653 5.33335 10.3332C3.96037 11.2652 2.32479 11.7325 0.666687 11.6665C6.66669 14.9999 14 11.6665 14 3.99987C13.9994 3.81417 13.9816 3.62893 13.9467 3.44653C14.6271 2.77553 15.1072 1.92834 15.3334 0.999868Z"
                      stroke="#3D8361"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </a>
              </div>
            </div>
          </div>

          {(footer?.items || []).map((item) => (
            <div className="foot2" key={item.id}>
              <h5>{item.title}</h5>
              {item.items.map((subItem) => (
                <p key={subItem.id}>
                  <FooterLink key={subItem.id} item={subItem} />
                </p>
              ))}
            </div>
          ))}
        </div>
        <div className="footer_bottom flex align_center justify_between">
          <div className="services flex">
            <a href="/pages/terms-and-conditions">Terms</a>
            <a href="/pages/privacy-policy">Privacy</a>
            <a href="/pages/terms-and-conditions">Disclaimer</a>
            <a href="#">Accessibility</a>
            <a href="/pages/return_policy">Return Policy</a>
          </div>
          <div className="services flex">
            <img src={Card1} alt="" />
            <img src={Card6} alt="" />
            <img src={Card5} alt="" />
            <img src={Card3} alt="" />
            <img src={Card4} alt="" />
            <img src={Card2} alt="" />
          </div>
        </div>
      </div>
    </footer>
  );
}

function FooterLink({item}) {
  if (item.to.startsWith('http')) {
    return (
      <a href={item.to} target={item.target} rel="noopener noreferrer">
        {item.title}
      </a>
    );
  }

  return (
    <Link to={item.to} target={item.target} prefetch="intent">
      {item.title}
    </Link>
  );
}
