import type { Car } from '@/model/car.model'
import { createCarItem } from './car-item'

export function createCarsList(cars: Car[]): HTMLDivElement {
  const carsList = document.createElement('div')
  carsList.className = 'garage-list'

  cars.forEach((car) => {
    const carItem = createCarItem(car)
    carsList.append(carItem)
  })

  return carsList
}
