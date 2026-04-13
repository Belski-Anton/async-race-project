import type { Car, EngineResponse } from '@/model/car.model'
import { createCarItem } from './car-item'

export function createCarsList(
  cars: Car[],
  onSelect: (car: Car) => void,
  onDelete: (car: Car) => void,
  onStart: (car: Car) => Promise<EngineResponse>,
): HTMLDivElement {
  const carsList = document.createElement('div')
  carsList.className = 'garage-list'

  cars.forEach((car) => {
    const carItem = createCarItem(car, onSelect, onDelete, onStart)
    carsList.append(carItem)
  })

  return carsList
}
