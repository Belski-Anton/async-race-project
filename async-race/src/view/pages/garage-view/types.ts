import type { Car } from '@/model/car.model'

export type GarageViewProps = {
  cars: Car[]
  page: number
  total: number
  handlers: GarageViewHandlers
}

export type EngineStartData = {
  velocity: number
  distance: number
}
export type RaceResult = {
  id: number
  duration: number
  velocity: number
}
export type GarageViewHandlers = {
  onCreate: (name: string, color: string) => Promise<void>
  onUpdate: (name: string, color: string) => Promise<void>
  onSelect: (car: Car) => void
  onDelete: (car: Car) => void
  onNextPage: () => void
  onPrevPage: () => void
  onStart: (car: Car) => Promise<EngineStartData>
  onRace: (controllers: CarController[]) => Promise<void>
  onReset: (controllers: CarController[]) => Promise<void>
  onGenerationCars: () => Promise<void>
}
export interface CarController {
  element: HTMLDivElement
  start: () => Promise<RaceResult>
  stop: () => void
  reset: () => void
  getId: () => number
}
