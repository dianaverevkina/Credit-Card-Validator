import App from '../App';
import CardWidgetForm from '../CardWidget';
import CardsContainer from '../CardsContainer';

const jsdom = require('jsdom');

const { JSDOM } = jsdom;
const dom = new JSDOM('<!DOCTYPE html><html><body></body></html>');
// Глобальные переменные, которые вы хотите использовать в тестах
global.document = dom.window.document;

document.body.innerHTML = `
    <div class="app">
      <div class="app__container"></div>
    </div>
  `;
const container = document.querySelector('.app__container');
const app = new App(container);
app.bindToDOM();

test('widget should render', () => {
  const expected = app.drawWidget();

  expect(container.innerHTML).toEqual(expected);
});

const cardsContainer = new CardsContainer(app);
const cardWidget = new CardWidgetForm(app, cardsContainer.findCard);

test('Answer text should add  .card-widget__answer_valid if card number is valid', () => {
  cardWidget.input.value = '5131250142547365';
  cardWidget.submitBtn.click();

  const result = cardWidget.answerText.classList.contains('card-widget__answer_valid');

  expect(result).toBeTruthy();
});

test('Answer text should add  .card-widget__answer_invalid if card number is invalid', () => {
  cardWidget.input.value = '79927368713';
  cardWidget.submitBtn.click();

  const result = cardWidget.answerText.classList.contains('card-widget__answer_invalid');

  expect(result).toBeTruthy();
});
