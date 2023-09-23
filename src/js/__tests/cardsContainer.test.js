import App from '../App';
import CardWidgetForm from '../CardWidget';
import CardsContainer from '../CardsContainer';

const jsdom = require('jsdom');

const { JSDOM } = jsdom;
const dom = new JSDOM('<!DOCTYPE html><html><body></body></html>');
// Глобальные переменные, которые вы хотите использовать в тестах
global.document = dom.window.document;

test.each([
  ['visa', '49'],
  ['mastercard', '51'],
  ['mir', '22'],
  ['unionPay', '62'],
])(
  ('selected card must not have class .cards__item_pale'),
  (_, cardNumber) => {
    document.body.innerHTML = `
      <div class="app">
        <div class="app__container"></div>
      </div>
    `;
    const container = document.querySelector('.app__container');
    const app = new App(container);
    app.bindToDOM();

    const cardsContainer = new CardsContainer(app);
    const cardWidget = new CardWidgetForm(app, cardsContainer.findCard);

    cardWidget.input.value = cardNumber;
    cardWidget.standOutCard(cardWidget.input.value);

    const result = !cardsContainer.cardEl.classList.contains('cards__item_pale');
    expect(result).toBeTruthy();
  },
);
