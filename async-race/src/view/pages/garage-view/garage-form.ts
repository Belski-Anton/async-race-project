import type { FormReturnType, FormType } from './types'

export function createForm(
  type: FormType,
  onSubmit: (name: string, color: string) => Promise<void>,
): FormReturnType {
  const form = document.createElement('form')
  form.className = 'garage-form'

  const nameInput = document.createElement('input')
  nameInput.type = 'text'
  nameInput.className = 'form-input'
  nameInput.placeholder = 'Enter car name...'

  const colorInput = document.createElement('input')
  colorInput.type = 'color'
  colorInput.className = 'form-color'

  const button = document.createElement('button')
  button.textContent = type
  button.className = 'form-button'
  button.type = 'submit'

  form.append(nameInput, colorInput, button)

  form.onsubmit = async (e) => {
    e.preventDefault()
    try {
      await onSubmit(nameInput.value, colorInput.value)
      nameInput.value = ''
    } catch {
      console.error('Failed to submit form')
    }
  }
  return {
    element: form,
    nameInput,
    colorInput,
  }
}
