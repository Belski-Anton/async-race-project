import { getWinners } from '@/api/api-winners'
import { getCar } from '@/api/api-cars'
import { WINNERS_PER_PAGE } from '@/constants/constants'
import type { WinnerRow } from '@/view/pages/winners-view/types'

export class WinnersController {
  private currentPage: number = 1
  private totalWinners: number = 0
  private sortBy: 'id' | 'wins' | 'time' = 'id'
  private sortOrder: 'ASC' | 'DESC' = 'ASC'
  private readonly onRefresh: () => Promise<void>

  constructor(onRefresh: () => Promise<void>) {
    this.onRefresh = onRefresh
  }

  public async getPageData(): Promise<{ winners: WinnerRow[] }> {
    const { items, total } = await getWinners(
      this.currentPage,
      WINNERS_PER_PAGE,
      this.sortBy,
      this.sortOrder,
    )
    this.totalWinners = total

    const winners = await Promise.all(
      items.map(async (winner) => {
        const car = await getCar(winner.id)
        return {
          id: winner.id,
          name: car.name,
          color: car.color,
          wins: winner.wins,
          time: winner.time,
        }
      }),
    )

    return { winners }
  }
}
