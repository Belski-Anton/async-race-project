const API_URL = 'http://localhost:3000'
type Car = {
  id: number
  name: string
  color: string
}
export async function getCars(page: number, limit: number): Promise<Car[]> {
  const response = await fetch(
    `${API_URL}/garage?_page=${page}&_limit=${limit}`,
  )
  return await response.json()
}
