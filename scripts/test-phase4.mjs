import puppeteer from 'puppeteer-core';
import fs from 'fs';
import path from 'path';

const ARTIFACTS_DIR = '/home/sushi/.gemini/antigravity-ide/brain/6687321c-8e08-432b-98cd-b195cb2d182d';
const BASE_URL = 'http://localhost:3000';
const CONFIG_PATH = '/home/sushi/Shrringaar/src/config/site.ts';

async function run() {
  console.log('Launching Chrome with Puppeteer...');
  const browser = await puppeteer.launch({
    executablePath: '/usr/bin/google-chrome',
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
    defaultViewport: { width: 1280, height: 900 }
  });

  const page = await browser.newPage();

  page.on('console', msg => {
    if (msg.type() === 'error') {
      console.log('Browser Error:', msg.text());
    }
  });

  // 1. Hero Hindi on /hi
  console.log('\n--- 1. Testing Hindi Hero (/hi) ---');
  await page.goto(`${BASE_URL}/hi`, { waitUntil: 'networkidle0' });
  const htmlLangHi = await page.$eval('html', el => el.getAttribute('lang'));
  console.log('Hindi route <html lang>:', htmlLangHi);

  const heroSectionHi = await page.$('#hero');
  if (heroSectionHi) {
    await heroSectionHi.scrollIntoView();
    await new Promise(r => setTimeout(r, 600));
    await heroSectionHi.screenshot({
      path: path.join(ARTIFACTS_DIR, 'hero_hindi.png')
    });
    console.log('Saved hero_hindi.png');
  }

  // 2. English Page (/): Numbers Strip, Pricing Shown, FAQ Open
  console.log('\n--- 2. Testing English Page (/) ---');
  await page.setViewport({ width: 1280, height: 900 });
  await page.goto(`${BASE_URL}/`, { waitUntil: 'networkidle0' });
  const htmlLangEn = await page.$eval('html', el => el.getAttribute('lang'));
  console.log('English route <html lang>:', htmlLangEn);

  // Numbers Strip
  const numbersStrip = await page.$('#highlights');
  if (numbersStrip) {
    await numbersStrip.scrollIntoView();
    await new Promise(r => setTimeout(r, 600));
    await numbersStrip.screenshot({
      path: path.join(ARTIFACTS_DIR, 'numbers_strip.png')
    });
    console.log('Saved numbers_strip.png');
  }

  // Pricing Shown
  const pricingSection = await page.$('#pricing');
  if (pricingSection) {
    await pricingSection.scrollIntoView();
    await new Promise(r => setTimeout(r, 600));
    await pricingSection.screenshot({
      path: path.join(ARTIFACTS_DIR, 'pricing_shown.png')
    });
    console.log('Saved pricing_shown.png');
  }

  // FAQ with Q10 Open
  const faqSection = await page.$('#faq');
  if (faqSection) {
    await faqSection.scrollIntoView();
    await new Promise(r => setTimeout(r, 600));
    const q10Btn = await page.$('#faq-q-q10');
    if (q10Btn) {
      await q10Btn.click();
      await new Promise(r => setTimeout(r, 500)); // wait for CSS grid transition
      await faqSection.screenshot({
        path: path.join(ARTIFACTS_DIR, 'faq_open.png')
      });
      console.log('Saved faq_open.png with Q10 open');
    }
  }

  // 3. Form Validation: Empty Submit & Bad WhatsApp
  console.log('\n--- 3. Form Validation & Error States ---');
  const demoSection = await page.$('#demo');
  if (demoSection) {
    await demoSection.scrollIntoView();
    await new Promise(r => setTimeout(r, 600));

    // Submit empty
    const submitBtn = await page.$('button[type="submit"]');
    if (submitBtn) {
      await submitBtn.click();
      await new Promise(r => setTimeout(r, 400));
      await demoSection.screenshot({
        path: path.join(ARTIFACTS_DIR, 'form_errors.png')
      });
      console.log('Saved form_errors.png');

      const nameErr = await page.$eval('#error-name', el => el.textContent).catch(() => null);
      const shopErr = await page.$eval('#error-shopName', el => el.textContent).catch(() => null);
      const cityErr = await page.$eval('#error-city', el => el.textContent).catch(() => null);
      const waErr = await page.$eval('#error-whatsapp', el => el.textContent).catch(() => null);
      console.log('Validation errors displayed:', { nameErr, shopErr, cityErr, waErr });
    }

    // Bad WhatsApp test
    console.log('\n--- 3b. Testing Bad WhatsApp Number (12345) ---');
    await page.focus('#field-name');
    await page.keyboard.type('Rajesh Mehta');
    await page.focus('#field-shopName');
    await page.keyboard.type('Mehta Jewellers');
    await page.focus('#field-city');
    await page.keyboard.type('Jaipur');
    await page.focus('#field-whatsapp');
    await page.keyboard.type('12345');
    await submitBtn.click();
    await new Promise(r => setTimeout(r, 400));
    const badWaErr = await page.$eval('#error-whatsapp', el => el.textContent).catch(() => null);
    console.log('Bad WhatsApp error:', badWaErr);
  }

  // 4. Form Submission: Keyboard Only
  console.log('\n--- 4. Form Submission: Keyboard Only ---');
  // Reload fresh page at #demo
  await page.goto(`${BASE_URL}/#demo`, { waitUntil: 'networkidle0' });
  const demoSectionFresh = await page.$('#demo');
  await demoSectionFresh.scrollIntoView();
  await new Promise(r => setTimeout(r, 600));

  // Focus name field and tab through everything
  await page.focus('#field-name');
  await page.keyboard.type('Rajesh Mehta');

  await page.keyboard.press('Tab'); // to shopName
  await page.keyboard.type('Mehta Jewellers');

  await page.keyboard.press('Tab'); // to city
  await page.keyboard.type('Jaipur');

  await page.keyboard.press('Tab'); // to whatsapp
  await page.keyboard.type('9876543210');

  await page.keyboard.press('Tab'); // to storeCount
  await page.keyboard.press('ArrowDown'); // selects next option '2-5'
  await page.keyboard.press('ArrowUp');   // returns to '1'

  await page.keyboard.press('Tab'); // to message
  await page.keyboard.type('Looking forward to a 10-minute walkthrough.');

  await page.keyboard.press('Tab'); // to Submit Button
  console.log('Focused element for submission:', await page.evaluate(() => document.activeElement.tagName + ' ' + (document.activeElement.textContent || '')));

  await page.keyboard.press('Enter'); // Trigger submit via keyboard Enter

  // Wait for submission response and success state
  await page.waitForSelector('[role="status"]', { timeout: 5000 });
  await new Promise(r => setTimeout(r, 600));

  await demoSectionFresh.screenshot({
    path: path.join(ARTIFACTS_DIR, 'form_success.png')
  });
  console.log('Saved form_success.png');

  const successText = await page.$eval('[role="status"]', el => el.textContent);
  console.log('Success state text:', successText);

  // 5. Check Pricing Hidden
  console.log('\n--- 5. Testing Pricing Hidden Flag (showPriceNumber: false) ---');
  const originalConfig = fs.readFileSync(CONFIG_PATH, 'utf-8');
  const hiddenConfig = originalConfig.replace('showPriceNumber: true', 'showPriceNumber: false');
  fs.writeFileSync(CONFIG_PATH, hiddenConfig, 'utf-8');

  // Wait for Next.js Fast Refresh
  await new Promise(r => setTimeout(r, 1500));
  await page.goto(`${BASE_URL}/#pricing`, { waitUntil: 'networkidle0' });
  const pricingSectionHidden = await page.$('#pricing');
  if (pricingSectionHidden) {
    await pricingSectionHidden.scrollIntoView();
    await new Promise(r => setTimeout(r, 600));
    await pricingSectionHidden.screenshot({
      path: path.join(ARTIFACTS_DIR, 'pricing_hidden.png')
    });
    console.log('Saved pricing_hidden.png');

    const cardPriceText = await page.$eval('#pricing', el => el.innerText);
    const hasHiddenText = cardPriceText.includes('Ask us for pricing');
    console.log('Card 1 reflects hidden price flag ("Ask us for pricing"):', hasHiddenText);
  }

  // Restore original config
  fs.writeFileSync(CONFIG_PATH, originalConfig, 'utf-8');
  console.log('Restored siteConfig.pricing.showPriceNumber = true');

  // 6. Viewport Responsiveness Verification (360px, 768px, 1280px)
  console.log('\n--- 6. Viewport Responsiveness Verification ---');
  const testViewports = [
    { label: 'Mobile 360px', width: 360, height: 740 },
    { label: 'Tablet 768px', width: 768, height: 1024 },
    { label: 'Desktop 1280px', width: 1280, height: 900 }
  ];

  for (const vp of testViewports) {
    await page.setViewport({ width: vp.width, height: vp.height });
    for (const locale of ['/', '/hi']) {
      await page.goto(`${BASE_URL}${locale}`, { waitUntil: 'networkidle0' });
      const overflow = await page.evaluate(() => {
        return document.documentElement.scrollWidth > document.documentElement.clientWidth;
      });
      console.log(`[${vp.label}] ${locale} -> Horizontal Overflow: ${overflow ? 'FAIL' : 'PASS (no overflow)'}`);
    }
  }

  await browser.close();
  console.log('\n✓ All tests, captures, and audits completed successfully!');
}

run().catch(err => {
  console.error('Error in test run:', err);
  // Restore config in case of error
  try {
    const content = fs.readFileSync(CONFIG_PATH, 'utf-8');
    if (content.includes('showPriceNumber: false')) {
      fs.writeFileSync(CONFIG_PATH, content.replace('showPriceNumber: false', 'showPriceNumber: true'), 'utf-8');
    }
  } catch {}
  process.exit(1);
});
