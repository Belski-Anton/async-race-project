import { getCars } from '@/api/api-cars'
import CarSVG from '@/assets/car.svg?raw'
import { CARS_PER_PAGE } from '@/constant/constants'
import './garage-view.css'

export async function createGarageView(page: number): Promise<HTMLDivElement> {
  const cars = await getCars(page, CARS_PER_PAGE)

  const garage = document.createElement('div')
  garage.className = 'garage'

  const title = document.createElement('h2')
  title.textContent = 'Garage'

  const garageInfo = document.createElement('div')
  garageInfo.className = 'garage-info'

  const pageText = document.createElement('p')
  pageText.textContent = `Page #${page}`

  const countText = document.createElement('p')
  countText.textContent = `Cars (${cars.length})`

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

  cars.forEach((car) => {
    const carItem = document.createElement('div')
    carItem.className = 'car-item'

    const carTop = document.createElement('div')
    carTop.className = 'car-top'

    const selectBtn = document.createElement('button')
    selectBtn.className = 'btn'
    selectBtn.textContent = 'SELECT'

    const removeBtn = document.createElement('button')
    removeBtn.className = 'btn'
    removeBtn.textContent = 'REMOVE'

    const buttons = document.createElement('div')
    buttons.className = 'car-actions'
    buttons.append(selectBtn, removeBtn)

    const carName = document.createElement('span')
    carName.className = 'car-name'
    carName.textContent = car.name

    carTop.append(buttons, carName)

    const carBottom = document.createElement('div')
    carBottom.className = 'car-bottom'

    const engineButtons = document.createElement('div')
    engineButtons.className = 'engine-buttons'

    const startBtn = document.createElement('button')
    startBtn.textContent = 'A'
    startBtn.className = 'engine-btn'

    const stopBtn = document.createElement('button')
    stopBtn.textContent = 'B'
    stopBtn.className = 'engine-btn'
    stopBtn.disabled = true

    engineButtons.append(startBtn, stopBtn)

    const road = document.createElement('div')
    road.className = 'car-road'

    const carImg = document.createElement('div')
    carImg.className = 'car-visual'
    carImg.innerHTML = CarSVG

    carImg.style.color = car.color

    const flag = document.createElement('div')
    flag.className = 'flag'
    flag.textContent = '🏴'

    road.append(carImg, flag)

    carBottom.append(engineButtons, road)

    carItem.append(carTop, carBottom)
    carsList.append(carItem)
  })

  const pagination = document.createElement('div')
  pagination.className = 'garage-pagination'

  garage.append(
    title,
    garageInfo,
    createForm,
    updateForm,
    controls,
    carsList,
    pagination,
  )

  return garage
}
