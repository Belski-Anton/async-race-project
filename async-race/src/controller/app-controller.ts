import { createGarageView } from '@/view/garage-view'
import { createWinnersView } from '@/view/winners-view'
export class AppController {
  private readonly container: HTMLElement

  public constructor(container: HTMLElement) {
    this.container = container
  }
  public async showGarage(): Promise<void> {
    const garage = await createGarageView(1)
    this.container.replaceChildren(garage)
  }
  public showWinners(): void {
    this.container.replaceChildren(createWinnersView())
  }
  public init(): void {
    this.showGarage()
  }
}
