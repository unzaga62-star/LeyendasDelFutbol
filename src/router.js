
import { renderHome, initHome } from './views/HomeView.js'
import { renderChat, setupChat } from './views/ChatView.js'
import { renderAbout } from './views/AboutView.js'

let cleanupCurrentView = null

// Devuelve el HTML correspondiente a la ruta actual
export function router() {
  const path = window.location.pathname

  if (path === '/home' || path === '/') {
    return renderHome()
  }

  if (path === '/chat') {
    return renderChat()
  }

  if (path === '/about') {
    return renderAbout()
  }

  return renderHome()
}

// Renderiza la vista y ejecuta su configuración
export function renderPage(app) {
  // Limpiar los listeners de la vista anterior
  if (cleanupCurrentView) {
    cleanupCurrentView()
    cleanupCurrentView = null
  }

  // Renderizar la nueva vista
  app.innerHTML = router()

  const path = window.location.pathname

  // Configurar la vista del chat
  if (path === '/chat') {
    cleanupCurrentView = setupChat(navigate)
  }

  // Configurar la Home
  else if (path !== '/about') {
    initHome()
  }
}

// Centraliza la navegación sin recargar la página
export function navigate(url) {
  window.history.pushState({}, '', url)

  const app = document.querySelector('#app')
  renderPage(app)
}

// Activa la navegación de los enlaces y del navegador
export function enableNavigation(app) {
  document.addEventListener('click', (event) => {
    const link = event.target.closest('a[data-link]')

    if (!link) {
      return
    }

    // Conserva los atajos del navegador para abrir enlaces
    if (
      event.defaultPrevented ||
      event.button !== 0 ||
      event.metaKey ||
      event.ctrlKey ||
      event.shiftKey ||
      event.altKey ||
      link.target === '_blank' ||
      link.hasAttribute('download')
    ) {
      return
    }

    // Solo interceptamos enlaces del mismo origen
    if (link.origin !== window.location.origin) {
      return
    }

    event.preventDefault()
    navigate(link.href)
  })

  window.addEventListener('popstate', () => {
    renderPage(app)
  })
}
