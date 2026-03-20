import './footer-view.css'

export function createFooter(): HTMLElement {
  const footer = document.createElement('footer')
  footer.classList.add('footer')

  const pagination = document.createElement('div')
  pagination.classList.add('pagination')

  const prevButton = document.createElement('button')
  prevButton.type = 'button'
  prevButton.classList.add('pagination-button')
  prevButton.textContent = 'PREV'

  const nextButton = document.createElement('button')
  nextButton.type = 'button'
  nextButton.classList.add('pagination-button')
  nextButton.textContent = 'NEXT'

  pagination.append(prevButton, nextButton)
  footer.append(pagination)

  return footer
}
