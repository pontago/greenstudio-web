import { matchSorter } from 'match-sorter';
import portfoliosJson from '~/assets/data/portfolios.json' assert { type: 'json' };

export const PortfolioCategory = {
  IOS: 'iOS',
  ANDROID: 'Android',
  WEB: 'Web',
} as const;

type PortfolioCategoryType = (typeof PortfolioCategory)[keyof typeof PortfolioCategory];

type PortfolioLink = {
  category: PortfolioCategoryType;
  url: string;
};

type Portfolio = {
  name: string;
  categories: PortfolioCategoryType[];
  cover: string;
  subtitle: string;
  description: string;
  techDescription: string;
  images: string[];
  links: PortfolioLink[];
};

export type PortfolioRecord = Portfolio & {
  id: number;
};

const portfolioData = {
  records: {} as Record<number, PortfolioRecord>,

  async getAll(): Promise<PortfolioRecord[]> {
    return Object.keys(portfolioData.records).map((key) => portfolioData.records[Number(key)]);
  },

  async create(index: number, values: Portfolio): Promise<PortfolioRecord> {
    const id = index;
    const newPortfolio = { id, ...values };
    portfolioData.records[id] = newPortfolio;
    return newPortfolio;
  },
};

export async function getPortfolios(query?: string | null) {
  let portfolios = await portfolioData.getAll();
  if (query) {
    portfolios = matchSorter(portfolios, query);
  }
  return portfolios;
}

portfoliosJson.portfolio.forEach((values, id) => {
  portfolioData.create(id, values);
});
