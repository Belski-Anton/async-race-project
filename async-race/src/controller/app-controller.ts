import { createGarageView } from '@/view/pages/garage-view'
import { createWinnersView } from '@/view/pages/winners-view'
import { GarageController } from '@/controller/garage-controller'
import { RaceController } from '@/controller/race-controller'

export class AppController {
  private readonly container: HTMLElement
  private readonly garage: GarageController
  private readonly race: RaceController

  public constructor(container: HTMLElement) {
    this.container = container
    this.garage = new GarageController(() => this.showGarage())
    this.race = new RaceController(() => this.garage.getCurrentItems())
  }

  public init(): void {
    void this.showGarage()
  }

  private render(element: HTMLElement): void {
    this.container.replaceChildren(element)
  }

  public async showGarage(): Promise<void> {
    const { cars, page, total } = await this.garage.getPageData()

    this.render(
      createGarageView({
        cars,
        page,
        total,
        handlers: {
          ...this.garage.buildHandlers(),
          ...this.race.buildHandlers(),
        },
      }),
    )
  }

  public showWinners(): void {
    this.render(createWinnersView())
  }
}
