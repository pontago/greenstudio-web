import { LoaderFunctionArgs, MetaFunction } from '@remix-run/node';
import { useFetcher, useLoaderData } from '@remix-run/react';
import { useEffect, useState } from 'react';
import { BiLinkExternal } from 'react-icons/bi';
import { FaRegBuilding, FaHome } from 'react-icons/fa';
import { PortfolioModal } from '~/components/features/PortfolioModal';
import { ExternalLink } from '~/components/ui/ExternalLink';
import { getPortfolio, PortfolioRecord } from '~/models/portfolio';

import { getResumes, ResumeCategory } from '~/models/resume';

export const clientLoader = async ({ request }: LoaderFunctionArgs) => {
  try {
    const url = new URL(request.url);
    const portfolioName = url.searchParams.get('portfolio-name');

    if (portfolioName) {
      const portfolio = await getPortfolio(portfolioName);
      return { portfolio };
    } else {
      const resumes = await getResumes();
      return { resumes };
    }
  } catch (error) {
    throw new Response('Internal Server Error', { status: 500 });
  }
};

export const meta: MetaFunction = () => {
  return [{ title: '経歴' }, { name: 'description', content: '個人開発と受託開発の履歴一覧です。' }];
};

export default function Resume() {
  const { resumes } = useLoaderData<typeof clientLoader>();
  const fetcher = useFetcher<typeof clientLoader>();
  const [portfolio, setPortfolio] = useState<PortfolioRecord>();

  useEffect(() => {
    if (fetcher.state === 'idle' && fetcher.data) {
      console.log(fetcher.data);
      setPortfolio(fetcher.data.portfolio ?? undefined);
    }
  }, [fetcher]);

  return (
    <main id='content'>
      <div id='resume' className='w-full max-w-5xl mx-auto py-10 md:pt-16 px-4 sm:px-6 lg:px-8'>
        {/* Timeline */}
        {resumes?.map((resume, index) => (
          <div key={index}>
            {/* Heading */}
            <div className='ps-2 my-2 first:mt-0'>
              <h3 className='text-xs font-medium uppercase text-gray-500 dark:text-neutral-400'>{resume.date}</h3>
            </div>
            {/* End Heading */}
            {/* Item */}
            <div className='flex gap-x-3 relative group rounded-lg hover:bg-gray-100 dark:hover:bg-white/10'>
              {/* <a className='z-1 absolute inset-0' href='#/' /> */}
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
                  {resume.category === ResumeCategory.SOLO && <FaHome className='shrink-0 size-4 mt-1' />}
                  {resume.category === ResumeCategory.CONTRACT && <FaRegBuilding className='shrink-0 size-4 mt-1' />}

                  {resume.title}

                  {resume.category === ResumeCategory.SOLO && (
                    <div className='inline-block mb-1 py-0.5 px-1.5 bg-teal-50 border border-teal-200 text-xs font-medium text-teal-500 rounded-lg dark:bg-teal-800/30 dark:border-teal-800 dark:text-teal-500'>
                      個人開発
                    </div>
                  )}
                  {resume.category === ResumeCategory.CONTRACT && (
                    <div className='inline-block mb-1 py-0.5 px-1.5 bg-teal-50 border border-teal-200 text-xs font-medium text-teal-500 rounded-lg dark:bg-teal-800/30 dark:border-teal-800 dark:text-teal-500'>
                      受託開発
                    </div>
                  )}
                </h3>
                <p
                  className='mt-1 text-sm text-gray-600 dark:text-neutral-400'
                  dangerouslySetInnerHTML={{ __html: resume.description }}
                />
                <p
                  className='mt-1 text-sm text-teal-700 dark:text-neutral-400'
                  dangerouslySetInnerHTML={{ __html: resume.techDescription }}
                />
                {resume.portfolioLink && (
                  <button
                    type='button'
                    aria-haspopup='dialog'
                    aria-expanded='false'
                    aria-controls='hs-portfolio-modal'
                    data-hs-overlay='#hs-portfolio-modal'
                    onClick={() => fetcher.load(`/resume?portfolio-name=${resume.portfolioLink}`)}
                    className='mt-1 -ms-1 p-1 relative z-10 inline-flex items-center gap-x-2 text-xs rounded-lg border border-transparent text-gray-500 hover:bg-white hover:shadow-2xs disabled:opacity-50 disabled:pointer-events-none dark:text-neutral-400 dark:hover:bg-neutral-800'
                  >
                    もっと詳しく
                  </button>
                )}
                <div className='mt-2 flex flex-wrap gap-4'>
                  {resume.links &&
                    resume.links.map((link) => (
                      <div key={link.url}>
                        <ExternalLink href={link.url}>
                          <div className='flex items-center gap-x-0.5 py-1.5 px-3 bg-neutral-100 text-blue-500 border border-gray-200 text-xs sm:text-sm rounded-xl dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 hover:bg-neutral-200'>
                            <p className=''>{link.name}</p>
                            <BiLinkExternal />
                          </div>
                        </ExternalLink>
                      </div>
                    ))}
                </div>
              </div>
              {/* End Right Content */}
            </div>
            {/* End Item */}
          </div>
        ))}
      </div>

      {portfolio && <PortfolioModal portfolio={portfolio} />}
    </main>
  );
}
