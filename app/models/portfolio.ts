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
  title: string;
  categories: PortfolioCategoryType[];
  cover: string;
  subtitle: string;
  description: string;
  techDescription: string;
  images: string[];
  links: PortfolioLink[];
};

export type PortfolioRecord = Portfolio & {
  id: string;
};

const portfolioData = {
  records: {} as Record<string, PortfolioRecord>,

  async getAll(): Promise<PortfolioRecord[]> {
    return Object.keys(portfolioData.records).map((key) => portfolioData.records[key]);
  },

  async get(id: string): Promise<PortfolioRecord | null> {
    return portfolioData.records[id] || null;
  },

  async create(values: Portfolio): Promise<PortfolioRecord> {
    const id = values.name;
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

export async function getPortfolio(id: string) {
  return portfolioData.get(id);
}

portfoliosJson.portfolio.forEach((values) => {
  portfolioData.create(values);
});
