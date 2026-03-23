import type { Car } from '@/model/car.model'

export type GaraViewHandlers = {
  onCreate: (name: string, color: string) => void
  onUpdate: (name: string, color: string) => void
  onSelect: (car: Car) => void
}
export type GarageViewProps = {
  cars: Car[]
  page: number
  total: number
  handlers: GaraViewHandlers
}
