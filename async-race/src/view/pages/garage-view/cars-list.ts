import type { Car, EngineResponse } from '@/model/car.model'
import { createCarItem } from './car-item'
import type { CarController } from './types'
export function createCarsList(
  cars: Car[],
  onSelect: (car: Car) => void,
  onDelete: (car: Car) => void,
  onStart: (car: Car) => Promise<EngineResponse>,
): { element: HTMLDivElement; controllers: CarController[] } {
  const carsList = document.createElement('div')
  carsList.className = 'garage-list'

  const controllers: CarController[] = []

  cars.forEach((car) => {
    const carController = createCarItem(car, onSelect, onDelete, onStart)
    carsList.append(carController.element)
    controllers.push(carController)
  })

  return {
    element: carsList,
    controllers: controllers,
  }
}
