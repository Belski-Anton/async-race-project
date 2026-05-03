import type { Car, EngineResponse } from '@/model/car.model'
export type GarageViewHandlers = {
  onCreate: (name: string, color: string) => Promise<void>
  onUpdate: (name: string, color: string) => Promise<void>
  onSelect: (car: Car) => void
  onDelete: (car: Car) => void
  onNextPage: () => void
  onPrevPage: () => void
  onStart: (car: Car) => Promise<EngineResponse>
  onRace: () => void
}
export type GarageViewProps = {
  cars: Car[]
  page: number
  total: number
  handlers: GarageViewHandlers
}

export type FormType = 'CREATE' | 'UPDATE'

export type FormReturnType = {
  element: HTMLFormElement
  nameInput: HTMLInputElement
  colorInput: HTMLInputElement
}

export type GarageViewReturnType = {
  element: HTMLDivElement
  updateFormEl: FormReturnType
  createFormEl: FormReturnType
  carsControllers: CarController[]
}

export interface CarController {
  element: HTMLDivElement
  start: () => Promise<{ id: number; duration: number; velocity: number }>
  stop: () => void
  reset: () => void
  getId: () => number
}
