import './winners-view.css'

export function createWinnersView(): HTMLDivElement {
  const winners = document.createElement('div')
  winners.className = 'winners'

  const title = document.createElement('h2')
  title.textContent = 'Winner'

  const winnersList = document.createElement('div')
  winnersList.className = 'winners-list'

  winners.append(title, winnersList)
  return winners
}
