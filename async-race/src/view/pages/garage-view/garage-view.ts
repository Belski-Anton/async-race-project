import './garage-view.css'
import type { GarageViewProps } from './types'

import { createCarsList } from './cars-list'
import { createControls } from './garage-controls'
import { createForm } from './garage-form'
import { createGarageInfo } from './garage-info'

export function createGarageView({
  cars,
  page,
  total,
}: GarageViewProps): HTMLDivElement {
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
