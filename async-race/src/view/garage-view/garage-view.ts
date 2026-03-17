import './garage-view.css'

export function createGarageView(page: number, count: number): HTMLDivElement {
  const garage = document.createElement('div')
  garage.className = 'garage'

  const title = document.createElement('h2')
  title.textContent = 'Garage'

  const garageInfo = document.createElement('div')
  garageInfo.className = 'garage-info'

  const pageText = document.createElement('p')
  pageText.textContent = `Page #${page}`

  const countText = document.createElement('p')
  countText.textContent = `Cars (${count})`

  garageInfo.append(pageText, countText)

  const createForm = document.createElement('form')
  createForm.className = 'garage-form'

  const createInput = document.createElement('input')
  createInput.type = 'text'

  const createColorInput = document.createElement('input')
  createColorInput.type = 'color'

  const createButton = document.createElement('button')
  createButton.type = 'submit'
  createButton.textContent = 'CREATE'

  createForm.append(createInput, createColorInput, createButton)

  const updateForm = document.createElement('form')
  updateForm.className = 'garage-form'

  const updateInput = document.createElement('input')
  updateInput.type = 'text'

  const updateColorInput = document.createElement('input')
  updateColorInput.type = 'color'

  const updateButton = document.createElement('button')
  updateButton.type = 'submit'
  updateButton.textContent = 'UPDATE'

  updateForm.append(updateInput, updateColorInput, updateButton)

  const controls = document.createElement('div')
  controls.className = 'garage-controls'

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
  carsList.className = 'garage-list'

  const pagination = document.createElement('div')
  pagination.className = 'garage-pagination'

  garage.append(title, garageInfo, createForm, updateForm, controls, carsList)

  return garage
}
