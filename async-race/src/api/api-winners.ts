import type { Winner } from '@/model/winner.model'
import { API_URL } from '@/constants/constants'
// import { createWinnersView } from "@/view/pages/winners-view"
export async function getWinner(id: number): Promise<Winner | null> {
  const response = await fetch(`${API_URL}/winners/${id}`)
  if (response.status === 404) {
    return null
  }
  if (!response.ok) {
    throw new Error('Failed to fetch winner')
  }
  return response.json()
}

export async function getWinners(
  page: number,
  limit: number,
  sort: 'id' | 'wins' | 'time',
  order: 'ASC' | 'DESC',
): Promise<{ items: Winner[]; total: number }> {
  const response = await fetch(
    `${API_URL}/winners?_page=${page}&_limit=${limit}&_sort=${sort}&_order=${order}`,
  )
  if (!response.ok) {
    throw new Error('Failed to fetch winners')
  }
  const items: Winner[] = await response.json()
  const total = Number(response.headers.get('X-Total-Count'))

  return { items, total }
}

export async function createWinner(winner: Winner): Promise<Winner> {
  const response = await fetch(`${API_URL}/winners`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(winner),
  })

  if (!response.ok) {
    throw new Error('Failed to create winner')
  }

  return response.json()
}

export async function createWinnner(winner: Winner): Promise<Winner> {
  const response = await fetch(`${API_URL}/winners`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(winner),
  })
  if (!response.ok) {
    throw new Error('Failed to create winner')
  }
  return response.json()
}
export async function deleteWinner(id: number): Promise<void> {
  const response = await fetch(`${API_URL}/winners/${id}`, {
    method: 'DELETE',
  })
  if (!response.ok) {
    throw new Error('Failed to delete car')
  }
}
export async function updateWinner(
  id: number,
  winner: Winner,
): Promise<Winner> {
  const response = await fetch(`${API_URL}/winners/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(winner),
  })
  if (!response.ok) {
    throw new Error('Failed to update car')
  }
  return response.json()
}
