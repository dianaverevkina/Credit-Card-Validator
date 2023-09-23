import validateCardNumber from './validate';

export default class CardWidgetForm {
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
    if ((!/^\d+$/.test(this.cardNumber)) || !this.cardNumber) {
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
