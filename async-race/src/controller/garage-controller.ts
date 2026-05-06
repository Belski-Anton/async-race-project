import { createCar, deleteCar, getCars, updateCar } from '@/api/api-cars'
import { CARS_PER_PAGE } from '@/constants/constants'
import { BRANDS, MODELS } from '@/constants/car-names'
import type { Car } from '@/model/car.model'
import { getRandomColor, getRandomElement } from '@/utils/random'

export class GarageController {
  private readonly onRefresh: () => Promise<void>

  private selectedCarId: number | null = null
  private currentPage: number = 1
  private totalCars: number = 0
  private currentItems: Car[] = []

  public constructor(onRefresh: () => Promise<void>) {
    this.onRefresh = onRefresh
  }

  public getCurrentItems(): Car[] {
    return this.currentItems
  }

  public async getPageData(): Promise<{
    cars: Car[]
    page: number
    total: number
  }> {
    const { items, total } = await getCars(this.currentPage, CARS_PER_PAGE)
    this.totalCars = total
    this.currentItems = items
    return { cars: items, page: this.currentPage, total }
  }

  public buildHandlers() {
    return {
      onCreate: async (name: string, color: string) => {
        await createCar(name, color)
        await this.onRefresh()
      },
      onSelect: (car: Car) => {
        this.selectedCarId = car.id
      },
      onUpdate: async (name: string, color: string) => {
        if (this.selectedCarId === null) return
        await updateCar(this.selectedCarId, name, color)
        await this.onRefresh()
      },
      onDelete: async (car: Car) => {
        await deleteCar(car.id)
        if (this.selectedCarId === car.id) this.selectedCarId = null
        await this.onRefresh()
      },
      onPrevPage: () => this.changePage(-1),
      onNextPage: () => this.changePage(1),
      onGenerationCars: async () => {
        const cars = Array.from({ length: 100 }, () => ({
          name: `${getRandomElement(BRANDS)} ${getRandomElement(MODELS)}`,
          color: getRandomColor(),
        }))
        await Promise.all(cars.map((car) => createCar(car.name, car.color)))
        await this.onRefresh()
      },
    }
  }

  private async changePage(delta: number): Promise<void> {
    const next = this.currentPage + delta
    const totalPages = Math.ceil(this.totalCars / CARS_PER_PAGE)
    if (next < 1 || next > totalPages) return
    this.currentPage = next
    await this.onRefresh()
  }
}
