import { createGarageView } from './view/garage-view';
import { createWinnersView } from './view/winners-view';

export function createApp(): HTMLDivElement {
  const app = document.createElement('div');

  const garageButton = document.createElement('button');
  garageButton.textContent = 'Garage';

  const winnersButton = document.createElement('button');
  winnersButton.textContent = 'Winners';

  const content = document.createElement('div');
  content.append(createGarageView());

  garageButton.addEventListener('click', () => {
    content.replaceChildren(createGarageView());
  });

  winnersButton.addEventListener('click', () => {
    content.replaceChildren(createWinnersView());
  });

  app.append(garageButton, winnersButton, content);

  return app;
}