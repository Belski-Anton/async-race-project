import { controlEngine } from '@/api/api-cars'
import CarSVG from '@/assets/car.svg?raw'
import type { Car, EngineResponse } from '@/model/car.model'
import { animateCar } from './animate-car'

export interface CarController {
  element: HTMLDivElement
  start: () => Promise<void>
  stop: () => void
  reset: () => void
  getId: () => number
}

export function createCarItem(
  car: Car,
  onSelect: (car: Car) => void,
  onDelete: (car: Car) => void,
  onStart: (car: Car) => Promise<EngineResponse>,
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

  let animation: { stop: () => void } | null = null
  let needsReset = false

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

  const start = async () => {
    startBtn.disabled = true
    stopBtn.disabled = false
    needsReset = false

    try {
      const { velocity, distance } = await onStart(car)
      const duration = distance / velocity
      const roadWidth = road.getBoundingClientRect().width

      animation = animateCar(carImg, duration, roadWidth)

      await controlEngine(car.id, 'drive')

      needsReset = true
    } catch (error: unknown) {
      animation?.stop()
      animation = null
      needsReset = true

      if (error instanceof Error) {
        console.log(error.message)
      } else {
        console.log(String(error))
      }

      startBtn.disabled = true
      stopBtn.disabled = false
    }
  }

  const stop = () => {
    if (needsReset) {
      carImg.style.transform = 'translateX(0)'
      needsReset = false
      startBtn.disabled = false
      stopBtn.disabled = true
    } else {
      animation?.stop()
      animation = null
      controlEngine(car.id, 'stopped')
      needsReset = true
      startBtn.disabled = true
      stopBtn.disabled = false
    }
  }

  const reset = () => {
    animation?.stop()
    animation = null
    carImg.style.transform = 'translateX(0)'
    needsReset = false
    startBtn.disabled = false
    stopBtn.disabled = true
  }

  const getId = () => car.id

  startBtn.onclick = start
  stopBtn.onclick = stop

  engineButtons.append(startBtn, stopBtn)
  carBottom.append(engineButtons, road)
  carItem.append(carTop, carBottom)

  return {
    element: carItem,
    start,
    stop,
    reset,
    getId,
  }
}
