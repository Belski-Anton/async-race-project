import './footer-view.css'

export function createFooter(): HTMLElement {
  const footer = document.createElement('footer')
  footer.className = 'footer'

  const container = document.createElement('div')
  container.className = 'footer-container'

  const title = document.createElement('span')
  title.textContent = '🚗 Async Race'
  title.className = 'footer-title'

  const copyright = document.createElement('span')
  copyright.textContent = `© ${new Date().getFullYear()}`
  copyright.className = 'footer-copyright'

  const githubLink = document.createElement('a')
  githubLink.href = 'https://github.com/your-repo/async-race'
  githubLink.textContent = 'GitHub'
  githubLink.target = '_blank'
  githubLink.className = 'footer-link'

  const version = document.createElement('span')
  version.textContent = 'v1.0.0'
  version.className = 'footer-version'

  container.append(title, copyright, githubLink, version)
  footer.append(container)

  return footer
}
