import { chromium } from 'playwright-core';

const browser = await chromium.launch({
  channel: 'chrome',
  headless: false,
});
const page = await browser.newPage();
await page.goto('http://localhost:5173/print/resume');
await page.waitForTimeout(3000);
await page.pdf({ path: 'resume.pdf', format: 'a4', printBackground: true });
await browser.close();
