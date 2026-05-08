import { controlEngine } from '@/api/api-cars'
import type { Car, EngineResponse } from '@/model/car.model'
import type { CarController } from '@/view/pages/garage-view/types'
import { showPopup } from '@/view/pages/garage-view/popup'
import { saveWinner } from '@/services/winner-service'

export class RaceController {
  private readonly getCurrentItems: () => Car[]

  public constructor(getCurrentItems: () => Car[]) {
    this.getCurrentItems = getCurrentItems
  }

  public buildHandlers() {
    return {
      onStart: (car: Car): Promise<EngineResponse> =>
        controlEngine(car.id, 'started'),

      onRace: async (controllers: CarController[]) => {
        const promises = controllers.map((c) => c.start())
        try {
          const winner = await Promise.any(promises)
          const winnerName = this.getCurrentItems().find(
            (c) => c.id === winner.id,
          )?.name
          await saveWinner(winner.id, winner.duration)
          showPopup(
            `${winnerName} went first (${winner.duration.toFixed(2)}s)!`,
            'success',
          )
        } catch {
          showPopup('All cars broke down!', 'error')
        }
        await Promise.allSettled(promises)
      },

      onReset: async (controllers: CarController[]) => {
        await Promise.all(
          controllers.map((c) => controlEngine(c.getId(), 'stopped')),
        )
        controllers.forEach((c) => c.reset())
      },
    }
  }
}
