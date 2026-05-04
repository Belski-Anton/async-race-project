export function getRandomElement<T>(arr: T[]): T | undefined {
  if (arr.length === 0) return undefined
  const index = Math.floor(Math.random() * arr.length)
  return arr[index]
}

export function getRandomColor(): string {
  return `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, '0')}`
}
