import type { Car } from '@/model/car.model'

export type GarageViewProps = {
  cars: Car[]
  page: number
  total: number
}
