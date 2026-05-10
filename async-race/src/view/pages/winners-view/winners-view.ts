import './winners-view.css'
import CarSVG from '@/assets/car.svg?raw'
import type { WinnersViewProps } from './types'

export function createWinnersView({
  winners,
  page,
  total,
  handlers,
}: WinnersViewProps): HTMLDivElement {
  const container = document.createElement('div')
  container.className = 'winners'

  const totalPages = Math.ceil(total / 10)
  const title = document.createElement('h2')
  title.textContent = `Winners (page ${page} of ${totalPages}, total ${total})`

  const table = document.createElement('table')
  table.className = 'winners-table'

  const thead = document.createElement('thead')
  const headRow = document.createElement('tr')

  const sortableHeaders = [
    { label: 'Number' },
    { label: 'Car' },
    { label: 'Name' },
    { label: 'Wins', sortKey: 'wins' as const },
    { label: 'Best time (seconds)', sortKey: 'time' as const },
  ]

  sortableHeaders.forEach(({ label, sortKey }) => {
    const th = document.createElement('th')
    th.textContent = label
    if (sortKey) {
      th.style.cursor = 'pointer'
      th.addEventListener('click', () => handlers.onSort(sortKey))
    }
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

  const pagination = document.createElement('div')
  pagination.className = 'winners-pagination'

  const prevButton = document.createElement('button')
  prevButton.textContent = 'PREV'
  prevButton.disabled = page <= 1
  prevButton.addEventListener('click', () => handlers.onPrevPage())

  const nextButton = document.createElement('button')
  nextButton.textContent = 'NEXT'
  nextButton.disabled = page >= totalPages
  nextButton.addEventListener('click', () => handlers.onNextPage())

  pagination.append(prevButton, nextButton)

  container.append(title, table, pagination)

  return container
}
