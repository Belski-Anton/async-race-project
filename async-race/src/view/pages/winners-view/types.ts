export type WinnerRow = {
  id: number
  name: string
  color: string
  wins: number
  time: number
}

export type WinnersViewProps = {
  winners: WinnerRow[]
}
