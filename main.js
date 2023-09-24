/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
var __webpack_exports__ = {};

;// CONCATENATED MODULE: ./src/js/App.js
class App {
  constructor(container) {
    this.container = container;
  }
  drawWidget() {
    return `
    <h1 class="app__header">Validate Credit Card Numbers</h1>
    <div class="card-widget">
      <div class="card-widget__wrapper">
        <div class="cards">
          <div class="cards__container">
            <div class="cards__item visa">
              <img src="./images/visa.png" alt="" class="cards__item-img">
            </div>
            <div class="cards__item mastercard">
              <img src="./images/mastercard.png" alt="" class="cards__item-img">
            </div>
            <div class="cards__item mir">
              <img src="./images/mir.png" alt="" class="cards__item-img">
            </div>
            <div class="cards__item unionPay">
              <img src="./images/unionPay.png" alt="" class="cards__item-img">
            </div>
          </div>
        </div>
        <form action="" class="card-widget__form">
          <div class="card-widget__field">
            <input name="card-number" class="card-widget__input">
          </div>
          <button class="card-widget__btn">Click to Validate</button>
        </form>
      </div>
    </div>
    `;
  }
  bindToDOM() {
    this.container.innerHTML = this.drawWidget();
    this.widget = this.container.querySelector('.card-widget');
    this.cardWidgetForm = this.widget.querySelector('.card-widget__form');
    this.cardWidgetInput = this.widget.querySelector('.card-widget__input');
    this.cardWidgetBtn = this.widget.querySelector('.card-widget__btn');
    this.cardsContainer = this.container.querySelector('.cards__container');
    this.cards = [...this.cardsContainer.querySelectorAll('.cards__item')];
  }
}
;// CONCATENATED MODULE: ./src/js/validate.js
function validateCardNumber(cardNumber) {
  // Разбиваем номер карты на цифры и переворачиваем его
  const digits = cardNumber.split('').map(Number).reverse();
  let sum = 0;
  for (let i = 0; i < digits.length; i++) {
    let digit = digits[i];
    if (i % 2 === 1) {
      digit *= 2;
      if (digit > 9) {
        digit -= 9;
      }
    }
    sum += digit;
  }

  // Номер карты валиден, если сумма делится на 10 без остатка
  return sum % 10 === 0;
}
;// CONCATENATED MODULE: ./src/js/CardWidget.js

class CardWidgetForm {
  constructor(app, selectCard) {
    this.container = app.widget;
    this.form = app.cardWidgetForm;
    this.input = app.cardWidgetInput;
    this.submitBtn = app.cardWidgetBtn;
    this.selectCard = selectCard;
    this.standOutCard = this.standOutCard.bind(this);
    this.checkCardNumber = this.checkCardNumber.bind(this);
    this.addEvents();
  }

  // Добавляем обработчики события
  addEvents() {
    this.input.addEventListener('input', this.standOutCard);
    this.form.addEventListener('submit', this.checkCardNumber);
    this.submitBtn.addEventListener('click', this.checkCardNumber);
  }

  // Выделяем платежную система, которой соответсвует номер карты
  standOutCard() {
    const cardNumber = this.input.value;
    this.selectCard(cardNumber);
  }

  // Проверяем номер карты
  checkCardNumber(e) {
    e.preventDefault();
    this.cardNumber = this.input.value.trim();

    // Проверяем, что номер карты состоит только из цифр
    if (!/^\d+$/.test(this.cardNumber) || !this.cardNumber) {
      this.showAnswer('Your card number is not valid.', false);
      return;
    }
    const isValid = validateCardNumber(this.cardNumber);

    // Номер карты валиден, если сумма делится на 10 без остатка
    if (isValid) {
      this.showAnswer('Your card number is valid.', true);
    } else {
      this.showAnswer('Your card number is not valid.', false);
    }
  }

  // Показываем ответ о валидности карты
  showAnswer(text, isValid) {
    if (this.answerText) {
      this.answerText.remove();
    }
    this.answerText = document.createElement('p');
    this.answerText.classList.add('card-widget__answer', `card-widget__answer_${isValid ? 'valid' : 'invalid'}`);
    this.answerText.textContent = text;
    this.container.append(this.answerText);
  }
}
;// CONCATENATED MODULE: ./src/js/CardsContainer.js
class CardsContainer {
  constructor(app) {
    this.container = app.cardsContainer;
    this.cards = app.cards;
    this.findCard = this.findCard.bind(this);
  }

  // Находим карту
  findCard(cardNumber) {
    this.cards.forEach(card => {
      if (card.classList.contains('cards__item_pale')) {
        card.classList.remove('cards__item_pale');
      }
    });
    if (cardNumber.startsWith('4')) {
      this.selectCard('.visa');
    }
    if (cardNumber.startsWith('5')) {
      this.selectCard('.mastercard');
    }
    if (cardNumber.startsWith('22')) {
      this.selectCard('.mir');
    }
    if (cardNumber.startsWith('62')) {
      this.selectCard('.unionPay');
    }
  }

  // Все карты делаем черно-белыми кроме подходящей
  selectCard(nameCard) {
    this.cards.forEach(card => {
      card.classList.add('cards__item_pale');
    });
    this.cardEl = this.container.querySelector(nameCard);
    this.cardEl.classList.remove('cards__item_pale');
  }
}
;// CONCATENATED MODULE: ./src/js/startApp.js



const container = document.querySelector('.app__container');
const app = new App(container);
app.bindToDOM();
const cardsContainer = new CardsContainer(app);
const cardWidget = new CardWidgetForm(app, cardsContainer.findCard);
console.log(cardWidget);
;// CONCATENATED MODULE: ./src/index.js


/******/ })()
;
//# sourceMappingURL=main.js.map