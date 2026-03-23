import './header-view.css'

export type HeaderView = {
  header: HTMLElement
  garageButton: HTMLButtonElement
  winnersButton: HTMLButtonElement
}

export function createHeader(): HeaderView {
  const header = document.createElement('header')
  header.className = 'header'

  const garageButton = document.createElement('button')
  garageButton.type = 'button'
  garageButton.textContent = '🏠 GARAGE'
  garageButton.className = 'header-btn header-btn-garage'

  const winnersButton = document.createElement('button')
  winnersButton.type = 'button'
  winnersButton.textContent = '🏆 WINNERS'
  winnersButton.className = 'header-btn header-btn-winners'

  header.append(garageButton, winnersButton)

  return {
    header,
    garageButton,
    winnersButton,
  }
}
