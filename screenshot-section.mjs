import puppeteer from 'puppeteer';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const screenshotsDir = path.join(__dirname, 'temporary screenshots');
if (!fs.existsSync(screenshotsDir)) fs.mkdirSync(screenshotsDir, { recursive: true });

const url = process.argv[2] || 'http://localhost:3000';

const browser = await puppeteer.launch({ headless: 'new', args: ['--no-sandbox'] });
const page = await browser.newPage();
await page.setViewport({ width: 1440, height: 900 });
await page.goto(url, { waitUntil: 'networkidle2', timeout: 30000 });

// Force all reveal elements visible
await page.evaluate(() => {
  document.querySelectorAll('.reveal').forEach(el => el.classList.add('visible'));
});
await new Promise(r => setTimeout(r, 600));

const sections = [
  { scroll: 0,    name: 'hero' },
  { scroll: 1100, name: 'problem-cards' },
  { scroll: 2400, name: 'how-it-works-steps' },
  { scroll: 3200, name: 'features-grid' },
  { scroll: 4200, name: 'results-stats' },
  { scroll: 5000, name: 'testimonials' },
  { scroll: 6200, name: 'contact-form' },
];

for (const { scroll, name } of sections) {
  await page.evaluate(y => window.scrollTo(0, y), scroll);
  await new Promise(r => setTimeout(r, 400));

  const existing = fs.readdirSync(screenshotsDir)
    .map(f => f.match(/^screenshot-(\d+)/))
    .filter(Boolean).map(m => parseInt(m[1], 10));
  const n = existing.length ? Math.max(...existing) + 1 : 1;
  const filename = `screenshot-${n}-${name}.png`;
  const outPath = path.join(screenshotsDir, filename);

  await page.screenshot({ path: outPath });
  console.log(`Saved: temporary screenshots/${filename}`);
}

await browser.close();
