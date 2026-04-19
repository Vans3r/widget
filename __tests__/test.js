import puppeteer from 'puppeteer';

async function testPopover() {
  const browser = await puppeteer.launch({
  headless: true,
  args: [
    '--no-sandbox',
    '--disable-setuid-sandbox',
    '--disable-dev-shm-usage',
    '--disable-accelerated-2d-canvas',
    '--disable-gpu',
    '--window-size=1920,1080'
  ]
});
  const page = await browser.newPage();

  try {
    await page.goto('http://localhost:8080', {
      waitUntil: 'networkidle0',
      timeout: 30000
    });
    const triggers = await page.$$('[data-toggle="popover"]');
    if (triggers.length === 0) {
      throw new Error('Не найдены элементы с data-toggle="popover"');
    }

    await page.click('[data-toggle="popover"]');

    await page.waitForSelector('.popover', {
      visible: true,
      timeout: 5000
    });

    const title = await page.$eval('.popover-header', el => el.textContent);
    const content = await page.$eval('.popover-body', el => el.textContent);

    if (!title || !content) {
      throw new Error('Popover не содержит ожидаемого содержимого');
    }

    await page.mouse.click(10, 10); 

    await page.waitForFunction(() => {
      const popover = document.querySelector('.popover');
      return !popover || popover.style.display === 'none';
    }, { timeout: 5000 });
 
    await page.click('[data-toggle="popover"]');
    await page.waitForSelector('.popover', { visible: true, timeout: 5000 });

    console.log('Все тесты пройдены успешно!');
  } catch (error) {
    console.error('❌ Ошибка в тесте:', error.message);
  } finally {
    await browser.close();
  }
}

testPopover();
