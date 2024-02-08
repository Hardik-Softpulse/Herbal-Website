import {Await, Link, NavLink, useLocation} from '@remix-run/react';
import {Suspense, useEffect, useRef, useState} from 'react';
import {useRootLoaderData} from '~/root';
import logo from '../image/logo-ethenic.png';
import {SearchForm} from './Search';
/**
 * @param {HeaderProps}
 */
export function Header({
  header,
  isLoggedIn,
  cart,
  search,
  setSearch,
  headerMenu,
  setHeaderMenu,
}) {
  const {shop, menu} = header;
  const headerRef = useRef(null);
  const [hideNav, setHideNav] = useState(false);
  const location = useLocation();

  useEffect(() => {
    let didScroll;
    let lastScrollTop = 0;
    const damper = 20;

    const handleScroll = () => {
      didScroll = true;
    };

    const hasScrolled = () => {
      const st = window.scrollY;
      if (Math.abs(lastScrollTop - st) <= damper) {
        return;
      }

      if (st > lastScrollTop && st > headerRef.current.offsetHeight) {
        setHideNav(true);
      } else {
        if (st + window.innerHeight < document.body.offsetHeight) {
          setHideNav(false);
        }
      }

      lastScrollTop = st;
    };

    window.addEventListener('scroll', handleScroll);

    const scrollInterval = setInterval(() => {
      if (didScroll) {
        hasScrolled();
        didScroll = false;
      }
    }, 150);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearInterval(scrollInterval);
    };
  }, []);

  useEffect(() => {
    if (location.hash.includes('cart-aside')) {
      headerRef.current.style.position = 'static';
    } else {
      headerRef.current.style.position = 'fixed';
    }
   
  }, [location.hash]);

  return (
    <header ref={headerRef} className={hideNav ? 'hide-nav' : ''}>
      <div className="top_header">
        <p>
          Get 10% off on minimum purchase of ₹100 use code <span>10 OFF</span>
        </p>
      </div>
      <HeaderMenu
        menu={header}
        viewport="desktop"
        isLoggedIn={isLoggedIn}
        cart={cart}
        search={search}
        setSearch={setSearch}
        headerMenu={headerMenu}
        setHeaderMenu={setHeaderMenu}
      />
    </header>
  );
}

export function HeaderMenu({
  menu,
  viewport,
  isLoggedIn,
  cart,
  search,
  setSearch,
  headerMenu,
  setHeaderMenu,
}) {
  const [subMenu, setSubMenu] = useState(false);
  const [activeSubMenuIndex, setActiveSubMenuIndex] = useState(null);

  const handleMenu = (index) => {
    setSubMenu(!subMenu);
    setActiveSubMenuIndex(index);
  };

  function closeAside(event) {
    if (viewport === 'mobile') {
      event.preventDefault();
      window.location.href = event.currentTarget.href;
    }
  }

  return (
    <div className="container">
      <div className="main_header flex align_center justify_between">
        <div className="menu_icon">
          <button
            className={`menu_btn bars ${headerMenu ? 'active' : ''}`}
            onClick={() => setHeaderMenu(true)}
          >
            <svg
              width="20"
              height="15"
              viewBox="0 0 20 15"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect width="20" height="3" fill="white" />
              <rect y="6" width="20" height="3" fill="white" />
              <rect y="12" width="20" height="3" fill="white" />
            </svg>
          </button>
        </div>
        <div className="main_logo ">
          <a href="/" className="flex align_center">
            <img src={logo} alt="" />
          </a>
        </div>
        <div className={`navigation ${headerMenu ? 'active' : ''}`}>
          <button
            className={`menu_btn cross ${headerMenu ? 'active' : ''}`}
            onClick={() => setHeaderMenu(false)}
          >
            <svg
              width="17"
              height="17"
              viewBox="0 0 17 17"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M1 1L16 16M16 1L1 16"
                stroke="#1C6758"
                strokeWidth="2.4"
              />
            </svg>
          </button>
          <nav>
            <div className="main_menu">
              <ul className="flex align_center">
                {(menu?.items || []).map((item) => {
                  const isSubMenuOpen =
                    subMenu && item.id === activeSubMenuIndex;

                  return (
                    <li
                      key={item.id}
                      className={isSubMenuOpen ? 'active-submenu' : ''}
                    >
                      <NavLink to={item.to} target={item.target}>
                        {item.title}
                      </NavLink>
                      {item.items != 0 && (
                        <span onClick={() => handleMenu(item.id)}>
                          <svg
                            aria-hidden="true"
                            focusable="false"
                            viewBox="0 0 10 6"
                            width="11px"
                            height="11px"
                          >
                            <path
                              fillRule="evenodd"
                              clipRule="evenodd"
                              d="M9.354.646a.5.5 0 00-.708 0L5 4.293 1.354.646a.5.5 0 00-.708.708l4 4a.5.5 0 00.708 0l4-4a.5.5 0 000-.708z"
                              fill="currentColor"
                            ></path>
                          </svg>
                        </span>
                      )}

                      {isSubMenuOpen &&
                        item.items?.map((menuItem) => (
                          <div className="hdr_sub_menu" key={menuItem.id}>
                            <a href={menuItem.to}>{menuItem.title}</a>
                          </div>
                        ))}
                    </li>
                  );
                })}
              </ul>
            </div>
          </nav>
        </div>
        <HeaderCtas
          isLoggedIn={isLoggedIn}
          cart={cart}
          search={search}
          setSearch={setSearch}
        />
      </div>
    </div>
  );
}

function HeaderCtas({isLoggedIn, cart, search, setSearch}) {
  return (
    <div className="social_icon">
      <ul className="flex align_center">
        <li>
          <svg
            onClick={(e) => {
              e.preventDefault;
              setSearch(true);
            }}
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M9.16667 15.8333C12.8486 15.8333 15.8333 12.8486 15.8333 9.16667C15.8333 5.48477 12.8486 2.5 9.16667 2.5C5.48477 2.5 2.5 5.48477 2.5 9.16667C2.5 12.8486 5.48477 15.8333 9.16667 15.8333Z"
              stroke="#1C6758"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M17.5 17.5L13.875 13.875"
              stroke="#1C6758"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          {/* </a> */}
          {search && <SearchForm setSearch={setSearch} search={search} />}
        </li>
        <li>
          <Suspense fallback="Sign in">
            <Await resolve={isLoggedIn} errorElement="Sign in">
              <AccountLink isLoggedIn={isLoggedIn} />
            </Await>
          </Suspense>
        </li>
        <CartToggle cart={cart} />
      </ul>
    </div>
  );
}

function AccountLink({isLoggedIn}) {
  return isLoggedIn ? (
    <Link to="/account" className="flex">
      <svg
        width="20"
        height="20"
        viewBox="0 0 20 20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M16.6673 17.5V15.8333C16.6673 14.9493 16.3161 14.1014 15.691 13.4763C15.0659 12.8512 14.218 12.5 13.334 12.5H6.66732C5.78326 12.5 4.93542 12.8512 4.31029 13.4763C3.68517 14.1014 3.33398 14.9493 3.33398 15.8333V17.5"
          stroke="#1C6758"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M9.99935 9.16667C11.8403 9.16667 13.3327 7.67428 13.3327 5.83333C13.3327 3.99238 11.8403 2.5 9.99935 2.5C8.1584 2.5 6.66602 3.99238 6.66602 5.83333C6.66602 7.67428 8.1584 9.16667 9.99935 9.16667Z"
          stroke="#1C6758"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </Link>
  ) : (
    <Link to="/account/login" className="flex">
      <svg
        width="20"
        height="20"
        viewBox="0 0 20 20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M16.6673 17.5V15.8333C16.6673 14.9493 16.3161 14.1014 15.691 13.4763C15.0659 12.8512 14.218 12.5 13.334 12.5H6.66732C5.78326 12.5 4.93542 12.8512 4.31029 13.4763C3.68517 14.1014 3.33398 14.9493 3.33398 15.8333V17.5"
          stroke="#1C6758"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M9.99935 9.16667C11.8403 9.16667 13.3327 7.67428 13.3327 5.83333C13.3327 3.99238 11.8403 2.5 9.99935 2.5C8.1584 2.5 6.66602 3.99238 6.66602 5.83333C6.66602 7.67428 8.1584 9.16667 9.99935 9.16667Z"
          stroke="#1C6758"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </Link>
  );
}

function Badge({count}) {
  return (
    <li>
      <a href="#cart-aside" className="flex shop_cart">
        <svg
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g clipPath="url(#clip0_239_7783)">
            <path
              d="M7.49935 18.3333C7.95959 18.3333 8.33268 17.9602 8.33268 17.5C8.33268 17.0398 7.95959 16.6667 7.49935 16.6667C7.03911 16.6667 6.66602 17.0398 6.66602 17.5C6.66602 17.9602 7.03911 18.3333 7.49935 18.3333Z"
              stroke="#1C6758"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M16.6673 18.3333C17.1276 18.3333 17.5007 17.9602 17.5007 17.5C17.5007 17.0398 17.1276 16.6667 16.6673 16.6667C16.2071 16.6667 15.834 17.0398 15.834 17.5C15.834 17.9602 16.2071 18.3333 16.6673 18.3333Z"
              stroke="#1C6758"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M0.833984 0.833344H4.16732L6.40065 11.9917C6.47686 12.3753 6.68558 12.72 6.99027 12.9653C7.29497 13.2105 7.67623 13.3408 8.06732 13.3333H16.1673C16.5584 13.3408 16.9397 13.2105 17.2444 12.9653C17.5491 12.72 17.7578 12.3753 17.834 11.9917L19.1673 5.00001H5.00065"
              stroke="#1C6758"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </g>
          <defs>
            <clipPath id="clip0_239_7783">
              <rect width="20" height="20" fill="white" />
            </clipPath>
          </defs>
        </svg>
        <span>{count || 0}</span>
      </a>
    </li>
  );
}

function CartToggle({cart}) {
  return (
    <Suspense fallback={<Badge count={0} />}>
      <Await resolve={cart}>
        {(cart) => {
          if (!cart) return <Badge count={0} />;
          return <Badge count={cart.totalQuantity || 0} />;
        }}
      </Await>
    </Suspense>
  );
}
