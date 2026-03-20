import { API_URL } from '@/constants/constants'
import type { Car } from '@/model/car.model'
export async function getCars(
  page: number,
  limit: number,
): Promise<{ items: Car[]; total: number }> {
  const response = await fetch(
    `${API_URL}/garage?_page=${page}&_limit=${limit}`,
  )
  if (!response.ok) {
    throw new Error('Faled to fetch cars')
  }
  const items: Car[] = await response.json()
  const total = Number(response.headers.get('X-Total-Count'))

  return { items, total }
}
