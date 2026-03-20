export function createGarageInfo(page: number, total: number): HTMLDivElement {
  const garageInfo = document.createElement('div')
  garageInfo.className = 'garage-info'

  const pageText = document.createElement('p')
  pageText.textContent = `Page #${page}`

  const countText = document.createElement('p')
  countText.textContent = `Cars (${total})`

  garageInfo.append(pageText, countText)

  return garageInfo
}
