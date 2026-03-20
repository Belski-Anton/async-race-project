export function createControls(): HTMLDivElement {
  const controls = document.createElement('div')
  controls.className = 'garage-controls'

  const raceButton = document.createElement('button')
  raceButton.type = 'button'
  raceButton.textContent = 'RACE'

  const resetButton = document.createElement('button')
  resetButton.type = 'button'
  resetButton.textContent = 'RESET'

  const generateButton = document.createElement('button')
  generateButton.type = 'button'
  generateButton.textContent = 'GENERATE CARS'

  controls.append(raceButton, resetButton, generateButton)

  return controls
}
