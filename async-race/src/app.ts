import { AppController } from '@/controller/app-controller'
import { createFooter } from '@/view/footer-view'
import { createHeader } from '@/view/header-view'
import { createMain } from '@/view/main-view/main-view'

export function createApp(): HTMLDivElement {
  const app = document.createElement('div')

  const { header, garageButton, winnersButton } = createHeader()
  const main = createMain()
  const footer = createFooter()

  const controller = new AppController(main)
  controller.init()

  garageButton.addEventListener('click', () => {
    controller.showGarage()
  })

  winnersButton.addEventListener('click', () => {
    controller.showWinners()
  })

  app.append(header, main, footer)

  return app
}
