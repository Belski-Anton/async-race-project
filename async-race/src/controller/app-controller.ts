import { createGarageView } from '@/view/garage-view'
import { createWinnersView } from '@/view/winners-view'

export class AppController {
  private readonly container: HTMLElement

  public constructor(container: HTMLElement) {
    this.container = container
  }
  public showGarage(): void {
    this.container.replaceChildren(createGarageView(1, 0))
  }
  public showWinners(): void {
    this.container.replaceChildren(createWinnersView())
  }
  public init(): void {
    this.showGarage()
  }
}
