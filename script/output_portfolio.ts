import { chromium } from 'playwright-core';

const url = new URL('http://localhost:5173/print/portfolio');
url.searchParams.set('name', process.env.PRINT_NAME ?? '');
url.searchParams.set('birth', process.env.PRINT_BIRTH ?? '');
url.searchParams.set('address', process.env.PRINT_ADDRESS ?? '');

const browser = await chromium.launch({
  channel: 'chrome',
  headless: true,
});
const page = await browser.newPage();
await page.goto(url.toString());
await page.waitForTimeout(3000);
//await page.pdf({ path: 'resume.pdf', format: 'a4', printBackground: true });
const pageHeight = await page.evaluate(() => document.documentElement.scrollHeight);
await page.pdf({ path: 'portfolio.pdf', width: '8.27in', height: pageHeight + 300 + 'px', printBackground: true });
await browser.close();
