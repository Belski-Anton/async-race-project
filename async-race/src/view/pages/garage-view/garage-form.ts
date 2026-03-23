export function createForm(
  type: 'CREATE' | 'UPDATE',
  onSubmit: (name: string, color: string) => void,
): {
  element: HTMLFormElement
  nameInput: HTMLInputElement
  colorInput: HTMLInputElement
} {
  const form = document.createElement('form')

  const nameInput = document.createElement('input')
  nameInput.type = 'text'

  const colorInput = document.createElement('input')
  colorInput.type = 'color'

  const button = document.createElement('button')
  button.textContent = type

  form.append(nameInput, colorInput, button)

  form.onsubmit = (e) => {
    e.preventDefault()
    onSubmit(nameInput.value, colorInput.value)
  }

  return {
    element: form,
    nameInput,
    colorInput,
  }
}
