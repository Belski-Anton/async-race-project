import type { Car } from '@/model/car.model'

export type GaraViewHandlers = {
  onCreate: (name: string, color: string) => void
  onUpdate: (name: string, color: string) => void
  onSelect: (car: Car) => void
  onDelete: (car: Car) => void
}
export type GarageViewProps = {
  cars: Car[]
  page: number
  total: number
  handlers: GaraViewHandlers
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
}
