export type WinnerRow = {
  id: number
  name: string
  color: string
  wins: number
  time: number
}

export type WinnersViewProps = {
  winners: WinnerRow[]
  page: number
  total: number
  handlers: {
    onPrevPage: () => void
    onNextPage: () => void
    onSort: (column: 'id' | 'wins' | 'time') => void
  }
}
