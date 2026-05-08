import './winners-view.css'
import CarSVG from '@/assets/car.svg?raw'
import type { WinnersViewProps } from './types'

export function createWinnersView({
  winners,
}: WinnersViewProps): HTMLDivElement {
  const container = document.createElement('div')
  container.className = 'winners'

  const title = document.createElement('h2')
  title.textContent = `Winners (${winners.length})`

  const table = document.createElement('table')
  table.className = 'winners-table'

  const thead = document.createElement('thead')
  const headRow = document.createElement('tr')

  const headers = ['Number', 'Car', 'Name', 'Wins', 'Best time (seconds)']

  headers.forEach((headerText) => {
    const th = document.createElement('th')
    th.textContent = headerText
    headRow.appendChild(th)
  })

  thead.appendChild(headRow)

  const tbody = document.createElement('tbody')

  winners.forEach((winner, index) => {
    const row = document.createElement('tr')

    const numberCell = document.createElement('td')
    numberCell.textContent = String(index + 1)

    const carCell = document.createElement('td')
    const carImg = document.createElement('div')
    carImg.className = 'car-visual'
    carImg.innerHTML = CarSVG
    carImg.style.color = winner.color
    carCell.append(carImg)

    const nameCell = document.createElement('td')
    nameCell.textContent = winner.name

    const winsCell = document.createElement('td')
    winsCell.textContent = String(winner.wins)

    const timeCell = document.createElement('td')
    timeCell.textContent = winner.time.toFixed(2)

    row.append(numberCell, carCell, nameCell, winsCell, timeCell)
    tbody.appendChild(row)
  })

  table.append(thead, tbody)
  container.append(title, table)

  return container
}
