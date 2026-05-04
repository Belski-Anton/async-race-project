export function createControls(
  onStart: () => void,
  onReset: () => void,
): HTMLDivElement {
  const controls = document.createElement('div')
  controls.className = 'garage-controls'

  const raceButton = document.createElement('button')
  raceButton.type = 'button'
  raceButton.textContent = 'RACE'

  const resetButton = document.createElement('button')
  resetButton.type = 'button'
  resetButton.textContent = 'RESET'
  resetButton.disabled = true

  raceButton.onclick = async () => {
    raceButton.disabled = true
    resetButton.disabled = true
    await onStart()
    resetButton.disabled = false
  }

  resetButton.onclick = async () => {
    await onReset()
    raceButton.disabled = false
    resetButton.disabled = true
  }

  const generateButton = document.createElement('button')
  generateButton.type = 'button'
  generateButton.textContent = 'GENERATE CARS'

  controls.append(raceButton, resetButton, generateButton)

  return controls
}
