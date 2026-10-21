import puppeteer from 'puppeteer-core';

async function test() {
  const browser = await puppeteer.launch({
    executablePath: '/usr/bin/google-chrome',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });
  const page = await browser.newPage();

  page.on('console', msg => console.log('PAGE LOG:', msg.text()));

  await page.goto('http://localhost:3000/#demo', { waitUntil: 'networkidle0' });

  // Focus the first field
  await page.focus('#field-name');
  await page.keyboard.type('Rajesh Mehta');

  await page.keyboard.press('Tab');
  console.log('Active after Tab 1:', await page.evaluate(() => document.activeElement.id || document.activeElement.tagName));
  await page.keyboard.type('Mehta Jewellers');

  await page.keyboard.press('Tab');
  console.log('Active after Tab 2:', await page.evaluate(() => document.activeElement.id || document.activeElement.tagName));
  await page.keyboard.type('Jaipur');

  await page.keyboard.press('Tab');
  console.log('Active after Tab 3:', await page.evaluate(() => document.activeElement.id || document.activeElement.tagName));
  await page.keyboard.type('9876543210');

  await page.keyboard.press('Tab');
  console.log('Active after Tab 4:', await page.evaluate(() => document.activeElement.id || document.activeElement.tagName));

  await page.keyboard.press('Tab');
  console.log('Active after Tab 5:', await page.evaluate(() => document.activeElement.id || document.activeElement.tagName));
  await page.keyboard.type('Looking forward to the demo.');

  await page.keyboard.press('Tab');
  console.log('Active after Tab 6:', await page.evaluate(() => document.activeElement.id || document.activeElement.tagName + ' ' + document.activeElement.type));

  // Now press Enter
  await page.keyboard.press('Enter');

  await new Promise(r => setTimeout(r, 1000));
  const success = await page.$('[role="status"]');
  console.log('Success element found:', !!success);
  if (success) {
    console.log('Success text:', await page.evaluate(el => el.textContent, success));
  }

  await browser.close();
}

test();
