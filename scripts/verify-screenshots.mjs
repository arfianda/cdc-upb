import puppeteer from 'puppeteer-core';
import fs from 'fs';
import path from 'path';

const SCREENSHOT_DIR = path.resolve(process.cwd(), 'screenshots');
if (!fs.existsSync(SCREENSHOT_DIR)) {
  fs.mkdirSync(SCREENSHOT_DIR, { recursive: true });
}

async function run() {
  const browser = await puppeteer.launch({
    executablePath: '/usr/bin/google-chrome',
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-gpu'],
    headless: true,
  });

  const page = await browser.newPage();

  console.log('1. Testing Desktop Viewport (1440x900)...');
  await page.setViewport({ width: 1440, height: 900, deviceScaleFactor: 2 });
  await page.goto('http://localhost:4173/', { waitUntil: 'networkidle0' });

  // Tunggu fonts
  await page.evaluate(async () => {
    if (document.fonts) await document.fonts.ready;
  });

  // Ambil screenshot full page desktop
  await page.screenshot({
    path: path.join(SCREENSHOT_DIR, '00_desktop_full_1440px.webp'),
    fullPage: true,
    type: 'webp',
  });
  console.log('Saved 00_desktop_full_1440px.webp');

  // Screenshot per section desktop
  const sections = [
    { id: '#beranda', name: '01_desktop_hero_1440px.webp' },
    { id: '#mitra-industri', name: '02_desktop_partners_1440px.webp' },
    { id: '#lowongan', name: '03_desktop_featured_jobs_1440px.webp' },
    { id: '#layanan', name: '04_desktop_services_1440px.webp' },
    { id: '#tracer-study', name: '05_desktop_tracer_teaser_1440px.webp' },
    { id: '#cerita-alumni', name: '06_desktop_alumni_stories_1440px.webp' },
  ];

  for (const sec of sections) {
    const el = await page.$(sec.id);
    if (el) {
      await el.scrollIntoView();
      await new Promise((r) => setTimeout(r, 600));
      await el.screenshot({
        path: path.join(SCREENSHOT_DIR, sec.name),
        type: 'webp',
      });
      console.log(`Saved ${sec.name}`);
    }
  }

  // Footer screenshot
  const footerEl = await page.$('footer');
  if (footerEl) {
    await footerEl.scrollIntoView();
    await new Promise((r) => setTimeout(r, 500));
    await footerEl.screenshot({
      path: path.join(SCREENSHOT_DIR, '07_desktop_footer_1440px.webp'),
      type: 'webp',
    });
    console.log('Saved 07_desktop_footer_1440px.webp');
  }

  console.log('2. Testing Mobile Viewport (390x844 - iPhone 14 / modern standard)...');
  await page.setViewport({ width: 390, height: 844, isMobile: true, hasTouch: true, deviceScaleFactor: 2 });
  await page.goto('http://localhost:4173/', { waitUntil: 'networkidle0' });

  // Screenshot full page mobile
  await page.screenshot({
    path: path.join(SCREENSHOT_DIR, '08_mobile_full_390px.webp'),
    fullPage: true,
    type: 'webp',
  });
  console.log('Saved 08_mobile_full_390px.webp');

  // Screenshot per section mobile
  const mobileSections = [
    { id: '#beranda', name: '09_mobile_hero_390px.webp' },
    { id: '#mitra-industri', name: '10_mobile_partners_390px.webp' },
    { id: '#lowongan', name: '11_mobile_jobs_390px.webp' },
    { id: '#layanan', name: '12_mobile_services_stack_390px.webp' },
    { id: '#tracer-study', name: '13_mobile_tracer_390px.webp' },
    { id: '#cerita-alumni', name: '14_mobile_alumni_390px.webp' },
  ];

  for (const sec of mobileSections) {
    const el = await page.$(sec.id);
    if (el) {
      await el.scrollIntoView();
      await new Promise((r) => setTimeout(r, 600));
      await el.screenshot({
        path: path.join(SCREENSHOT_DIR, sec.name),
        type: 'webp',
      });
      console.log(`Saved ${sec.name}`);
    }
  }

  const mobileFooter = await page.$('footer');
  if (mobileFooter) {
    await mobileFooter.scrollIntoView();
    await new Promise((r) => setTimeout(r, 500));
    await mobileFooter.screenshot({
      path: path.join(SCREENSHOT_DIR, '15_mobile_footer_390px.webp'),
      type: 'webp',
    });
    console.log('Saved 15_mobile_footer_390px.webp');
  }

  console.log('3. Testing prefers-reduced-motion...');
  await page.emulateMediaFeatures([{ name: 'prefers-reduced-motion', value: 'reduce' }]);
  await page.goto('http://localhost:4173/', { waitUntil: 'networkidle0' });
  await page.screenshot({
    path: path.join(SCREENSHOT_DIR, '16_reduced_motion_active.webp'),
    type: 'webp',
  });
  console.log('Saved 16_reduced_motion_active.webp');

  await browser.close();
  console.log('All verification captures completed successfully!');
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
