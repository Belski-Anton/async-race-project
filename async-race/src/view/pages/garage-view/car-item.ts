import type { Car, EngineResponse } from '@/model/car.model'
import { controlEngine } from '@/api/api-cars'
import { animateCar } from './animate-car'
import CarSVG from '@/assets/car.svg?raw'

export function createCarItem(
  car: Car,
  onSelect: (car: Car) => void,
  onDelete: (car: Car) => void,
  onStart: (car: Car) => Promise<EngineResponse>,
): HTMLDivElement {
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

  startBtn.onclick = async () => {
    startBtn.disabled = true
    stopBtn.disabled = false

    let animationId = 0

    try {
      const { velocity, distance } = await onStart(car)
      const duration = distance / velocity
      const roadWidth = road.getBoundingClientRect().width

      animationId = animateCar(carImg, duration, roadWidth)

      await controlEngine(car.id, 'drive')
    } catch {
      cancelAnimationFrame(animationId)
      startBtn.disabled = false
      stopBtn.disabled = true
    }
  }

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

  return carItem
}
