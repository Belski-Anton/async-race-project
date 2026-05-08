import { createWinner, getWinner, updateWinner } from '@/api/api-winners'

export async function saveWinner(
  id: number,
  durationMs: number,
): Promise<void> {
  const duration = durationMs / 1000
  const existing = await getWinner(id)
  if (existing) {
    await updateWinner(id, {
      id,
      wins: existing.wins + 1,
      time: Math.min(existing.time, duration),
    })
  } else {
    await createWinner({ id, wins: 1, time: duration })
  }
}
