import clsx from 'clsx';
import { PortfolioCategory, PortfolioRecord } from '~/models/portfolio';
import { Link } from 'react-router';

type Props = {
  portfolios: PortfolioRecord[];
};

export const Portfolio = ({ portfolios }: Props) => {
  return (
    <>
      <div className='py-4 grid grid-cols-1 sm:grid-cols-3 gap-8 lg:gap-12 justify-items-center'>
        {portfolios.map((portfolio) => (
          <div key={portfolio.id}>
            <Link
              to={`/portfolio/${portfolio.name}`}
              className='group flex flex-col focus:outline-hidden text-left'
              preventScrollReset
            >
              <div className='overflow-hidden bg-gray-100 rounded dark:bg-neutral-800'>
                <img
                  className='h-48 w-96 group-hover:scale-105 group-focus:scale-105 transition-transform duration-500 ease-in-out object-cover rounded'
                  src={portfolio.cover}
                  alt={portfolio.title}
                />
              </div>
              <div className='pt-4'>
                <h3 className='relative inline-block font-medium text-black before:absolute before:bottom-0.5 before:start-0 before:-z-1 before:w-full before:h-1 before:bg-lime-400 before:transition before:origin-left before:scale-x-0 group-hover:before:scale-x-100 dark:text-white'>
                  {portfolio.title}
                </h3>
                <p className='text-sm mt-1 text-gray-600 dark:text-neutral-400'>{portfolio.subtitle}</p>
                <div className='mt-3 flex flex-wrap gap-2'>
                  {portfolio.categories.map((category) => (
                    <span
                      key={category}
                      className='py-1.5 px-3 bg-white text-gray-600 border border-gray-200 text-xs sm:text-sm rounded-xl dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400'
                    >
                      {clsx(
                        category === PortfolioCategory.IOS && 'iOS',
                        category === PortfolioCategory.ANDROID && 'Android',
                        category === PortfolioCategory.WEB && 'Web'
                      )}
                    </span>
                  ))}
                </div>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </>
  );
};
