import puppeteer from 'puppeteer';

describe('fgf', () => {
  let browser;
  let page;
  jest.setTimeout(20000);
  beforeEach(async () => {
    browser = await puppeteer.launch({
      headless: false,
      slowMo: 100,
      devtools: true,
    });

    page = await browser.newPage();
  });

  test('Answer text should add  .card-widget__answer_valid if card number is valid', async () => {
    await page.goto('http://localhost:8080');

    await page.waitForSelector('.card-widget');

    const form = await page.$('.card-widget__form');
    const input = await form.$('.card-widget__input');
    const submit = await form.$('.card-widget__btn');

    await input.type('4929756946836803');
    await submit.click();

    await page.waitForSelector('.card-widget__answer_valid');
  }, 15000);

  test('Answer text should add  .card-widget__answer_invalid if card number is invalid', async () => {
    await page.goto('http://localhost:8080');

    await page.waitForSelector('.card-widget');

    const form = await page.$('.card-widget__form');
    const input = await form.$('.card-widget__input');
    const submit = await form.$('.card-widget__btn');

    await input.type('79927368713');
    await submit.click();

    await page.waitForSelector('.card-widget__answer_invalid');
  }, 15000);

  afterEach(async () => {
    await browser.close();
  });
});
