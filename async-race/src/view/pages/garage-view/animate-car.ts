export function animateCar(
  element: HTMLDivElement,
  duration: number,
  roadWidth: number,
) {
  let start: null | number = null
  let frameId = 0
  let stopped = false
  const carWidth = element.getBoundingClientRect().width

  function step(timestamp: number): void {
    if (stopped) return
    if (!start) start = timestamp
    const progress = timestamp - start
    const maxDistance = roadWidth - carWidth

    element.style.transform = `translateX(${Math.min((progress / duration) * maxDistance, maxDistance)}px)`

    if (progress < duration) {
      frameId = requestAnimationFrame(step)
    }
  }
  frameId = requestAnimationFrame(step)
  return {
    stop() {
      stopped = true
      cancelAnimationFrame(frameId)
    },
  }
}
