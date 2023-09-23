export default class App {
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
