import { useLoaderData, useSearchParams } from 'react-router';
import { BiLinkExternal } from 'react-icons/bi';
import { ExternalLink } from '~/components/ui/ExternalLink';
import { getPortfolios, PortfolioCategory } from '~/models/portfolio';

export const clientLoader = async () => {
  try {
    const portfolios = await getPortfolios(null, true);

    return { portfolios };
  } catch (error) {
    throw new Response('Internal Server Error', { status: 500 });
  }
};

export default function PrintResume() {
  const { portfolios } = useLoaderData<typeof clientLoader>();
  const [searchParams] = useSearchParams();

  return (
    <main id='content' className='my-4'>
      <div id='home' className='w-full max-w-5xl mx-auto  px-4 sm:px-6 lg:px-8'>
        {/* Profile */}
        <div id='profile'>
          <h2 className='text-lg font-semibold w-full text-center  text-gray-800 dark:text-neutral-200'>
            ポートフォリオ
          </h2>
          <div className='mt-4'>
            <p>氏名： {searchParams.get('name')}</p>
            <p>生年月： {searchParams.get('birth')}</p>
            <p>居住地： {searchParams.get('address')}</p>
          </div>
        </div>
        {/* End Profile */}

        <div className='mt-3 pt-3 border-t border-gray-200 dark:border-neutral-700'>
          <h2 className='text-normal font-semibold text-gray-800 dark:text-neutral-200'>SNS</h2>
          <div className='flex justify-start'>
            <ul className='mt-2 flex flex-col gap-y-3'>
              <li className='flex items-center gap-x-2.5'>
                HP：
                <a href='https://greenstudio.jp/' className='text-blue-500'>
                  https://greenstudio.jp/
                </a>
              </li>
              <li className='flex items-center gap-x-2.5'>
                ブログ：
                <a href='https://greenstudio.jp/blog/' className='text-blue-500'>
                  https://greenstudio.jp/blog/
                </a>
              </li>
              <li className='flex items-center gap-x-2.5'>
                GitHub：
                <a href='https://github.com/pontago' className='text-blue-500'>
                  https://github.com/pontago
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Portfolio */}
        <div id='portfolio' className='my-4 sm:my-4'>
          <div>
            {portfolios.map((portfolio) => (
              <div key={portfolio.id} className='border-t border-gray-200 dark:border-neutral-700 mt-4'>
                <div className='mt-2 border-gray-200  divide-gray-200 dark:border-neutral-700 dark:divide-neutral-700'>
                  <img className='mx-auto h-64 object-contain rounded' src={portfolio.cover} alt={portfolio.title} />
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
                </div>

                <div className='w-full mt-4 grid grid-cols-3 gap-4'>
                  {portfolio.images.map((image, index) => (
                    <div key={index} className='bg-gray-100 p-6 dark:bg-neutral-900'>
                      <img className='h-72 mx-auto object-scale-down' src={image} alt='{index}' />
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
        {/* End Portfolio */}
      </div>
    </main>
  );
}
