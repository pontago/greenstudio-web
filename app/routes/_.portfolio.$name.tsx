import { LoaderFunctionArgs } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
//mport { useEffect } from 'react';
import invariant from 'tiny-invariant';
import { PortfolioModal } from '~/components/features/PortfolioModal';
import { getPortfolio } from '~/models/portfolio';
//import { usePortfolioStore } from '~/store/portfolio';

export const clientLoader = async ({ params }: LoaderFunctionArgs) => {
  invariant(params.name, 'Missing portfolio name param');

  const portfolio = await getPortfolio(params.name);
  if (!portfolio) {
    throw new Response('Not Found', { status: 404 });
  }
  return { portfolio };
};

export default function Portfolio() {
  const { portfolio } = useLoaderData<typeof clientLoader>();
  // const { setPortfolio } = usePortfolioStore();

  // useEffect(() => {
  //   setPortfolio(portfolio);
  // }, []);

  return (
    <>
      <PortfolioModal portfolio={portfolio} closeLink='/portfolio?back=1' />
    </>
  );
}
