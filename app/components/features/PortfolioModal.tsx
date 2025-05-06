import { PortfolioCategory, PortfolioRecord } from '~/models/portfolio';
import { ExternalLink } from '../ui/ExternalLink';
import { PortfolioGallery } from './PortfolioGallery';
import { BiLinkExternal } from 'react-icons/bi';
import { useEffect, useRef } from 'react';
import { MdClose } from 'react-icons/md';

import { HSOverlay } from 'preline/preline';
import { useLocation, useNavigate } from 'react-router';

declare global {
  interface Window {
    HSOverlay: HSOverlay;
  }
}

type Props = {
  portfolio: PortfolioRecord | null;
  closeLink?: string;
};

export const PortfolioModal = ({ portfolio, closeLink }: Props) => {
  const location = useLocation();
  const navigate = useNavigate();
  const refModal = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      import('preline/preline').then((preline) => {
        preline.HSOverlay.autoInit();
        if (refModal.current) {
          if (closeLink) {
            preline.HSOverlay.on('close', refModal.current, () => {
              navigate(closeLink, { replace: true, preventScrollReset: true });
            });
          }
          preline.HSOverlay.open(refModal.current);
        }
      });
    }
  }, [location.pathname, navigate, closeLink]);

  return (
    <>
      {/* Portfolio Modal */}
      <div
        ref={refModal}
        id='hs-portfolio-modal'
        className='hs-overlay hidden size-full fixed top-0 start-0 z-50 overflow-y-auto pointer-events-none'
        role='dialog'
        tabIndex={-1}
        aria-labelledby='hs-portfolio-modal-label'
      >
        <div className='hs-overlay-animation-target hs-overlay-open:scale-100 hs-overlay-open:opacity-100 hs-overlay-open:duration-500 mt-7 mb-7 scale-95 opacity-0 ease-out transition-all sm:max-w-5xl sm:w-full m-3 sm:mx-auto flex items-center'>
          <div className='w-full flex flex-col bg-white border border-gray-200 shadow-2xs rounded-xl pointer-events-auto dark:bg-neutral-800 dark:border-neutral-700 dark:shadow-neutral-700/70'>
            <div className='flex justify-between items-center py-3 px-4 border-b border-gray-200 dark:border-neutral-700'>
              <h3 id='hs-portfolio-modal-label' className='font-bold text-gray-800 dark:text-white'>
                {portfolio?.title}
              </h3>
              <button
                type='button'
                className='size-8 inline-flex justify-center items-center gap-x-2 rounded-full border border-transparent bg-gray-100 text-gray-800 hover:bg-gray-200 focus:outline-hidden focus:bg-gray-200 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-700 dark:hover:bg-neutral-600 dark:text-neutral-400 dark:focus:bg-neutral-600'
                aria-label='Close'
                data-hs-overlay='#hs-portfolio-modal'
              >
                <span className='sr-only'>Close</span>
                <MdClose className='shrink-0 size-4' />
              </button>
            </div>
            <div className='flex flex-col overflow-y-auto'>
              <div className='p-4'>
                {portfolio && (
                  <>
                    <p
                      className='text-gray-800 dark:text-neutral-400'
                      dangerouslySetInnerHTML={{ __html: portfolio.description }}
                    />
                    <p
                      className='mt-2 text-gray-800 dark:text-neutral-400'
                      dangerouslySetInnerHTML={{ __html: portfolio.techDescription }}
                    />
                  </>
                )}

                <div className='mt-2 flex flex-wrap gap-4'>
                  {portfolio &&
                    portfolio.links.map((link) => (
                      <div key={link.url}>
                        <ExternalLink href={link.url}>
                          {link.category == PortfolioCategory.IOS && (
                            <img src='/images/appstore-badge.svg' alt='AppStore' />
                          )}
                          {link.category == PortfolioCategory.ANDROID && (
                            <img src='/images/google-play-badge.svg' alt='PlayStore' />
                          )}
                          {link.category == PortfolioCategory.WEB && (
                            <div className='flex items-center gap-x-0.5 py-1.5 px-3 bg-neutral-100 text-blue-500 border border-gray-200 text-xs sm:text-sm rounded-xl dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 hover:bg-neutral-200'>
                              <p className=''>Webサイトへ</p>
                              <BiLinkExternal />
                            </div>
                          )}
                        </ExternalLink>
                      </div>
                    ))}
                </div>
              </div>
              <div className='items-center gap-x-2 py-3 px-4 border-gray-200 dark:border-neutral-700'>
                {portfolio && <PortfolioGallery portfolio={portfolio} />}
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* End Portfolio Modal */}
    </>
  );
};
