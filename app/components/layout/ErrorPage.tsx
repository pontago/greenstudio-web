import { isRouteErrorResponse, useRouteError } from '@remix-run/react';

export const ErrorPage = () => {
  const error = useRouteError();
  let errorStatus;
  let errorStatusText;
  let errorMessage;

  if (isRouteErrorResponse(error)) {
    errorStatus = error.status;
    errorStatusText = error.statusText;
    errorMessage = error.statusText || (error instanceof Error ? error.message : 'エラーが発生しました');
  } else {
    errorStatus = 500;
    errorStatusText = 'Unknown Error';
    errorMessage = 'エラーが発生しました';
  }

  return (
    <div className='max-w-3xl flex flex-col mx-auto size-full'>
      <main id='content'>
        <div className='text-center py-10 px-4 sm:px-6 lg:px-8'>
          <h1 className='block text-7xl font-bold text-gray-800 sm:text-9xl dark:text-white'>{errorStatus}</h1>
          <p className='mt-3 text-gray-600 dark:text-neutral-400'>{errorStatusText}</p>
          <p className='text-gray-600 dark:text-neutral-400'>{errorMessage}</p>
          <div className='mt-5 flex flex-col justify-center items-center gap-2 sm:flex-row sm:gap-3'>
            <a
              className='w-full sm:w-auto py-3 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-medium rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 focus:outline-hidden focus:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none'
              href='/'
            >
              <svg
                className='shrink-0 size-4'
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
                <path d='m15 18-6-6 6-6' />
              </svg>
              ホームへもどる
            </a>
          </div>
        </div>
      </main>
    </div>
  );
};
