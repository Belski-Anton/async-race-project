export function animateCar(
  element: HTMLDivElement,
  duration: number,
  roadWidth: number,
): number {
  let start: null | number = null
  const carWidth = element.getBoundingClientRect().width

  function step(timestamp: number): void {
    if (!start) start = timestamp
    const progress = timestamp - start
    const maxDistance = roadWidth - carWidth

    element.style.transform = `translateX(${Math.min((progress / duration) * maxDistance, maxDistance)}px)`

    if (progress < duration) {
      window.requestAnimationFrame(step)
    }
  }

  return window.requestAnimationFrame(step)
}
