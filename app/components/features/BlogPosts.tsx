import { useEffect, useState } from 'react';
import { Link } from 'react-router';
import { XMLParser } from 'fast-xml-parser';
import { parse, format } from '@formkit/tempo';
import { decode } from 'html-entities';
import { BlogPostsSkeleton, CARD_CLASS, GRID_CLASS, POST_COUNT } from './BlogPostsSkeleton';

type BlogPost = {
  title: string;
  pubDate: string;
  link: string;
  description: string;
};

// 同一オリジンの相対パスにすることでCORSプリフライトも余分なDNS解決も発生させない
const FEED_URL = '/wp/feed/';

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

// RSSは実行時にしか取得できないため、プリレンダリング対象から外してクライアント側で読み込む。
// fast-xml-parser / html-entities / tempo を初期チャンクへ持ち込まないよう、_.tsx からlazyで読む。
const BlogPosts = () => {
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

export default BlogPosts;
