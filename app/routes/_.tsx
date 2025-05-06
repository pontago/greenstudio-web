import type { MetaFunction } from 'react-router';
import { IconContext } from 'react-icons';
import { FaXTwitter, FaGithub, FaGooglePlay, FaAngleRight } from 'react-icons/fa6';
import { FaAppStore } from 'react-icons/fa';
import { Await, Link, Outlet, useLoaderData, useLocation } from 'react-router';
import { getSkills, SkillCategory } from '~/models/skill';
import { BiLinkExternal } from 'react-icons/bi';
import { Skill } from '~/components/features/Skill';
import { getPortfolios } from '~/models/portfolio';
import { Portfolio } from '~/components/features/Portfolio';
import { Suspense, useEffect, useRef } from 'react';
import { ExternalLink } from '~/components/ui/ExternalLink';
import { XMLParser } from 'fast-xml-parser';
import { parse, format } from '@formkit/tempo';
import { decode } from 'html-entities';
import DefaultLayout from '~/components/layout/DefaultLayout';

type BlogPost = {
  title: string;
  pubDate: string;
  link: string;
  description: string;
  category: string[];
};

export const clientLoader = async () => {
  try {
    const skills = getSkills();
    const portfolios = getPortfolios();

    const getBlogPosts = async (): Promise<BlogPost[]> => {
      try {
        const response = await fetch('https://www.greenstudio.jp/wp/feed/');
        const responseText = await response.text();
        const options = {
          ignoreAttributes: true,
          processEntities: false,
        };
        const parser = new XMLParser(options);
        const output = parser.parse(responseText);
        return output.rss.channel.item.map((item: BlogPost) => {
          return {
            title: item.title,
            pubDate: item.pubDate,
            link: item.link,
            description: item.description,
            categories: item.category,
          };
        });
      } catch (error) {
        console.error(error);
      }
      return [];
    };
    const blogPosts = getBlogPosts();

    return { skills, portfolios, blogPosts };
  } catch (error) {
    throw new Response('Internal Server Error', { status: 500 });
  }
};

export const meta: MetaFunction = () => {
  return [
    { title: 'GREEN STUDIO' },
    {
      name: 'description',
      content: 'iOS、Android、Webアプリを開発しています。個人開発と平行して受託開発もおこなっています。',
    },
  ];
};

export default function Layout() {
  const location = useLocation();
  const { skills, portfolios, blogPosts } = useLoaderData<typeof clientLoader>();
  const refHome = useRef<HTMLDivElement>(null);
  const refPortfolio = useRef<HTMLDivElement>(null);
  const refSkill = useRef<HTMLDivElement>(null);

  const trimWords = (text: string, count: number) => {
    const plainText = decode(text)
      .replace(/<[^>]+>/g, '')
      .trim();
    return plainText.length > count ? plainText.slice(0, count) + ' ...' : plainText;
  };

  useEffect(() => {
    let ref: HTMLDivElement | null = null;
    switch (location.pathname) {
      case '/':
        ref = refHome.current;
        break;
      case '/portfolio':
        if (!location.search.includes('back=1')) {
          ref = refPortfolio.current;
        }
        break;
      case '/skill':
        ref = refSkill.current;
        break;
    }
    ref?.scrollIntoView({ behavior: 'smooth' });
  }, [location.pathname, location.search]);

  return (
    <DefaultLayout>
      <main id='content'>
        <div
          id='home'
          ref={refHome}
          className='w-full max-w-5xl mx-auto pt-10 md:pt-16 px-4 sm:px-6 lg:px-8 scroll-mt-14'
        >
          {/* Avator */}
          <div id='profile' className='flex items-center gap-x-3'>
            <div className='shrink-0'>
              <img className='shrink-0 size-16 rounded-full' src='/images/avatar.png' alt='Avatar' />
            </div>

            <div className='grow'>
              <h1 className='text-lg font-medium text-gray-800 dark:text-neutral-200'>PONTAGO</h1>
              <p className='text-sm text-gray-600 dark:text-neutral-400'>iOS, Android, Web Developer</p>
            </div>
          </div>
          {/* End Avator */}

          {/* Profile */}
          <div className='mt-8'>
            <div className='text-sm text-gray-600 dark:text-neutral-400'>
              <p>東京に住んでいる1985年生まれの男です。2006年からフリーランスとして活動しています。</p>
              <p>
                個人アプリの開発と並行して受託開発もおこなっています。iOS、Android、Webアプリの開発が得意です。サーバ構築などバックエンドからフロントエンドまでフルスタックでの対応可能です。
              </p>
              <p className='mt-2'>
                中学生時代にプログラミングに興味を持って以来、よくわからないものを量産し続けている。たくさんの人たちに使ってもらえるような面白いものを作りたい。
              </p>
              <p className='mt-2'>ラーメンとボルダリングが好き。</p>
            </div>
            <IconContext.Provider value={{ className: 'text-gray-800 dark:text-neutral-200' }}>
              <div className='flex justify-start'>
                <ul className='mt-5 flex flex-col gap-y-3'>
                  <li className='flex items-center gap-x-2.5'>
                    <FaXTwitter />
                    <a
                      className='text-[13px] text-gray-500 hover:text-gray-800 hover:decoration-2 focus:outline-hidden focus:decoration-2 dark:text-neutral-500 dark:hover:text-neutral-400'
                      href='https://x.com/happytar0'
                    >
                      @happytar0
                    </a>
                  </li>
                  <li className='flex items-center gap-x-2.5'>
                    <FaGithub />
                    <a
                      className='text-[13px] text-gray-500 hover:text-gray-800 hover:decoration-2 focus:outline-hidden focus:decoration-2 dark:text-neutral-500 dark:hover:text-neutral-400'
                      href='https://github.com/pontago'
                    >
                      @pontago
                    </a>
                  </li>
                  <li className='flex items-center gap-x-2.5'>
                    <FaAppStore />
                    <a
                      className='text-[13px] text-gray-500 hover:text-gray-800 hover:decoration-2 focus:outline-hidden focus:decoration-2 dark:text-neutral-500 dark:hover:text-neutral-400'
                      href='https://apps.apple.com/jp/developer/greenstudio/id406307134'
                    >
                      AppStore
                    </a>
                  </li>
                  <li className='flex items-center gap-x-2.5'>
                    <FaGooglePlay />
                    <a
                      className='text-[13px] text-gray-500 hover:text-gray-800 hover:decoration-2 focus:outline-hidden focus:decoration-2 dark:text-neutral-500 dark:hover:text-neutral-400'
                      href='https://play.google.com/store/apps/developer?id=GREENSTUDIO'
                    >
                      Google Play
                    </a>
                  </li>
                </ul>
                <ul className='mt-5 mx-10 flex flex-col gap-y-3'>
                  <li className='flex items-center gap-x-2.5'>
                    <BiLinkExternal />
                    <a
                      className='text-[13px] text-gray-500 hover:text-gray-800 hover:decoration-2 focus:outline-hidden focus:decoration-2 dark:text-neutral-500 dark:hover:text-neutral-400'
                      href='https://www.lancers.jp/profile/greenstudio'
                    >
                      Lancers
                    </a>
                  </li>
                  <li className='flex items-center gap-x-2.5'>
                    <BiLinkExternal />
                    <a
                      className='text-[13px] text-gray-500 hover:text-gray-800 hover:decoration-2 focus:outline-hidden focus:decoration-2 dark:text-neutral-500 dark:hover:text-neutral-400'
                      href='https://crowdworks.jp/public/employees/379114'
                    >
                      クラウドワークス
                    </a>
                  </li>
                </ul>
              </div>
            </IconContext.Provider>
          </div>
          {/* End Profile */}

          {/* Blog */}
          <div className='my-8'>
            <div className='flex'>
              <h2 className='font-medium text-gray-800 dark:text-neutral-200'>新着ブログ</h2>
              <Link to='https://www.greenstudio.jp/wp/' className='flex place-self-end group' reloadDocument>
                <div className='ml-2 mb-0.5 text-xs text-gray-400 group-hover:text-gray-200 dark:text-neutral-500 dark:group-hover:text-white'>
                  もっと見る
                </div>
                <FaAngleRight className='text-gray-400 group-hover:text-gray-200 dark:text-neutral-500 dark:group-hover:text-white size-3 mt-0.5' />
              </Link>
            </div>

            <div className='mt-4 w-full grid grid-rows-6 grid-cols-1 sm:grid-rows-3 sm:grid-cols-2 gap-4'>
              <Suspense
                fallback={
                  <>
                    {[...Array(6)].map((index) => (
                      <ul
                        key={index}
                        className=' space-y-3 p-4 rounded-xl border border-gray-200 dark:border-neutral-700'
                      >
                        <li className='h-6 w-full bg-gray-100 rounded dark:bg-neutral-800' />
                        <li className='h-4 w-1/2 bg-gray-100 rounded dark:bg-neutral-800' />
                        <li className='h-16 w-full bg-gray-100 rounded dark:bg-neutral-800' />
                      </ul>
                    ))}
                  </>
                }
              >
                <Await resolve={blogPosts}>
                  {(blogPosts) =>
                    blogPosts.slice(0, 6).map((post, index) => (
                      <div key={index} className='p-4 rounded-xl border border-gray-200 dark:border-neutral-700'>
                        <p className='font-semibold text-gray-800 hover:text-gray-600 dark:text-neutral-300 dark:hover:text-white'>
                          <Link to={post.link} reloadDocument>
                            {trimWords(post.title, 50)}
                          </Link>
                        </p>
                        <p className='mt-2 text-xs text-gray-600 dark:text-neutral-400'>
                          {format(
                            parse(post.pubDate, 'ddd, DD MMM YYYY HH:mm:ss ZZ'),
                            { date: 'full', time: 'short' },
                            'ja'
                          )}
                        </p>
                        <p className='mt-3 text-sm text-gray-600 dark:text-neutral-400'>
                          {trimWords(post.description, 98)}
                        </p>
                      </div>
                    ))
                  }
                </Await>
              </Suspense>
            </div>
          </div>

          {/* End Blog */}

          {/* Portfolio */}

          <div id='portfolio' ref={refPortfolio} className='my-8 scroll-mt-14'>
            <h2 className='font-medium text-gray-800 dark:text-neutral-200'>ポートフォリオ</h2>
            <div className='mb-2 text-xs text-gray-600 dark:text-neutral-400'>
              ポートフォリオの一部を表示しています。その他は<Link to='/resume'>経歴ページ</Link>
              からご確認いただけます。
            </div>

            <Suspense
              fallback={
                <>
                  <div className='py-4 grid grid-cols-1 sm:grid-cols-3 gap-8 lg:gap-12 justify-items-center'>
                    {[...Array(6)].map((index) => (
                      <div key={index}>
                        <div className='group flex flex-col focus:outline-hidden text-left'>
                          <div className='h-40 w-60 bg-gray-100 rounded dark:bg-neutral-800'></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </>
              }
            >
              <Await resolve={portfolios}>{(portfolios) => <Portfolio portfolios={portfolios} />}</Await>
            </Suspense>
          </div>

          {/* End Portfolio */}

          {/* Skills */}
          <div id='skill' ref={refSkill} className='my-10 sm:my-14 scroll-mt-14'>
            <h2 className='font-medium text-gray-800 dark:text-neutral-200'>スキル</h2>
            <div className='mt-4 w-1/2'>
              <div className='flex justify-normal'>
                <div className='inline-block mb-2 ms-[calc(33%-20px)] py-0.5 px-1.5 bg-blue-50 border border-blue-200 text-xs font-medium text-blue-600 rounded-lg dark:bg-blue-800/30 dark:border-blue-800 dark:text-blue-500'>
                  Level1
                </div>
                <div className='inline-block mb-2 ms-[calc(33%-50px)] py-0.5 px-1.5 bg-teal-50 border border-teal-200 text-xs font-medium text-teal-500 rounded-lg dark:bg-teal-800/30 dark:border-teal-800 dark:text-teal-500'>
                  Level2
                </div>
                <div className='inline-block mb-2 ms-[calc(33%-50px)] py-0.5 px-1.5 bg-yellow-50 border border-yellow-200 text-xs font-medium text-yellow-500 rounded-lg dark:bg-yellow-800/30 dark:border-yellow-800 dark:text-yellow-500'>
                  Level3
                </div>
              </div>
              <div className='flex h-1.5 bg-gray-200 rounded-full overflow-hidden dark:bg-neutral-700'>
                <div
                  className='flex flex-col justify-center overflow-hidden bg-blue-600 text-xs text-white text-center whitespace-nowrap'
                  style={{ width: '33%' }}
                  role='progressbar'
                  aria-valuenow={10}
                  aria-valuemin={0}
                  aria-valuemax={30}
                />
                <div
                  className='flex flex-col justify-center overflow-hidden bg-teal-500 text-xs text-white text-center whitespace-nowrap'
                  style={{ width: '33%' }}
                  role='progressbar'
                  aria-valuenow={10}
                  aria-valuemin={0}
                  aria-valuemax={30}
                />
                <div
                  className='flex flex-col justify-center overflow-hidden bg-yellow-500 text-xs text-white text-center whitespace-nowrap'
                  style={{ width: '34%' }}
                  role='progressbar'
                  aria-valuenow={10}
                  aria-valuemin={0}
                  aria-valuemax={30}
                />
              </div>
            </div>
            <div className='mt-2'>
              <div className='inline-block mb-1 py-0.5 px-1.5 bg-blue-50 border border-blue-200 text-xs font-medium text-blue-600 rounded-lg dark:bg-blue-800/30 dark:border-blue-800 dark:text-blue-500'>
                Level1
              </div>
              <p className='text-xs text-gray-600 dark:text-neutral-400'>
                簡単なプログラムを作成・修正できる。もしくは最近使用していない。
              </p>
              <div className='inline-block mb-1 py-0.5 px-1.5 bg-teal-50 border border-teal-200 text-xs font-medium text-teal-500 rounded-lg dark:bg-teal-800/30 dark:border-teal-800 dark:text-teal-500'>
                Level2
              </div>
              <p className='text-xs text-gray-600 dark:text-neutral-400'>
                個人アプリ開発、受託開発で使用したことがある。直近使用率低め、経験が不十分だと感じるレベル。
              </p>
              <div className='inline-block mb-1 py-0.5 px-1.5 bg-yellow-50 border border-yellow-200 text-xs font-medium text-yellow-500 rounded-lg dark:bg-yellow-800/30 dark:border-yellow-800 dark:text-yellow-500'>
                Level3
              </div>
              <p className='text-xs text-gray-600 dark:text-neutral-400'>
                個人アプリ開発、受託開発で使用したことがある。直近5年以内で使用している。
              </p>
            </div>

            <div className='grid grid-cols-1 mt-2 sm:grid-cols-2 gap-x-3 border-gray-200  divide-gray-200 dark:border-neutral-700 dark:divide-neutral-700'>
              <Suspense
                fallback={
                  <>
                    <div className='sm:-ms-4 sm:px-4'>
                      <ul className='mt-5 space-y-3'>
                        {[...Array(10)].map((index) => (
                          <li key={index} className='w-full h-4 bg-gray-200 rounded-full dark:bg-neutral-700' />
                        ))}
                      </ul>
                    </div>
                    <div className='sm:px-4'>
                      <ul className='mt-5 space-y-3'>
                        {[...Array(10)].map((index) => (
                          <li key={index} className='w-full h-4 bg-gray-200 rounded-full dark:bg-neutral-700' />
                        ))}
                      </ul>
                    </div>
                  </>
                }
              >
                <Await resolve={skills}>
                  {(skills) => (
                    <>
                      <div className='sm:-ms-4 sm:px-4'>
                        <Skill
                          category={SkillCategory.LANGUAGES}
                          records={skills.filter((skill) => skill.category === SkillCategory.LANGUAGES)}
                        />
                      </div>

                      <div className='sm:px-4'>
                        <Skill
                          category={SkillCategory.FRAMEWORKS}
                          records={skills.filter((skill) => skill.category === SkillCategory.FRAMEWORKS)}
                        />
                      </div>
                    </>
                  )}
                </Await>
              </Suspense>
            </div>
          </div>

          <div>
            <div className='mb-2 text-gray-600 dark:text-neutral-400'>その他</div>
            <div className='text-sm text-gray-600 dark:text-neutral-400'>
              GitHub Actions, Docker, Tailwind, Vuetify, Preline UI, ActionScript, CodeIgniter, memcached, TokyoTyrant,
              Redis, qmail, Postfix, CourierIMAP, Dovecot, SpamAssassin, bsfilter, ClamAV, bind, Samba, NFS, Apache,
              lighttpd, Nginx, SQLite
            </div>
          </div>

          <div className='my-8'>
            <ExternalLink href='https://wakatime.com/@pontago'>
              <div className='flex items-center gap-x-0.5'>
                <div className='text-gray-600 dark:text-neutral-400'>WakaTime</div>
                <BiLinkExternal />
              </div>
            </ExternalLink>
            <embed
              className='h-76 sm:h-96 dark:bg-gray-500'
              src='https://wakatime.com/share/@pontago/c6f3c792-c14f-419a-aa08-2e5c8551d071.svg'
            ></embed>
          </div>
          {/* End Skills */}
        </div>
        <Outlet />
      </main>
    </DefaultLayout>
  );
}
