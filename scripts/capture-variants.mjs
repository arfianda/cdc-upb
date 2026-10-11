import puppeteer from 'puppeteer-core';
import path from 'path';
import fs from 'fs';

const OUT_DIR = path.resolve(process.cwd(), 'screenshots/variants');
if (!fs.existsSync(OUT_DIR)) {
  fs.mkdirSync(OUT_DIR, { recursive: true });
}

async function capture() {
  const browser = await puppeteer.launch({
    executablePath: '/usr/bin/google-chrome',
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-gpu'],
    headless: true,
  });

  const page = await browser.newPage();

  // 1. Desktop captures
  await page.setViewport({ width: 1440, height: 900, deviceScaleFactor: 2 });

  console.log('Capturing /hero-a desktop...');
  await page.goto('http://127.0.0.1:4173/hero-a', { waitUntil: 'networkidle0' });
  await page.screenshot({ path: path.join(OUT_DIR, 'hero_a_desktop_1440px.webp'), type: 'webp' });

  console.log('Capturing /hero-b desktop...');
  await page.goto('http://127.0.0.1:4173/hero-b', { waitUntil: 'networkidle0' });
  await page.screenshot({ path: path.join(OUT_DIR, 'hero_b_desktop_1440px.webp'), type: 'webp' });

  // 2. Mobile captures
  await page.setViewport({ width: 390, height: 844, isMobile: true, hasTouch: true, deviceScaleFactor: 2 });

  console.log('Capturing /hero-a mobile...');
  await page.goto('http://127.0.0.1:4173/hero-a', { waitUntil: 'networkidle0' });
  await page.screenshot({ path: path.join(OUT_DIR, 'hero_a_mobile_390px.webp'), type: 'webp' });

  console.log('Capturing /hero-b mobile...');
  await page.goto('http://127.0.0.1:4173/hero-b', { waitUntil: 'networkidle0' });
  await page.screenshot({ path: path.join(OUT_DIR, 'hero_b_mobile_390px.webp'), type: 'webp' });

  await browser.close();
  console.log('Variant captures complete!');
}

capture().catch(err => {
  console.error(err);
  process.exit(1);
});
