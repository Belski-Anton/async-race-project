import CarSVG from '@/assets/car.svg?raw'
import type { Car } from '@/model/car.model'
import type { CarController, EngineStartData } from './types'
import { createCarEngine } from './car-engine'

export function createCarItem(
  car: Car,
  onSelect: (car: Car) => void,
  onDelete: (car: Car) => void,
  onStart: (car: Car) => Promise<EngineStartData>,
): CarController {
  const carItem = document.createElement('div')
  carItem.className = 'car-item'

  const carTop = document.createElement('div')
  carTop.className = 'car-top'

  const selectBtn = document.createElement('button')
  selectBtn.className = 'btn'
  selectBtn.textContent = 'SELECT'
  selectBtn.onclick = () => onSelect(car)

  const removeBtn = document.createElement('button')
  removeBtn.className = 'btn'
  removeBtn.textContent = 'REMOVE'
  removeBtn.onclick = () => onDelete(car)

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

  const { start, stop, reset } = createCarEngine(
    car,
    carImg,
    road,
    startBtn,
    stopBtn,
    onStart,
  )

  const getId = () => car.id

  startBtn.onclick = start
  stopBtn.onclick = stop

  engineButtons.append(startBtn, stopBtn)
  carBottom.append(engineButtons, road)
  carItem.append(carTop, carBottom)

  return { element: carItem, start, stop, reset, getId }
}
