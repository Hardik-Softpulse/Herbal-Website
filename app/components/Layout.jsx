import {Await} from '@remix-run/react';
import {Suspense} from 'react';
import {Aside} from '~/components/Aside';
import {Footer} from '~/components/Footer';
import {Header} from '~/components/Header';
import {CartMain} from '~/components/Cart';

export function Layout({
  cart,
  children = null,
  layout,
  isLoggedIn,
  search,
  setSearch,
  headerMenu,
  setHeaderMenu,
}) {

  return (
    <>
      <CartAside cart={cart} />
      {layout?.headerMenu && (
        <Header
          header={layout.headerMenu}
          cart={cart}
          isLoggedIn={isLoggedIn}
          search={search}
          setSearch={setSearch}
          headerMenu={headerMenu}
          setHeaderMenu={setHeaderMenu}
        />
      )}
      <>{children}</>
      <Suspense>
        <Await resolve={layout?.footerMenu}>
          {(footer) => <Footer footer={footer} />}
        </Await>
      </Suspense>
    </>
  );
}

function CartAside({cart}) {
  return (
    <Aside id="cart-aside" heading="CART">
      <Suspense fallback={<p>Loading cart ...</p>}>
        <Await resolve={cart}>
          {(cart) => {
            return <CartMain cart={cart} layout="aside" />;
          }}
        </Await>
      </Suspense>
    </Aside>
  );
}

