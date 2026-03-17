import './header-view.css'
export type HeaderView = {
  header: HTMLElement
  garageButton: HTMLButtonElement
  winnersButton: HTMLButtonElement
}
export function createHeader(): HeaderView {
  const header = document.createElement('header')

  const garageButton = document.createElement('button')
  garageButton.type = 'button'
  garageButton.textContent = 'To Garage'

  const winnersButton = document.createElement('button')
  winnersButton.type = 'button'
  winnersButton.textContent = 'To Winners'

  header.append(garageButton, winnersButton)

  return {
    header,
    garageButton,
    winnersButton,
  }
}
