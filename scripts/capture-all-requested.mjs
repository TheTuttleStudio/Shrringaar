import puppeteer from 'puppeteer-core';
import fs from 'fs';
import path from 'path';

const ARTIFACTS_DIR = '/home/sushi/.gemini/antigravity-ide/brain/6687321c-8e08-432b-98cd-b195cb2d182d';
const BASE_URL = 'http://localhost:3000';
const CONFIG_PATH = '/home/sushi/Shrringaar/src/config/site.ts';

async function run() {
  console.log('Starting screenshot captures...');
  const browser = await puppeteer.launch({
    executablePath: '/usr/bin/google-chrome',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();

  // 1. Desktop captures (1280px)
  await page.setViewport({ width: 1280, height: 900 });

  // 1a. Hindi Hero
  console.log('Capturing hero_hindi.png...');
  await page.goto(`${BASE_URL}/hi`, { waitUntil: 'networkidle0' });
  const heroHi = await page.$('#hero');
  if (heroHi) {
    await heroHi.scrollIntoView();
    await new Promise(r => setTimeout(r, 600));
    await heroHi.screenshot({ path: path.join(ARTIFACTS_DIR, 'hero_hindi.png') });
  }

  // 1b. English: Numbers Strip
  console.log('Capturing numbers_strip.png...');
  await page.goto(`${BASE_URL}/`, { waitUntil: 'networkidle0' });
  const numbersStrip = await page.$('#highlights');
  if (numbersStrip) {
    await numbersStrip.scrollIntoView();
    await new Promise(r => setTimeout(r, 600));
    await numbersStrip.screenshot({ path: path.join(ARTIFACTS_DIR, 'numbers_strip.png') });
  }

  // 1c. English: Pricing Shown (with updated Card 2 layout)
  console.log('Capturing pricing_shown.png...');
  const pricingSection = await page.$('#pricing');
  if (pricingSection) {
    await pricingSection.scrollIntoView();
    await new Promise(r => setTimeout(r, 600));
    await pricingSection.screenshot({ path: path.join(ARTIFACTS_DIR, 'pricing_shown.png') });
  }

  // 1d. English: FAQ with Q10 open
  console.log('Capturing faq_open.png...');
  const faqSection = await page.$('#faq');
  if (faqSection) {
    await faqSection.scrollIntoView();
    await new Promise(r => setTimeout(r, 600));
    const q10Btn = await page.$('#faq-q-q10');
    if (q10Btn) {
      await q10Btn.click();
      await new Promise(r => setTimeout(r, 600));
      await faqSection.screenshot({ path: path.join(ARTIFACTS_DIR, 'faq_open.png') });
    }
  }

  // 1e. English: Form with errors
  console.log('Capturing form_errors.png...');
  const demoSection = await page.$('#demo');
  if (demoSection) {
    await demoSection.scrollIntoView();
    await new Promise(r => setTimeout(r, 600));
    const submitBtn = await page.$('button[type="submit"]');
    if (submitBtn) {
      await submitBtn.click();
      await new Promise(r => setTimeout(r, 400));
      await demoSection.screenshot({ path: path.join(ARTIFACTS_DIR, 'form_errors.png') });
    }
  }

  // 1f. English: Form success
  console.log('Capturing form_success.png...');
  await page.goto(`${BASE_URL}/`, { waitUntil: 'networkidle0' });
  const demoFresh = await page.$('#demo');
  if (demoFresh) {
    await demoFresh.scrollIntoView();
    await new Promise(r => setTimeout(r, 600));
    await page.focus('#field-name');
    await page.keyboard.type('Rajesh Mehta');
    await page.keyboard.press('Tab');
    await page.keyboard.type('Mehta Jewellers');
    await page.keyboard.press('Tab');
    await page.keyboard.type('Jaipur');
    await page.keyboard.press('Tab');
    await page.keyboard.type('9876543210');
    await page.keyboard.press('Tab'); // store count
    await page.keyboard.press('Tab'); // message
    await page.keyboard.type('Looking forward to the demo.');
    await page.keyboard.press('Tab'); // submit button
    await page.keyboard.press('Enter');
    await page.waitForSelector('[role="status"]', { timeout: 5000 });
    await new Promise(r => setTimeout(r, 600));
    await demoFresh.screenshot({ path: path.join(ARTIFACTS_DIR, 'form_success.png') });
  }

  // 1g. Pricing Hidden variant
  console.log('Capturing pricing_hidden.png...');
  const originalConfig = fs.readFileSync(CONFIG_PATH, 'utf-8');
  const hiddenConfig = originalConfig.replace('showPriceNumber: true', 'showPriceNumber: false');
  fs.writeFileSync(CONFIG_PATH, hiddenConfig, 'utf-8');
  await new Promise(r => setTimeout(r, 1500));
  await page.goto(`${BASE_URL}/#pricing`, { waitUntil: 'networkidle0' });
  const pricingHidden = await page.$('#pricing');
  if (pricingHidden) {
    await pricingHidden.scrollIntoView();
    await new Promise(r => setTimeout(r, 600));
    await pricingHidden.screenshot({ path: path.join(ARTIFACTS_DIR, 'pricing_hidden.png') });
  }
  // Restore config
  fs.writeFileSync(CONFIG_PATH, originalConfig, 'utf-8');
  await new Promise(r => setTimeout(r, 1500));

  // 2. Mobile 360px Captures (English & Hindi)
  console.log('\n--- Mobile 360px Captures ---');
  await page.setViewport({ width: 360, height: 780 });

  // 2a. English 360px: Numbers strip
  console.log('Capturing mobile_360_numbers_en.png...');
  await page.goto(`${BASE_URL}/`, { waitUntil: 'networkidle0' });
  const mNumbersEn = await page.$('#highlights');
  if (mNumbersEn) {
    await mNumbersEn.scrollIntoView();
    await new Promise(r => setTimeout(r, 600));
    await mNumbersEn.screenshot({ path: path.join(ARTIFACTS_DIR, 'mobile_360_numbers_en.png') });
  }

  // 2b. English 360px: Pricing cards
  console.log('Capturing mobile_360_pricing_en.png...');
  const mPricingEn = await page.$('#pricing');
  if (mPricingEn) {
    await mPricingEn.scrollIntoView();
    await new Promise(r => setTimeout(r, 600));
    await mPricingEn.screenshot({ path: path.join(ARTIFACTS_DIR, 'mobile_360_pricing_en.png') });
  }

  // 2c. English 360px: Demo form
  console.log('Capturing mobile_360_form_en.png...');
  const mFormEn = await page.$('#demo');
  if (mFormEn) {
    await mFormEn.scrollIntoView();
    await new Promise(r => setTimeout(r, 600));
    await mFormEn.screenshot({ path: path.join(ARTIFACTS_DIR, 'mobile_360_form_en.png') });
  }

  // 2d. Hindi 360px: Numbers strip
  console.log('Capturing mobile_360_numbers_hi.png...');
  await page.goto(`${BASE_URL}/hi`, { waitUntil: 'networkidle0' });
  const mNumbersHi = await page.$('#highlights');
  if (mNumbersHi) {
    await mNumbersHi.scrollIntoView();
    await new Promise(r => setTimeout(r, 600));
    await mNumbersHi.screenshot({ path: path.join(ARTIFACTS_DIR, 'mobile_360_numbers_hi.png') });
  }

  // 2e. Hindi 360px: Pricing cards
  console.log('Capturing mobile_360_pricing_hi.png...');
  const mPricingHi = await page.$('#pricing');
  if (mPricingHi) {
    await mPricingHi.scrollIntoView();
    await new Promise(r => setTimeout(r, 600));
    await mPricingHi.screenshot({ path: path.join(ARTIFACTS_DIR, 'mobile_360_pricing_hi.png') });
  }

  // 2f. Hindi 360px: Demo form
  console.log('Capturing mobile_360_form_hi.png...');
  const mFormHi = await page.$('#demo');
  if (mFormHi) {
    await mFormHi.scrollIntoView();
    await new Promise(r => setTimeout(r, 600));
    await mFormHi.screenshot({ path: path.join(ARTIFACTS_DIR, 'mobile_360_form_hi.png') });
  }

  await browser.close();
  console.log('All captures finished successfully!');
}

run().catch(err => {
  console.error('Capture error:', err);
  try {
    const content = fs.readFileSync(CONFIG_PATH, 'utf-8');
    if (content.includes('showPriceNumber: false')) {
      fs.writeFileSync(CONFIG_PATH, content.replace('showPriceNumber: false', 'showPriceNumber: true'), 'utf-8');
    }
  } catch {}
  process.exit(1);
});
