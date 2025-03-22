import { Links, Meta, Outlet, Scripts, ScrollRestoration, useLocation } from '@remix-run/react';
import type { LinksFunction } from '@remix-run/node';
import { useEffect } from 'react';
import { Header } from '~/components/layout/Header';
import { Footer } from '~/components/layout/Footer';
import { ErrorPage } from '~/components/layout/ErrorPage';

import './tailwind.css';

import { type IStaticMethods } from 'preline/preline';
declare global {
  interface Window {
    HSStaticMethods: IStaticMethods;
  }
}

export const links: LinksFunction = () => [
  { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
  {
    rel: 'preconnect',
    href: 'https://fonts.gstatic.com',
    crossOrigin: 'anonymous',
  },
  {
    rel: 'stylesheet',
    href: 'https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap',
  },
  { rel: 'icon', type: 'image/png', href: '/images/favicon-96x96.png', sizes: '96x96' },
  { rel: 'icon', type: 'image/svg+xml', href: '/images/favicon.svg' },
  { rel: 'shortcut icon', href: '/favicon.ico' },
  { rel: 'apple-touch-icon', sizes: '180x180', href: '/images/apple-touch-icon.png' },
  { rel: 'manifest', href: '/images/site.webmanifest' },
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
      </head>
      <body>
        <Header />
        {children}
        <Footer />
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  const location = useLocation();

  useEffect(() => {
    if (typeof window !== 'undefined') {
      import('preline/preline').then(() => {
        window.HSStaticMethods.autoInit();
      });
    }
  }, []);

  useEffect(() => {
    if (location.pathname !== '/contact') {
      document.body.classList.add('hide-recaptcha');
    } else {
      document.body.classList.remove('hide-recaptcha');
    }
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
  return <ErrorPage />;
}
