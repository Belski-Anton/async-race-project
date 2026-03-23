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
export async function createCar(name: string, color: string): Promise<Car> {
  const response = await fetch(`${API_URL}/garage`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      name,
      color,
    }),
  })
  if (!response.ok) {
    throw new Error('Failed to create car')
  }
  return response.json()
}
export async function updateCar(
  id: number,
  name: string,
  color: string,
): Promise<Car> {
  const response = await fetch(`${API_URL}/garage/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      name,
      color,
    }),
  })
  if (!response.ok) {
    throw new Error('Failed to create car')
  }
  return response.json()
}

export async function deleteCar(id: number): Promise<void> {
  const response = await fetch(`${API_URL}/garage/${id}`, {
    method: 'DELETE',
  })

  if (!response.ok) {
    throw new Error('Failed to delete car')
  }
}
