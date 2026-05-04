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
  handlers,
}: GarageViewProps): HTMLElement {
  const garage = document.createElement('div')
  garage.className = 'garage'

  const title = document.createElement('h2')
  title.textContent = 'Garage'

  const info = createGarageInfo(page, total, cars.length)

  const createFormEl = createForm('CREATE', handlers.onCreate)
  const updateFormEl = createForm('UPDATE', handlers.onUpdate)

  const carsList = createCarsList(
    cars,
    (car) => {
      updateFormEl.nameInput.value = car.name
      updateFormEl.colorInput.value = car.color
      handlers.onSelect(car)
    },
    handlers.onDelete,
    handlers.onStart,
  )

  const controls = createControls(
    () => handlers.onRace(carsList.controllers),
    () => handlers.onReset(carsList.controllers),
    () => handlers.onGenerationCars(),
  )

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
    carsList.element,
    pagination,
  )

  return garage
}
