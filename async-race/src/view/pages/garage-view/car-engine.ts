import { controlEngine } from '@/api/api-cars'
import type { Car } from '@/model/car.model'
import type { EngineStartData, RaceResult } from './types'
import { animateCar } from './animate-car'

export function createCarEngine(
  car: Car,
  carImg: HTMLDivElement,
  road: HTMLDivElement,
  startBtn: HTMLButtonElement,
  stopBtn: HTMLButtonElement,
  onStart: (car: Car) => Promise<EngineStartData>,
): { start: () => Promise<RaceResult>; stop: () => void; reset: () => void } {
  let animation: { stop: () => void } | null = null
  let needsReset = false

  const start = async (): Promise<RaceResult> => {
    startBtn.disabled = true
    stopBtn.disabled = false
    needsReset = false

    try {
      const { velocity, distance } = await onStart(car)
      const duration = distance / velocity
      const roadWidth = road.getBoundingClientRect().width

      animation = animateCar(carImg, duration, roadWidth)

      await controlEngine(car.id, 'drive')

      needsReset = true
      return { id: car.id, duration, velocity }
    } catch (error: unknown) {
      animation?.stop()
      animation = null
      needsReset = true
      if (error instanceof Error) {
        console.log(error.message)
      } else {
        console.log(String(error))
      }
      startBtn.disabled = true
      stopBtn.disabled = false
      throw error
    }
  }

  const stop = () => {
    if (needsReset) {
      carImg.style.transform = 'translateX(0)'
      needsReset = false
      startBtn.disabled = false
      stopBtn.disabled = true
    } else {
      animation?.stop()
      animation = null
      controlEngine(car.id, 'stopped')
      needsReset = true
      startBtn.disabled = true
      stopBtn.disabled = false
    }
  }

  const reset = () => {
    animation?.stop()
    animation = null
    carImg.style.transform = 'translateX(0)'
    needsReset = false
    startBtn.disabled = false
    stopBtn.disabled = true
  }

  return { start, stop, reset }
}
