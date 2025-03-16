import { MetaFunction } from '@remix-run/node';
import { FaRegBuilding } from 'react-icons/fa';

export const meta: MetaFunction = () => {
  return [{ title: '開発履歴' }, { name: 'description', content: 'Welcome to Remix!' }];
};

export default function Resume() {
  return (
    <main id='content'>
      <div id='resume' className='w-full max-w-5xl mx-auto py-10 md:pt-16 px-4 sm:px-6 lg:px-8'>
        {/* Timeline */}
        <div>
          {/* Heading */}
          <div className='ps-2 my-2 first:mt-0'>
            <h3 className='text-xs font-medium uppercase text-gray-500 dark:text-neutral-400'>2024年〜</h3>
          </div>
          {/* End Heading */}
          {/* Item */}
          <div className='flex gap-x-3 relative group rounded-lg hover:bg-gray-100 dark:hover:bg-white/10'>
            <a className='z-1 absolute inset-0' href='#/' />
            {/* Icon */}
            <div className='relative last:after:hidden after:absolute after:top-0 after:bottom-0 after:start-3.5 after:w-px after:-translate-x-[0.5px] after:bg-gray-200 dark:after:bg-neutral-700 dark:group-hover:after:bg-neutral-600'>
              <div className='relative z-10 size-7 flex justify-center items-center'>
                <div className='size-2 rounded-full bg-white border-2 border-gray-300 group-hover:border-gray-600 dark:bg-neutral-800 dark:border-neutral-600 dark:group-hover:border-neutral-600' />
              </div>
            </div>
            {/* End Icon */}
            {/* Right Content */}
            <div className='grow p-2 pb-8'>
              <h3 className='flex gap-x-1.5 font-semibold text-gray-800 dark:text-white'>
                <FaRegBuilding className='shrink-0 size-4 mt-1' />
                収支管理アプリ
                <div className='inline-block mb-1 py-0.5 px-1.5 bg-teal-50 border border-teal-200 text-xs font-medium text-teal-500 rounded-lg dark:bg-teal-800/30 dark:border-teal-800 dark:text-teal-500'>
                  個人開発
                </div>
              </h3>
              <p className='mt-1 text-sm text-gray-600 dark:text-neutral-400'>
                収支を管理するアプリです。家計簿、投資・キャンブルの収支管理を簡単におこなえます。
                <br />
                カレンダーでの収支一覧表示、カテゴリ・タグでの分類、グラフ表示などすべての機能が無料で使えます。
              </p>
              <p className='mt-1 text-sm text-gray-600 dark:text-neutral-400'>
                iOS/Android、Flutter（3系）、Dart、Riverpod、drift、SQLite3、Firebase、RevenueCat。
                <br />
                設計からプログラミングまですべて担当。レイヤードアーキテクチャで実装してみました。
              </p>
              <button
                type='button'
                className='mt-1 -ms-1 p-1 relative z-10 inline-flex items-center gap-x-2 text-xs rounded-lg border border-transparent text-gray-500 hover:bg-white hover:shadow-2xs disabled:opacity-50 disabled:pointer-events-none dark:text-neutral-400 dark:hover:bg-neutral-800'
              >
                もっと詳しく
              </button>
            </div>
            {/* End Right Content */}
          </div>
          {/* End Item */}
        </div>
      </div>
    </main>
  );
}
