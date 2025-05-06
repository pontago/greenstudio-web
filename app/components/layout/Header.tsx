import { NavLink, useLocation } from 'react-router';
import clsx from 'clsx';
import { useEffect, useRef, useState } from 'react';

type NavLinkItem = {
  name: string;
  to: string;
  isRoot?: boolean;
  scrollReset?: boolean;
  isExternal?: boolean;
};
type NavLinkStatus = {
  to: string;
  isActive: boolean;
};

const navLinks: NavLinkItem[] = [
  { name: 'ホーム', to: '/', isRoot: true },
  { name: 'ポートフォリオ', to: '/portfolio' },
  { name: 'スキル', to: '/skill' },
  { name: '経歴', to: '/resume', scrollReset: true },
  { name: 'お問い合わせ', to: '/contact', scrollReset: true },
  { name: 'ブログ', to: 'https://www.greenstudio.jp/wp/', isExternal: true },
];

export const Header = () => {
  const location = useLocation();
  const [navLinkStatus, setNavLinkStatus] = useState<NavLinkStatus[]>([]);
  const refNav = useRef<HTMLButtonElement>(null);

  // NavLinkがSPAモードで/の状態が上手く反映されないための対応
  // https://github.com/remix-run/react-router/issues/13010
  useEffect(() => {
    if (typeof window !== 'undefined') {
      import('preline/preline').then((preline) => {
        preline.HSCollapse.autoInit();
        if (refNav.current) {
          preline.HSCollapse.hide(refNav.current);
        }
      });
    }

    const navState = navLinks.reduce((acc, link) => {
      acc.push({ to: link.to, isActive: link.to === location.pathname });
      return acc;
    }, [] as NavLinkStatus[]);

    setNavLinkStatus(navState);
  }, [location.pathname]);

  return (
    <header className='sticky top-0 inset-x-0 flex flex-wrap md:justify-start md:flex-nowrap z-40 w-full before:absolute before:inset-0 before:max-w-5xl before:mx-2 lg:before:mx-auto before:rounded-6.5 before:bg-white-800/30 before:backdrop-blur-md'>
      <nav className='relative max-w-5xl w-full py-2.5 ps-5 pe-2 md:flex md:items-center md:justify-between md:py-0 mx-2 lg:mx-auto'>
        <div className='px-4 md:px-0 flex justify-between items-center'>
          <div className='flex items-center'>
            <a
              className='flex-none rounded-md text-xl inline-block font-semibold focus:outline-hidden focus:opacity-80 text-black dark:text-white'
              href='/'
              aria-label='GREEN STUDIO'
            >
              GREEN STUDIO
            </a>
          </div>

          <div className='md:hidden'>
            <button
              ref={refNav}
              type='button'
              className='hs-collapse-toggle flex justify-center items-center size-7 border border-gray-200 text-gray-500 rounded-full hover:bg-gray-200 focus:outline-hidden focus:bg-gray-200 dark:border-neutral-700 dark:text-neutral-400 dark:hover:bg-neutral-700 dark:focus:bg-neutral-700'
              id='hs-navbar-header-floating-collapse'
              aria-expanded='false'
              aria-controls='hs-navbar-header-floating'
              aria-label='Toggle navigation'
              data-hs-collapse='#hs-navbar-header-floating'
            >
              <svg
                className='hs-collapse-open:hidden shrink-0 size-3.5'
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
                <line x1='3' x2='21' y1='6' y2='6' />
                <line x1='3' x2='21' y1='12' y2='12' />
                <line x1='3' x2='21' y1='18' y2='18' />
              </svg>
              <svg
                className='hs-collapse-open:block hidden shrink-0 size-4'
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
                <path d='M18 6 6 18' />
                <path d='m6 6 12 12' />
              </svg>
            </button>
          </div>
        </div>

        <div
          id='hs-navbar-header-floating'
          className='hidden hs-collapse overflow-hidden transition-all duration-300 basis-full grow md:block'
          aria-labelledby='hs-navbar-header-floating-collapse'
        >
          <div className='flex flex-col md:flex-row md:items-center md:justify-end gap-2 md:gap-3 mt-3 md:mt-0 py-2 md:py-0 md:ps-7'>
            {navLinks.map((link, index) => (
              <NavLink
                key={index}
                to={link.to}
                className={() => {
                  const fixedActive = navLinkStatus.find((status) => status.to === link.to)?.isActive;
                  return clsx(
                    'py-0.5 md:py-3 px-4 md:px-1 border-s-2 md:border-s-0 md:border-b-2 text-gray-500 hover:text-gray-800 focus:outline-hidden dark:text-neutral-400 dark:hover:text-neutral-200',
                    fixedActive ? 'border-gray-800' : 'border-transparent'
                  );
                }}
                preventScrollReset={!link.scrollReset}
                reloadDocument={link.isExternal}
              >
                {link.name}
              </NavLink>
            ))}
          </div>
        </div>
      </nav>
    </header>
  );
};
