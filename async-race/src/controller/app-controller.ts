import { createGarageView } from '../view/garage-view'
import { createWinnersView } from '../view/winners-view'

export class AppController {
  private readonly container: HTMLDivElement

  public constructor(container: HTMLDivElement) {
    this.container = container
  }
  public showGarage(): void {
    this.container.replaceChildren(createGarageView())
  }
  public showWinners(): void {
    this.container.replaceChildren(createWinnersView())
  }
  public init(): void {
    this.showGarage()
  }
}
