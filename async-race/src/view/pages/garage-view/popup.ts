export function showPopup(
  message: string,
  type: 'success' | 'error' = 'success',
): void {
  const popup = document.createElement('div')
  popup.className = `garage-popup ${type}`
  popup.textContent = message

  popup.onclick = () => {
    popup.classList.add('exit')
    setTimeout(() => popup.remove(), 300)
  }

  document.body.appendChild(popup)

  setTimeout(() => {
    if (popup.parentElement) {
      popup.classList.add('exit')
      setTimeout(() => popup.remove(), 300)
    }
  }, 3000)
}
