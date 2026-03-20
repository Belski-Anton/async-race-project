import type { Car } from '@/model/car.model'
import './garage-view.css'

import { createGarageInfo } from './garage-info'
import { createForm } from './garage-form'
import { createControls } from './garage-controls'
import { createCarsList } from './cars-list'

export function createGarageView(
  cars: Car[],
  page: number,
  total: number,
): HTMLDivElement {
  const garage = document.createElement('div')
  garage.className = 'garage'

  const title = document.createElement('h2')
  title.textContent = 'Garage'

  const info = createGarageInfo(page, total)

  const createFormEl = createForm('CREATE')
  const updateFormEl = createForm('UPDATE')

  const controls = createControls()

  const carsList = createCarsList(cars)

  const pagination = document.createElement('div')
  pagination.className = 'garage-pagination'

  garage.append(
    title,
    info,
    createFormEl,
    updateFormEl,
    controls,
    carsList,
    pagination,
  )

  return garage
}
