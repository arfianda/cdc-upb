import puppeteer from 'puppeteer-core';
import fs from 'fs';
import path from 'path';

const OUT_DIR = path.resolve(process.cwd(), 'screenshots/reference');
if (!fs.existsSync(OUT_DIR)) {
  fs.mkdirSync(OUT_DIR, { recursive: true });
}

async function analyze() {
  const browser = await puppeteer.launch({
    executablePath: '/usr/bin/google-chrome',
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-gpu'],
    headless: true,
  });

  const page = await browser.newPage();

  console.log('Navigating to https://www.squaredash.com/...');
  await page.setViewport({ width: 1440, height: 900, deviceScaleFactor: 2 });
  await page.goto('https://www.squaredash.com/', { waitUntil: 'networkidle2', timeout: 30000 });

  // 1. Desktop Screenshots
  console.log('Capturing desktop screenshots...');
  await page.screenshot({ path: path.join(OUT_DIR, '01_desktop_hero_1440px.webp'), type: 'webp' });

  // Scroll and capture sections
  const sections = await page.$$('section, header, footer');
  console.log(`Found ${sections.length} major sections on desktop.`);

  let secIdx = 1;
  for (const sec of sections) {
    try {
      await sec.scrollIntoView();
      await new Promise(r => setTimeout(r, 400));
      const box = await sec.boundingBox();
      if (box && box.height > 50) {
        await sec.screenshot({
          path: path.join(OUT_DIR, `desktop_sec_${secIdx}.webp`),
          type: 'webp'
        });
        secIdx++;
      }
    } catch {
      // ignore detached
    }
  }

  // 2. Mobile Screenshots
  console.log('Capturing mobile screenshots (390px)...');
  await page.setViewport({ width: 390, height: 844, isMobile: true, hasTouch: true, deviceScaleFactor: 2 });
  await page.goto('https://www.squaredash.com/', { waitUntil: 'networkidle2', timeout: 30000 });
  await page.screenshot({ path: path.join(OUT_DIR, '02_mobile_hero_390px.webp'), type: 'webp' });

  const mobileSections = await page.$$('section, header, footer');
  let mobIdx = 1;
  for (const sec of mobileSections) {
    try {
      await sec.scrollIntoView();
      await new Promise(r => setTimeout(r, 400));
      const box = await sec.boundingBox();
      if (box && box.height > 50) {
        await sec.screenshot({
          path: path.join(OUT_DIR, `mobile_sec_${mobIdx}.webp`),
          type: 'webp'
        });
        mobIdx++;
      }
    } catch {
      // ignore
    }
  }

  // 3. Extract Design Tokens and Styles directly from DOM
  console.log('Extracting CSS & Typography tokens...');
  const designTokens = await page.evaluate(() => {
    const allEls = Array.from(document.querySelectorAll('*'));
    
    const typography = {};
    const colors = new Map();
    const bgColors = new Map();
    const borderColors = new Map();
    const radii = new Set();
    const shadows = new Set();

    // Check headings
    const h1 = document.querySelector('h1');
    const h2 = document.querySelector('h2');
    const h3 = document.querySelector('h3');
    const p = document.querySelector('p');
    const btn = document.querySelector('button, a[class*="btn"], [class*="button"]');
    const input = document.querySelector('input');
    const badge = document.querySelector('[class*="badge"], [class*="tag"], [class*="pill"]');

    function getStyle(el) {
      if (!el) return null;
      const s = window.getComputedStyle(el);
      return {
        fontFamily: s.fontFamily,
        fontSize: s.fontSize,
        fontWeight: s.fontWeight,
        lineHeight: s.lineHeight,
        letterSpacing: s.letterSpacing,
        color: s.color,
        borderRadius: s.borderRadius,
        padding: s.padding,
        margin: s.margin,
        boxShadow: s.boxShadow,
      };
    }

    typography.h1 = getStyle(h1);
    typography.h2 = getStyle(h2);
    typography.h3 = getStyle(h3);
    typography.p = getStyle(p);
    typography.button = getStyle(btn);
    typography.input = getStyle(input);
    typography.badge = getStyle(badge);

    // Scan all elements for colors and surface distribution
    let totalArea = 0;
    allEls.forEach(el => {
      const s = window.getComputedStyle(el);
      const rect = el.getBoundingClientRect();
      const area = rect.width * rect.height;
      if (area > 0) {
        totalArea += area;
        const bg = s.backgroundColor;
        if (bg && bg !== 'rgba(0, 0, 0, 0)' && bg !== 'transparent') {
          bgColors.set(bg, (bgColors.get(bg) || 0) + area);
        }
        const c = s.color;
        if (c) {
          colors.set(c, (colors.get(c) || 0) + 1);
        }
        const bc = s.borderColor;
        if (bc && bc !== 'rgba(0, 0, 0, 0)') {
          borderColors.set(bc, (borderColors.get(bc) || 0) + 1);
        }
        if (s.borderRadius && s.borderRadius !== '0px') {
          radii.add(s.borderRadius);
        }
        if (s.boxShadow && s.boxShadow !== 'none') {
          shadows.add(s.boxShadow);
        }
      }
    });

    // Layout metrics
    const container = document.querySelector('.container, [class*="max-w"], main, section');
    const containerStyle = container ? window.getComputedStyle(container) : null;

    // Detect libraries
    const libraries = {
      gsap: typeof window.gsap !== 'undefined',
      framerMotion: !!document.querySelector('[style*="transform"], [data-framer-name]'),
      lenis: typeof window.Lenis !== 'undefined',
      tailwind: !!Array.from(document.styleSheets).some(s => {
        try {
          return Array.from(s.cssRules || []).some(r => r.cssText && r.cssText.includes('--tw-'));
        } catch {
          return false;
        }
      }),
    };

    // Calculate background color percentage
    const bgPercent = {};
    for (const [col, area] of bgColors.entries()) {
      bgPercent[col] = Math.round((area / totalArea) * 100);
    }

    return {
      typography,
      bgPercent,
      topColors: Array.from(colors.entries()).sort((a,b)=>b[1]-a[1]).slice(0, 10),
      radii: Array.from(radii).slice(0, 10),
      shadows: Array.from(shadows).slice(0, 10),
      containerMetrics: {
        maxWidth: containerStyle?.maxWidth,
        padding: containerStyle?.padding,
      },
      libraries,
    };
  });

  fs.writeFileSync(path.join(process.cwd(), 'docs/reference_tokens.json'), JSON.stringify(designTokens, null, 2));
  console.log('Saved docs/reference_tokens.json');

  await browser.close();
  console.log('Analysis complete!');
}

analyze().catch(err => {
  console.error(err);
  process.exit(1);
});
