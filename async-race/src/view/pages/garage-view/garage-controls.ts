export function createControls(onStart: () => void): HTMLDivElement {
  const controls = document.createElement('div')
  controls.className = 'garage-controls'

  const raceButton = document.createElement('button')
  raceButton.type = 'button'
  raceButton.textContent = 'RACE'

  raceButton.onclick = async () => {
    raceButton.disabled = true
    await onStart()
    resetButton.disabled = false
  }

  const resetButton = document.createElement('button')
  resetButton.type = 'button'
  resetButton.textContent = 'RESET'

  const generateButton = document.createElement('button')
  generateButton.type = 'button'
  generateButton.textContent = 'GENERATE CARS'

  controls.append(raceButton, resetButton, generateButton)

  return controls
}
