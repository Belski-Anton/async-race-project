export function createGarageView(page: number, count: number): HTMLDivElement {
  const garage = document.createElement('div')

  const title = document.createElement('h2')
  title.textContent = 'Garage'

  const pageText = document.createElement('p')
  pageText.textContent = `Page #${page}`

  const countText = document.createElement('p')
  countText.textContent = `Cars (${count})`

  const createForm = document.createElement('form')

  const createInput = document.createElement('input')
  createInput.type = 'text'

  const createColorInput = document.createElement('input')
  createColorInput.type = 'color'

  const createButton = document.createElement('button')
  createButton.type = 'submit'
  createButton.textContent = 'CREATE'

  createForm.append(createInput, createColorInput, createButton)

  const updateForm = document.createElement('form')

  const updateInput = document.createElement('input')
  updateInput.type = 'text'

  const updateColorInput = document.createElement('input')
  updateColorInput.type = 'color'

  const updateButton = document.createElement('button')
  updateButton.type = 'submit'
  updateButton.textContent = 'UPDATE'

  updateForm.append(updateInput, updateColorInput, updateButton)

  const controls = document.createElement('div')

  const raceButton = document.createElement('button')
  raceButton.type = 'button'
  raceButton.textContent = 'RACE'

  const resetButton = document.createElement('button')
  resetButton.type = 'button'
  resetButton.textContent = 'RESET'

  const generateButton = document.createElement('button')
  generateButton.type = 'button'
  generateButton.textContent = 'GENERATE CARS'

  controls.append(raceButton, resetButton, generateButton)

  const carsList = document.createElement('div')

  const pagination = document.createElement('div')

  const prevButton = document.createElement('button')
  prevButton.type = 'button'
  prevButton.textContent = 'PREV'

  const nextButton = document.createElement('button')
  nextButton.type = 'button'
  nextButton.textContent = 'NEXT'

  pagination.append(prevButton, nextButton)

  garage.append(
    title,
    pageText,
    countText,
    createForm,
    updateForm,
    controls,
    carsList,
    pagination,
  )

  return garage
}
