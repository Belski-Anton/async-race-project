export function createForm(buttonText: string): HTMLFormElement {
  const form = document.createElement('form')
  form.className = 'garage-form'

  const input = document.createElement('input')
  input.type = 'text'

  const colorInput = document.createElement('input')
  colorInput.type = 'color'

  const button = document.createElement('button')
  button.type = 'submit'
  button.textContent = buttonText

  form.append(input, colorInput, button)

  return form
}
