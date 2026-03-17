import { AppController } from './controller/app-controller'

export function createApp(): HTMLDivElement {
  const app = document.createElement('div')

  const garageButton = document.createElement('button')
  garageButton.textContent = 'Garage'

  const winnersButton = document.createElement('button')
  winnersButton.textContent = 'Winners'

  const content = document.createElement('div')

  const controller = new AppController(content)
  controller.init()

  garageButton.addEventListener('click', () => {
    controller.showGarage()
  })

  winnersButton.addEventListener('click', () => {
    controller.showWinners()
  })

  app.append(garageButton, winnersButton, content)

  return app
}
