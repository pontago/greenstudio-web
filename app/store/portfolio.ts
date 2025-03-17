import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';
import { PortfolioRecord } from '~/models/portfolio';

type PortfolioState = {
  portfolio: PortfolioRecord | null;
  setPortfolio: (portfolio: PortfolioRecord | null) => void;
};
export const usePortfolioStore = create(
  immer<PortfolioState>((set) => ({
    portfolio: null,
    setPortfolio: (portfolio: PortfolioRecord | null) => set({ portfolio }),
  }))
);
