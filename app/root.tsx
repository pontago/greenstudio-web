import { Links, Meta, Outlet, Scripts, ScrollRestoration, useLocation } from 'react-router';
import type { LinksFunction } from 'react-router';
import { useEffect } from 'react';
import { ErrorPage } from '~/components/layout/ErrorPage';
import * as gtag from '~/utils/gtags.client';
import { THEME_INIT_SCRIPT } from '~/utils/theme';

import './tailwind.css';

import { type IStaticMethods } from 'preline/preline';
import DefaultLayout from './components/layout/DefaultLayout';
declare global {
  interface Window {
    HSStaticMethods: IStaticMethods;
  }
}

export const links: LinksFunction = () => [
  {
    rel: 'preload',
    as: 'font',
    type: 'font/woff2',
    href: '/fonts/inter-latin.woff2',
    crossOrigin: 'anonymous',
  },
  { rel: 'icon', type: 'image/png', href: '/favicon-96x96.png', sizes: '96x96' },
  { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' },
  { rel: 'shortcut icon', href: '/favicon.ico' },
  { rel: 'apple-touch-icon', sizes: '180x180', href: '/apple-touch-icon.png' },
  { rel: 'manifest', href: '/site.webmanifest' },
];

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang='ja'>
      <head>
        <meta charSet='utf-8' />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <meta name='apple-mobile-web-app-title' content='GS' />
        <Meta />
        <Links />
        <script dangerouslySetInnerHTML={{ __html: THEME_INIT_SCRIPT }} />
      </head>
      <body>
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  const location = useLocation();

  // prelineはHeader / PortfolioModal / PortfolioGalleryが各自で必要なときに読み込むため、
  // ここでの一括autoInitは重複。292KBのパースが初期表示を塞ぐので行わない。
  useEffect(() => {
    gtag.setupGtag(import.meta.env.VITE_GA_TRACKING_ID);
    gtag.loadGtagScript(import.meta.env.VITE_GA_TRACKING_ID);
  }, []);

  useEffect(() => {
    if (location.pathname !== '/contact') {
      document.body.classList.add('hide-recaptcha');
    } else {
      document.body.classList.remove('hide-recaptcha');
    }

    gtag.pageview(location.pathname, import.meta.env.VITE_GA_TRACKING_ID);
  }, [location.pathname]);

  return <Outlet />;
}

export function HydrateFallback() {
  return (
    <div className='h-48 w-screen font-light flex justify-center items-center'>
      <p>Loading...</p>
    </div>
  );
}

export function ErrorBoundary() {
  return (
    <DefaultLayout>
      <ErrorPage />
    </DefaultLayout>
  );
}
