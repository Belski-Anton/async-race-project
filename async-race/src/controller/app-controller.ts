import { createCar, getCars, updateCar, deleteCar } from '@/api/api-cars'
import { CARS_PER_PAGE } from '@/constants/constants'
import type { Car } from '@/model/car.model'
import { createGarageView } from '@/view/pages/garage-view'
import { createWinnersView } from '@/view/pages/winners-view'
export class AppController {
  private readonly container: HTMLElement
  private selectedCarId: number | null = null
  private currentPage: number = 1
  public constructor(container: HTMLElement) {
    this.container = container
  }
  public async showGarage(): Promise<void> {
    const { items, total } = await getCars(this.currentPage, CARS_PER_PAGE)
    const garage = createGarageView({
      cars: items,
      page: this.currentPage,
      total,
      handlers: {
        onCreate: async (name, color) => {
          await createCar(name, color)
          await this.showGarage()
        },
        onSelect: (car: Car) => {
          this.selectedCarId = car.id
          garage.updateFormEl.nameInput.value = car.name
          garage.updateFormEl.colorInput.value = car.color
        },
        onUpdate: async (name: string, color: string) => {
          if (this.selectedCarId === null) return
          await updateCar(this.selectedCarId, name, color)
          await this.showGarage()
        },
        onDelete: async (car: Car) => {
          await deleteCar(car.id)
          if (this.selectedCarId === car.id) {
            this.selectedCarId = null
            garage.updateFormEl.nameInput.value = ''
            garage.updateFormEl.colorInput.value = '#000000'
          }
          await this.showGarage()
        },
        onPrevPage: async () => {
          if (this.currentPage > 1) {
            this.currentPage--
            await this.showGarage()
          }
        },
        onNextPage: async () => {
          const totalPage = Math.ceil(total / CARS_PER_PAGE)
          if (this.currentPage < totalPage) {
            this.currentPage++
            await this.showGarage()
          }
        },
      },
    })
    this.container.replaceChildren(garage.element)
  }
  public showWinners(): void {
    this.container.replaceChildren(createWinnersView())
  }
  public init(): void {
    this.showGarage()
  }
}
