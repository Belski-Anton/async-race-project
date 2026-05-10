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

  public async getPageData(): Promise<{
    winners: WinnerRow[]
    page: number
    total: number
  }> {
    const { items, total } = await getWinners(
      this.currentPage,
      WINNERS_PER_PAGE,
      this.sortBy,
      this.sortOrder,
    )
    this.totalWinners = total

    const results = await Promise.all(
      items.map(async (winner) => {
        try {
          const car = await getCar(winner.id)
          return {
            id: winner.id,
            name: car.name,
            color: car.color,
            wins: winner.wins,
            time: winner.time,
          }
        } catch {
          return null
        }
      }),
    )

    const winners = results.filter((w): w is WinnerRow => w !== null)

    return { winners, page: this.currentPage, total: this.totalWinners }
  }

  public buildHandlers() {
    return {
      onPrevPage: async () => {
        if (this.currentPage > 1) {
          this.currentPage--
          await this.onRefresh()
        }
      },

      onNextPage: async () => {
        const totalPages = Math.ceil(this.totalWinners / WINNERS_PER_PAGE)
        if (this.currentPage < totalPages) {
          this.currentPage++
          await this.onRefresh()
        }
      },

      onSort: async (column: 'id' | 'wins' | 'time') => {
        if (this.sortBy === column) {
          this.sortOrder = this.sortOrder === 'ASC' ? 'DESC' : 'ASC'
        } else {
          this.sortBy = column
          this.sortOrder = 'ASC'
        }
        this.currentPage = 1
        await this.onRefresh()
      },
    }
  }
}
