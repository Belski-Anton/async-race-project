export function createWinnersView(): HTMLDivElement {
  const winner = document.createElement('div')
  const title = document.createElement('h2')
  title.textContent = 'Winner'
  winner.append(title)
  return winner
}
