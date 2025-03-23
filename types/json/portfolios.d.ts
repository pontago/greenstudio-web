declare module '~/assets/data/portfolios.json' {
  type PortfolioJson = {
    portfolio: Portfolio[];
  };

  const value: PortfolioJson;
  export = value;
}
