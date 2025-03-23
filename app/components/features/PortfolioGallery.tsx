import { useEffect } from 'react';
import { PortfolioRecord } from '~/models/portfolio';

type Props = {
  portfolio: PortfolioRecord;
};

export const PortfolioGallery = ({ portfolio }: Props) => {
  useEffect(() => {
    if (typeof window !== 'undefined') {
      import('preline/preline').then(() => {
        window.HSStaticMethods.autoInit(['carousel']);
      });
    }
  }, []);

  return (
    <>
      {/* Slider */}
      <div
        data-hs-carousel='{
          "loadingClasses": "opacity-0",
          "dotsItemClasses": "hs-carousel-active:bg-blue-700 hs-carousel-active:border-blue-700 size-3 border border-gray-400 rounded-full cursor-pointer dark:border-neutral-600 dark:hs-carousel-active:bg-blue-500 dark:hs-carousel-active:border-blue-500",
          "slidesQty": {
            "xs": 1,
            "md": 2,
            "lg": 3
          },
          "isDraggable": true
        }'
        className='relative'
      >
        <div className='hs-carousel flex flex-col md:flex-row gap-2'>
          <div className='md:order-2 relative grow overflow-hidden min-h-96 bg-white dark:bg-neutral-800 rounded-lg'>
            <div className='hs-carousel-body absolute top-0 bottom-0 start-0 flex flex-nowrap transition-transform duration-700 opacity-0 cursor-grab hs-carousel-dragging:transition-none hs-carousel-dragging:cursor-grabbing'>
              {portfolio.images.map((image, index) => (
                <div key={index} className='hs-carousel-slide'>
                  <div className='flex justify-center h-full bg-gray-100 p-6 dark:bg-neutral-900'>
                    <div className='self-center text-gray-800 transition duration-700 dark:text-white'>
                      <div className='overflow-hidden bg-gray-100 rounded dark:bg-neutral-900'>
                        <img className='h-96 w-auto object-scale-down' src={image} alt='{index}' />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <button
              type='button'
              className='hs-carousel-prev hs-carousel-disabled:opacity-50 hs-carousel-disabled:pointer-events-none absolute inset-y-0 start-0 inline-flex justify-center items-center w-11.5 h-full text-gray-800 hover:bg-gray-800/10 focus:outline-hidden focus:bg-gray-800/10 rounded-s-lg dark:text-white dark:hover:bg-white/10 dark:focus:bg-white/10'
            >
              <span className='text-2xl' aria-hidden='true'>
                <svg
                  className='shrink-0 size-5'
                  xmlns='http://www.w3.org/2000/svg'
                  width='24'
                  height='24'
                  viewBox='0 0 24 24'
                  fill='none'
                  stroke='currentColor'
                  strokeWidth='2'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                >
                  <path d='m15 18-6-6 6-6'></path>
                </svg>
              </span>
              <span className='sr-only'>Previous</span>
            </button>
            <button
              type='button'
              className='hs-carousel-next hs-carousel-disabled:opacity-50 hs-carousel-disabled:pointer-events-none absolute inset-y-0 end-0 inline-flex justify-center items-center w-11.5 h-full text-gray-800 hover:bg-gray-800/10 focus:outline-hidden focus:bg-gray-800/10 rounded-e-lg dark:text-white dark:hover:bg-white/10 dark:focus:bg-white/10'
            >
              <span className='sr-only'>Next</span>
              <span className='text-2xl' aria-hidden='true'>
                <svg
                  className='shrink-0 size-5'
                  xmlns='http://www.w3.org/2000/svg'
                  width='24'
                  height='24'
                  viewBox='0 0 24 24'
                  fill='none'
                  stroke='currentColor'
                  strokeWidth='2'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                >
                  <path d='m9 18 6-6-6-6'></path>
                </svg>
              </span>
            </button>
            <div className='hs-carousel-pagination flex justify-center absolute bottom-3 start-0 end-0 gap-x-2'></div>
          </div>

          {/* <div className='md:order-1 flex-none'>
            <div className='hs-carousel-pagination max-h-96 flex flex-row md:flex-col gap-2 overflow-x-auto md:overflow-x-hidden md:overflow-y-auto'>
              {/portfolio.images.map((image, index) => (
                <div
                  key={index}
                  className='hs-carousel-pagination-item shrink-0 border border-gray-200 rounded-md overflow-hidden cursor-pointer size-20 md:size-32 hs-carousel-active:border-blue-400 dark:border-neutral-700'
                >
                  <div className='flex justify-center items-center text-center size-full bg-gray-100 p-2 dark:bg-neutral-900'>
                    <div className='aspect-w-16 aspect-h-12 overflow-hidden bg-gray-100  dark:bg-neutral-800'>
                      <img className='h-32 w-64 object-scale-down' src={image} alt='{index}' />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div> */}
        </div>
      </div>
      {/* End Slider */}
    </>
  );
};
