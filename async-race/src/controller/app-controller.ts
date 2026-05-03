import {
  controlEngine,
  createCar,
  deleteCar,
  getCars,
  updateCar,
} from '@/api/api-cars'
import { CARS_PER_PAGE } from '@/constants/constants'
import type { Car, EngineResponse } from '@/model/car.model'
import type { CarController } from '@/view/pages/garage-view/types'
import { createGarageView } from '@/view/pages/garage-view'
import { showPopup } from '@/view/pages/garage-view/popup'
import { createWinnersView } from '@/view/pages/winners-view'

export class AppController {
  private readonly container: HTMLElement

  private selectedCarId: number | null = null
  private currentPage: number = 1
  private totalCars: number = 0
  private currentItems: Car[] = []

  public constructor(container: HTMLElement) {
    this.container = container
  }

  public init(): void {
    void this.showGarage()
  }

  private render(element: HTMLElement): void {
    this.container.replaceChildren(element)
  }

  public async showGarage(): Promise<void> {
    const { items, total } = await getCars(this.currentPage, CARS_PER_PAGE)
    this.totalCars = total
    this.currentItems = items

    this.render(
      createGarageView({
        cars: items,
        page: this.currentPage,
        total,
        handlers: this.buildHandlers(),
      }),
    )
  }

  public showWinners(): void {
    this.render(createWinnersView())
  }

  private buildHandlers() {
    return {
      onCreate: async (name: string, color: string) => {
        await createCar(name, color)
        await this.showGarage()
      },
      onSelect: (car: Car) => {
        this.selectedCarId = car.id
      },
      onUpdate: async (name: string, color: string) => {
        if (this.selectedCarId === null) return
        await updateCar(this.selectedCarId, name, color)
        await this.showGarage()
      },
      onDelete: async (car: Car) => {
        await deleteCar(car.id)
        if (this.selectedCarId === car.id) this.selectedCarId = null
        await this.showGarage()
      },
      onPrevPage: () => this.changePage(-1),
      onNextPage: () => this.changePage(1),
      onStart: (car: Car): Promise<EngineResponse> =>
        controlEngine(car.id, 'started'),
      onRace: async (controllers: CarController[]) => {
        const promises = controllers.map((c) => c.start())
        try {
          const winner = await Promise.any(promises)
          const winnerName = this.currentItems.find(
            (c) => c.id === winner.id,
          )?.name
          showPopup(
            `${winnerName} went first (${winner.duration.toFixed(2)}s)!`,
            'success',
          )
        } catch {
          showPopup('💥 Все машины сломались!', 'error')
        }
      },
    }
  }

  private async changePage(delta: number): Promise<void> {
    const next = this.currentPage + delta
    const totalPages = Math.ceil(this.totalCars / CARS_PER_PAGE)
    if (next < 1 || next > totalPages) return
    this.currentPage = next
    await this.showGarage()
  }
}
