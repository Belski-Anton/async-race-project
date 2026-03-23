import { createCar, getCars, updateCar } from '@/api/api-cars'
import { CARS_PER_PAGE } from '@/constants/constants'
import type { Car } from '@/model/car.model'
import { createGarageView } from '@/view/pages/garage-view'
import { createWinnersView } from '@/view/pages/winners-view'
export class AppController {
  private readonly container: HTMLElement
  private selectedCarId: number | null = null
  public constructor(container: HTMLElement) {
    this.container = container
  }
  public async showGarage(): Promise<void> {
    const { items, total } = await getCars(1, CARS_PER_PAGE)
    const garage = createGarageView({
      cars: items,
      page: 1,
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
