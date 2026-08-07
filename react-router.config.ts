import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { type Config } from '@react-router/dev/config';

type PortfolioEntry = { name: string };

// prerenderのパス生成はビルド時(Node)に走るため、~/エイリアス経由ではなくJSONを直接読む
const portfoliosJson = JSON.parse(
  readFileSync(fileURLToPath(new URL('./app/assets/data/portfolios.json', import.meta.url)), 'utf-8')
) as { portfolio: PortfolioEntry[] };

export default {
  ssr: false,
  prerender: () => [
    '/',
    '/home',
    '/portfolio',
    '/skill',
    '/resume',
    '/contact',
    '/print/portfolio',
    '/print/resume',
    ...portfoliosJson.portfolio.map((portfolio) => `/portfolio/${portfolio.name}`),
  ],
} satisfies Config;
