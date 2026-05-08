import { createCar } from '@/api/api-cars'
import { BRANDS, MODELS } from '@/constants/car-names'
import { getRandomColor, getRandomElement } from '@/utils/random'

export async function generateCars(): Promise<void> {
  const cars = Array.from({ length: 100 }, () => ({
    name: `${getRandomElement(BRANDS)} ${getRandomElement(MODELS)}`,
    color: getRandomColor(),
  }))
  await Promise.all(cars.map((car) => createCar(car.name, car.color)))
}
