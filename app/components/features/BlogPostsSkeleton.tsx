// カードの高さを固定し、取得前のスケルトンと取得後の実カードでレイアウトがズレない(CLSが出ない)ようにする。
// min-hはPOST_COUNT件ぶんの高さ: モバイル6行 / sm以上2列3行 (auto-rows 13rem + gap-4)。
export const GRID_CLASS =
  'mt-4 w-full grid grid-cols-1 sm:grid-cols-2 auto-rows-[13rem] gap-4 min-h-[83rem] sm:min-h-[41rem]';
export const CARD_CLASS = 'h-full overflow-hidden p-4 rounded-xl border border-gray-200 dark:border-neutral-700';
export const POST_COUNT = 6;

// BlogPosts本体はlazyで切り出しているため、Suspenseのfallbackとしてこれだけが初期チャンクに入る
export const BlogPostsSkeleton = () => (
  <div className={GRID_CLASS}>
    {[...Array(POST_COUNT)].map((_, index) => (
      <ul key={index} className={`${CARD_CLASS} space-y-3`}>
        <li className='h-6 w-full bg-gray-100 rounded dark:bg-neutral-800' />
        <li className='h-4 w-1/2 bg-gray-100 rounded dark:bg-neutral-800' />
        <li className='h-16 w-full bg-gray-100 rounded dark:bg-neutral-800' />
      </ul>
    ))}
  </div>
);
