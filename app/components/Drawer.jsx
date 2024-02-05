import {Fragment, useState} from 'react';
import {Dialog, Transition} from '@headlessui/react';

export function Drawer({heading, open, onClose, openFrom = 'right', children}) {
  const offScreen = {
    right: 'translate-x-full',
    left: '-translate-x-full',
  };

  return (
    <Transition appear show={open} as={Fragment} className="cart-drawer">
      <Dialog as="div" className="relative z-50" onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0 left-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-25" />
        </Transition.Child>

        <div className="fixed inset-0" >
          <div className="absolute inset-0 overflow-hidden" >
            <div
              className={`fixed inset-y-0 flex max-w-full ${
                openFrom === 'right' ? 'right-0' : ''
              }`}
              
            >
              <Transition.Child
                as={Fragment}
                enter="transform transition ease-in-out duration-300"
                enterFrom={offScreen[openFrom]}
                enterTo="translate-x-0"
                leave="transform transition ease-in-out duration-300"
                leaveFrom="translate-x-0"
                leaveTo={offScreen[openFrom]}
              >
                <Dialog.Panel className="w-screen max-w-lg text-left align-middle transition-all transform shadow-xl h-screen-dynamic bg-contrast">
                  <div
                    className={`sticky top-0 flex items-center px-4 py-3 mb-4 sm:px-8 md:px-12 bg-gray-100 ${
                      heading ? 'justify-between' : 'justify-end'
                    }`}
                  >
                    {heading !== null && (
                      <h6  className='mb-0'>
                          {heading}
                        </h6>
                    )}
                    <button
                      type="button"
                      className="border-0 p-3"
                      onClick={onClose}
                      data-test="close-cart"
                    >
                     <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M2.28167 0.391468C1.7597 -0.130489 0.913438 -0.130489 0.391468 0.391468C-0.130489 0.913438 -0.130489 1.7597 0.391468 2.28167L8.10978 9.99996L0.391548 17.7182C-0.130409 18.2402 -0.130409 19.0865 0.391548 19.6084C0.913518 20.1303 1.75978 20.1303 2.28174 19.6084L9.99996 11.8901L17.7182 19.6084C18.2402 20.1303 19.0865 20.1303 19.6084 19.6084C20.1303 19.0865 20.1303 18.2402 19.6084 17.7182L11.8901 9.99996L19.6086 2.28167C20.1305 1.7597 20.1305 0.913438 19.6086 0.391468C19.0866 -0.130489 18.2403 -0.130489 17.7184 0.391468L9.99996 8.10978L2.28167 0.391468Z" fill="black"></path></svg>
                    </button>
                  </div>
                  {children}
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}

/* Use for associating arialabelledby with the title*/
Drawer.Title = Dialog.Title;

export function useDrawer(openDefault = false) {
  const [isOpen, setIsOpen] = useState(openDefault);

  function openDrawer() {
    setIsOpen(true);
  }

  function closeDrawer() {
    setIsOpen(false);
  }

  return {
    isOpen,
    openDrawer,
    closeDrawer,
  };
}
