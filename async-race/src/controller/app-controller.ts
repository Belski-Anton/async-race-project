import { getCars } from '@/api/api-cars'
import { CARS_PER_PAGE } from '@/constants/constants'
import { createGarageView } from '@/view/pages/garage-view'
import { createWinnersView } from '@/view/pages/winners-view'
export class AppController {
  private readonly container: HTMLElement

  public constructor(container: HTMLElement) {
    this.container = container
  }
  public async showGarage(): Promise<void> {
    const { items, total } = await getCars(1, CARS_PER_PAGE)
    const garage = createGarageView({
      cars: items,
      page: 1,
      total,
    })
    this.container.replaceChildren(garage)
  }
  public showWinners(): void {
    this.container.replaceChildren(createWinnersView())
  }
  public init(): void {
    this.showGarage()
  }
}
