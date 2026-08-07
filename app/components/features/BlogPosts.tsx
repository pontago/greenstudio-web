import { useEffect, useState } from 'react';
import { Link } from 'react-router';
import { XMLParser } from 'fast-xml-parser';
import { parse, format } from '@formkit/tempo';
import { decode } from 'html-entities';

type BlogPost = {
  title: string;
  pubDate: string;
  link: string;
  description: string;
};

// 同一オリジンの相対パスにすることでCORSプリフライトも余分なDNS解決も発生させない
const FEED_URL = '/wp/feed/';
const POST_COUNT = 6;

// カードの高さを固定し、取得前のスケルトンと取得後の実カードでレイアウトがズレない(CLSが出ない)ようにする。
// min-hはPOST_COUNT件ぶんの高さ: モバイル6行 / sm以上2列3行 (auto-rows 13rem + gap-4)。
const GRID_CLASS =
  'mt-4 w-full grid grid-cols-1 sm:grid-cols-2 auto-rows-[13rem] gap-4 min-h-[83rem] sm:min-h-[41rem]';
const CARD_CLASS = 'h-full overflow-hidden p-4 rounded-xl border border-gray-200 dark:border-neutral-700';

const trimWords = (text: string, count: number) => {
  const doc = new DOMParser().parseFromString(decode(text), 'text/html');
  const plainText = (doc.body.textContent || '').trim();
  return plainText.length > count ? plainText.slice(0, count) + ' ...' : plainText;
};

const fetchBlogPosts = async (): Promise<BlogPost[]> => {
  const response = await fetch(FEED_URL);
  const responseText = await response.text();
  const parser = new XMLParser({ ignoreAttributes: true, processEntities: false });
  const output = parser.parse(responseText);
  return output.rss.channel.item.map((item: BlogPost) => ({
    title: item.title,
    pubDate: item.pubDate,
    link: item.link,
    description: item.description,
  }));
};

const BlogPostsSkeleton = () => (
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

// RSSは実行時にしか取得できないため、プリレンダリング対象から外してクライアント側で読み込む
export const BlogPosts = () => {
  const [posts, setPosts] = useState<BlogPost[] | null>(null);

  useEffect(() => {
    let cancelled = false;

    // フィードは100KB超あり、初期表示中に取りに行くとLCPまでの帯域を奪う。
    // loadイベント後のアイドル時間まで遅らせる。
    const start = () => {
      fetchBlogPosts()
        .catch(() => [])
        .then((blogPosts) => {
          if (!cancelled) {
            setPosts(blogPosts);
          }
        });
    };
    const schedule = () => {
      if (cancelled) return;
      if (typeof window.requestIdleCallback === 'function') {
        window.requestIdleCallback(start, { timeout: 3000 });
      } else {
        window.setTimeout(start, 200);
      }
    };

    if (document.readyState === 'complete') {
      schedule();
    } else {
      window.addEventListener('load', schedule, { once: true });
    }

    return () => {
      cancelled = true;
      window.removeEventListener('load', schedule);
    };
  }, []);

  if (posts === null) {
    return <BlogPostsSkeleton />;
  }

  return (
    <div className={GRID_CLASS}>
      {posts.slice(0, POST_COUNT).map((post, index) => (
        <div key={index} className={CARD_CLASS}>
          <p className='line-clamp-2 font-semibold text-gray-800 hover:text-gray-600 dark:text-neutral-300 dark:hover:text-white'>
            <Link to={post.link} reloadDocument>
              {trimWords(post.title, 50)}
            </Link>
          </p>
          <p className='mt-2 text-xs text-gray-600 dark:text-neutral-400'>
            {format(parse(post.pubDate, 'ddd, DD MMM YYYY HH:mm:ss ZZ', 'en'), { date: 'long', time: 'short' }, 'ja')}
          </p>
          <p className='mt-3 line-clamp-4 text-sm text-gray-600 dark:text-neutral-400'>
            {trimWords(post.description, 98)}
          </p>
        </div>
      ))}
    </div>
  );
};
