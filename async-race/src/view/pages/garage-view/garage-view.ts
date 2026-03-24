import './garage-view.css'
import type { GarageViewProps, GarageViewReturnType } from './types'

import { createCarsList } from './cars-list'
import { createControls } from './garage-controls'
import { createForm } from './garage-form'
import { createGarageInfo } from './garage-info'

export function createGarageView({
  cars,
  page,
  total,
  handlers,
}: GarageViewProps): GarageViewReturnType {
  const garage = document.createElement('div')
  garage.className = 'garage'

  const title = document.createElement('h2')
  title.textContent = 'Garage'

  const info = createGarageInfo(page, total)

  const createFormEl = createForm('CREATE', handlers.onCreate)
  const updateFormEl = createForm('UPDATE', handlers.onUpdate)

  const controls = createControls()
  const carsList = createCarsList(cars, handlers.onSelect, handlers.onDelete)

  const pagination = document.createElement('div')
  pagination.className = 'garage-pagination'

  const prevButton = document.createElement('button')
  prevButton.textContent = 'PREV'
  prevButton.className = 'pagination-prev'
  prevButton.onclick = () => handlers.onPrevPage?.()

  const nextButton = document.createElement('button')
  nextButton.textContent = 'NEXT'
  nextButton.className = 'pagination-next'
  nextButton.onclick = () => handlers.onNextPage?.()

  pagination.append(prevButton, nextButton)

  garage.append(
    title,
    info,
    createFormEl.element,
    updateFormEl.element,
    controls,
    carsList,
    pagination,
  )

  return {
    element: garage,
    updateFormEl,
    createFormEl,
  }
}
