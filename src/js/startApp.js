import App from './App';
import CardWidgetForm from './CardWidget';
import CardsContainer from './CardsContainer';

const container = document.querySelector('.app__container');
const app = new App(container);

app.bindToDOM();

const cardsContainer = new CardsContainer(app);
const cardWidget = new CardWidgetForm(app, cardsContainer.findCard);
console.log(cardWidget);
