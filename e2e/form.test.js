import puppeteer from 'puppeteer';

const childProcess = require('child_process');

describe('Credit Card Validator form', () => {
  let browser;
  let page;
  let server;

  const baseUrl = 'http://localhost:9000';
  beforeAll(async () => {
    server = await childProcess.fork(`${__dirname}/e2e.server.js`);
    await new Promise((resolve, reject) => {
      server.on('error', () => {
        reject();
      });
      server.on('message', (message) => {
        if (message === 'ok') {
          resolve();
        }
      });
    });
    browser = await puppeteer.launch({
      headless: false,
      slowMo: 100,
      devtools: false,
    });
    page = await browser.newPage();
  });
  afterAll(async () => {
    await browser.close();
    server.kill();
  });

  test('Answer text should add  .card-widget__answer_valid if card number is valid', async () => {
    await page.goto(baseUrl);

    await page.waitForSelector('.card-widget');

    const form = await page.$('.card-widget__form');
    const input = await form.$('.card-widget__input');
    const submit = await form.$('.card-widget__btn');

    await input.type('4929756946836803');
    await submit.click();

    await page.waitForSelector('.card-widget__answer_valid');
  }, 15000);

  test('Answer text should add  .card-widget__answer_invalid if card number is invalid', async () => {
    await page.goto(baseUrl);

    await page.waitForSelector('.card-widget');

    const form = await page.$('.card-widget__form');
    const input = await form.$('.card-widget__input');
    const submit = await form.$('.card-widget__btn');

    await input.type('79927368713');
    await submit.click();

    await page.waitForSelector('.card-widget__answer_invalid');
  }, 15000);
});
