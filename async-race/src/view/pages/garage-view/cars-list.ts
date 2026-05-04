import type { Car } from '@/model/car.model'
import { createCarItem } from './car-item'
import type { CarController, EngineStartData } from './types'

export function createCarsList(
  cars: Car[],
  onSelect: (car: Car) => void,
  onDelete: (car: Car) => void,
  onStart: (car: Car) => Promise<EngineStartData>,
): { element: HTMLDivElement; controllers: CarController[] } {
  const carsList = document.createElement('div')
  carsList.className = 'garage-list'

  const controllers = cars.map((car) => {
    const controller = createCarItem(car, onSelect, onDelete, onStart)
    carsList.append(controller.element)
    return controller
  })

  return {
    element: carsList,
    controllers,
  }
}
