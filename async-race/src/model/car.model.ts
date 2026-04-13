export type Car = {
  id: number
  name: string
  color: string
}

export type EngineStatus = 'started' | 'stopped' | 'drive'

export type EngineResponse = {
  velocity: number
  distance: number
}
