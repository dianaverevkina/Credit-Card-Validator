export default class CardsContainer {
  constructor(app) {
    this.container = app.cardsContainer;
    this.cards = app.cards;

    this.findCard = this.findCard.bind(this);
  }

  // Находим карту
  findCard(cardNumber) {
    this.cards.forEach((card) => {
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
    this.cards.forEach((card) => {
      card.classList.add('cards__item_pale');
    });
    this.cardEl = this.container.querySelector(nameCard);
    this.cardEl.classList.remove('cards__item_pale');
  }
}
