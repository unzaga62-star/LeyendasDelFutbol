
import { enviarMensaje } from '../services/ChatApi.js'
import { renderChatForm } from '../components/Chatform.js'  
import { createMessageBubble } from '../components/MessageBubble.js'
import {
  obtenerConversaciones,
  guardarConversaciones as guardarEnStorage,
  crearConversacion,
  obtenerPeticionesPendientes
} from '../state/ChatStore.js'

const NOMBRES = {
  bilardo: 'Carlos Bilardo',
  zlatan: 'Zlatan Ibrahimović',
  maradona: 'Diego Maradona'
}

function obtenerPersonaje() {
  const params = new URLSearchParams(window.location.search)
  const personaje = params.get('personaje') || 'bilardo'

  return NOMBRES[personaje] ? personaje : 'bilardo'
}

export function renderChat() {
  const personaje = obtenerPersonaje()
  const nombrePersonaje = NOMBRES[personaje]

  return `
    <section class="chat-container">

      <header class="chat-header">
        <button type="button" id="menu-button" aria-label="Abrir menú">
          ☰
        </button>

        <nav class="chat-nav" aria-label="Navegación principal">
        <a href="/" data-link>
        Inicio
        </a>

      <a href="/about" data-link>
      Sobre nosotros
      </a>
      </nav>

        <div class="character-selector">

  <button
    type="button"
    id="character-button"
    aria-expanded="false"
    aria-controls="character-menu"
  >
    <span>⚽</span>
    <span>${nombrePersonaje}</span>
    <span>⌄</span>
  </button>

  <div id="character-menu" class="character-menu" hidden>

    <a href="/chat?personaje=bilardo" data-link>
        Carlos Bilardo
    </a>

    <a href="/chat?personaje=zlatan" data-link>
        Zlatan Ibrahimović

    </a>

    <a href="/chat?personaje=maradona" data-link>
      Diego Maradona
    </a>

  </div>

</div>

</header>

      <div id="sidebar-overlay" class="overlay-hidden"></div>

      <nav id="chat-sidebar" class="sidebar-hidden">

        <div class="sidebar-header">
          <h2>Mis conversaciones</h2>

          <button type="button" id="close-sidebar" aria-label="Cerrar menú">
            ✕
          </button>
        </div>

        <button type="button" id="new-chat">
          + Nueva conversación
        </button>

        <div class="sidebar-links">

        <div id="chat-history">
          <p>Todavía no tenés conversaciones guardadas.</p>
        </div>

      </nav>

      <p>Conversá con tu leyenda del fútbol.</p>

      <div id="chat-messages" aria-live="polite">
        <p class="message-character">
          ¡Hola! ¿De qué querés hablar hoy?
        </p>
      </div>
       
      ${renderChatForm()}

    </section>
  `
}

export function setupChat() {
  // 1. Elementos del DOM

  const controller = new AbortController()
  const { signal } = controller
  const form = document.querySelector('#chat-form')
  const botonEnviar = form.querySelector('button')
  const input = document.querySelector('#message-input')
  const messagesContainer = document.querySelector('#chat-messages')

  const botonMenu = document.querySelector('#menu-button')
  const botonCerrarMenu = document.querySelector('#close-sidebar')
  const sidebar = document.querySelector('#chat-sidebar')
  const overlay = document.querySelector('#sidebar-overlay')
  const botonNuevoChat = document.querySelector('#new-chat')
  const contenedorHistorial = document.querySelector('#chat-history')
  const botonPersonaje = document.querySelector('#character-button')
  const menuPersonajes = document.querySelector('#character-menu')

  // 2. Personaje seleccionado

  const personaje = obtenerPersonaje()
  const nombrePersonaje = NOMBRES[personaje]

  // 3. Conversaciones guardadas

  let conversaciones = obtenerConversaciones()

  // 4. Conversación activa

 let conversacionActual = crearConversacion(personaje)

  const peticionesPendientes = obtenerPeticionesPendientes()

  // 5. Guardar conversaciones

  // 6. Mostrar un mensaje en pantalla

 function addMessage(text, role) {
  const message = createMessageBubble(text, role)

  messagesContainer.appendChild(message)
  messagesContainer.scrollTop = messagesContainer.scrollHeight
}

  // 7. Cargar mensajes de una conversación

  
function cargarMensajes(conversacion) {
  messagesContainer.innerHTML = ''

  conversacion.mensajes.forEach((mensaje) => {
    const texto = mensaje.parts?.[0]?.text || ''

    addMessage(texto, mensaje.role)
  })
}


  // 8. Mostrar historial en el menú

  function mostrarConversaciones() {
    conversaciones = obtenerConversaciones()

    contenedorHistorial.innerHTML = ''

    if (conversaciones.length === 0) {
      const aviso = document.createElement('p')
      aviso.textContent = 'Todavía no tenés conversaciones guardadas.'
      contenedorHistorial.appendChild(aviso)
      return
    }

    [...conversaciones].reverse().forEach((conversacion) => {
      const boton = document.createElement('button')
      boton.type = 'button'
      boton.classList.add('history-item')

      const nombre = NOMBRES[conversacion.personaje] || 'Jugador'

      const primerMensaje =
        conversacion.mensajes?.[0]?.parts?.[0]?.text ||
        'Nueva conversación'

      boton.textContent = `${nombre} — ${primerMensaje}`

      boton.addEventListener('click', () => {
        // Si el chat pertenece a otro personaje,
        // guardamos su ID para recuperarlo después de navegar.
        if (conversacion.personaje !== personaje) {
          sessionStorage.setItem(
            'conversacion-pendiente',
            conversacion.id
          )

          window.history.pushState(
            {},
            '',
            `/chat?personaje=${conversacion.personaje}`
          )

          window.dispatchEvent(new PopStateEvent('popstate'))
          return
        }

        seleccionarConversacion(conversacion)
      })

      contenedorHistorial.appendChild(boton)
    })
  }

  // 9. Seleccionar una conversación existente

function seleccionarConversacion(conversacion) {
  // Buscar la versión más reciente en localStorage
  const conversacionesActualizadas = obtenerConversaciones()

  const conversacionActualizada = conversacionesActualizadas.find(
    (guardada) => guardada.id === conversacion.id
  )

  // Utilizar la versión más reciente disponible
  conversacionActual = conversacionActualizada || conversacion

  cargarMensajes(conversacionActual)


    if (peticionesPendientes.has(conversacion.id)) {
  mostrarEscribiendo()
  }

  actualizarEstadoFormulario()

    cerrarMenu()
  }

  // 10. Abrir y cerrar menú

  function abrirMenu() {
    sidebar.classList.remove('sidebar-hidden')
    overlay.classList.remove('overlay-hidden')
  }

  function cerrarMenu() {
    sidebar.classList.add('sidebar-hidden')
    overlay.classList.add('overlay-hidden')
  }

  botonMenu.addEventListener('click', abrirMenu)
  botonCerrarMenu.addEventListener('click', cerrarMenu)
  overlay.addEventListener('click', cerrarMenu)

  // Abrir y cerrar el selector de personajes
botonPersonaje.addEventListener('click', () => {
  menuPersonajes.hidden = !menuPersonajes.hidden

  botonPersonaje.setAttribute(
    'aria-expanded',
    String(!menuPersonajes.hidden)
  )
}, { signal })

// Cerrar al hacer clic fuera del selector
document.addEventListener('click', (event) => {
  if (!event.target.closest('.character-selector')) {
    menuPersonajes.hidden = true
    botonPersonaje.setAttribute('aria-expanded', 'false')
  }
}, { signal })

// Cerrar con la tecla Escape
document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') {
    menuPersonajes.hidden = true
    botonPersonaje.setAttribute('aria-expanded', 'false')
  }
}, { signal })

  // 11. Crear una conversación nueva

botonNuevoChat.addEventListener('click', () => {
  conversacionActual = crearConversacion(personaje)

  messagesContainer.innerHTML = ''

  addMessage(
    '¡Hola! ¿De qué querés hablar hoy?',
    'model'
  )

  // Restablecer el formulario de la nueva conversación
  actualizarEstadoFormulario()
  input.value = ''

  cerrarMenu()
  input.focus()
})

  // 12. Indicador de escritura

  function mostrarEscribiendo() {

  const indicador = document.createElement('p')

  indicador.classList.add('message-character', 'typing-indicator')
  indicador.textContent = `${nombrePersonaje} está escribiendo...`

  messagesContainer.appendChild(indicador)
  messagesContainer.scrollTop = messagesContainer.scrollHeight

  return indicador
}

function actualizarEstadoFormulario() {
  const estaRespondiendo = peticionesPendientes.has(
    conversacionActual.id
  )

  botonEnviar.disabled = estaRespondiendo
  botonEnviar.textContent = estaRespondiendo
    ? 'Respondiendo...'
    : 'Enviar'

  input.disabled = estaRespondiendo
}

  // 13. Recuperar una conversación seleccionada
  // antes de navegar desde otro personaje

  const idPendiente = sessionStorage.getItem('conversacion-pendiente')

  if (idPendiente) {
    sessionStorage.removeItem('conversacion-pendiente')

    const conversacionPendiente = conversaciones.find(
      (conversacion) =>
        conversacion.id === idPendiente &&
        conversacion.personaje === personaje
    )

    if (conversacionPendiente) {
      seleccionarConversacion(conversacionPendiente)
    }
  }

  mostrarConversaciones()
// Escuchar cuando una conversación recibe nuevos mensajes
window.addEventListener('conversacion-actualizada', (event) => {
  if (!messagesContainer.isConnected) {
    return
  }

  mostrarConversaciones()

  if (conversacionActual.id !== event.detail.id) {
    return
  }

  const conversacionesActualizadas = obtenerConversaciones()

  const conversacionActualizada = conversacionesActualizadas.find(
    (conversacion) => conversacion.id === event.detail.id
  )

  if (!conversacionActualizada) {
    return
  }

  conversacionActual = conversacionActualizada

  cargarMensajes(conversacionActual)
  actualizarEstadoFormulario()

}, { signal })


// Escuchar cuando Gemini termina una petición
window.addEventListener('peticion-finalizada', (event) => {
  if (!messagesContainer.isConnected) {
    return
  }

  if (conversacionActual.id !== event.detail.id) {
    return
  }

  messagesContainer
    .querySelectorAll('.typing-indicator')
    .forEach((indicador) => indicador.remove())

  actualizarEstadoFormulario()

}, { signal })

  // 14. Enviar mensajes

  form.addEventListener('submit', async (event) => {
    event.preventDefault()

    const message = input.value.trim()

    if (message === '') {
      return
    }

   const conversacionDeLaPeticion = conversacionActual

if (peticionesPendientes.has(conversacionDeLaPeticion.id)) {
  return
}

    peticionesPendientes.add(conversacionDeLaPeticion.id)

    // Registrar conversación al enviar el primer mensaje

   const mensajeUsuario = {
  role: 'user',
  parts: [{ text: message }]
}

conversacionDeLaPeticion.mensajes.push(mensajeUsuario)

const historialDeLaPeticion = conversacionDeLaPeticion.mensajes.map(
  (mensaje) => ({
    role: mensaje.role,
    parts: mensaje.parts.map((parte) => ({
      text: parte.text
    }))
  })
)

guardarEnStorage([conversacionDeLaPeticion])
mostrarConversaciones()

    input.value = ''
    addMessage(message, 'user')

    actualizarEstadoFormulario()

    const indicadorDeLaPeticion = mostrarEscribiendo()


    try {
      // La petición HTTP se realiza en ChatApi.js

      const data = await enviarMensaje(
        message,
        personaje,
        historialDeLaPeticion,
      )

      // Eliminar indicador antes de mostrar la respuesta

      if (conversacionActual.id === conversacionDeLaPeticion.id) {
    messagesContainer
    .querySelectorAll('.typing-indicator')
    .forEach((indicador) => indicador.remove())

  addMessage(data.reply, 'model')
}

      const mensajeGemini = {
        role: 'model',
        parts: [{ text: data.reply }]
      }

      const conversacionesGuardadas = obtenerConversaciones()

      const conversacionGuardada = conversacionesGuardadas.find(
      (conversacion) => conversacion.id === conversacionDeLaPeticion.id
      )

      const conversacionParaGuardar =
      conversacionGuardada || conversacionDeLaPeticion

      conversacionParaGuardar.mensajes.push(mensajeGemini)

      guardarEnStorage([conversacionParaGuardar])
      mostrarConversaciones()

      if (conversacionActual.id === conversacionParaGuardar.id) {
    conversacionActual = conversacionParaGuardar
    }

    window.dispatchEvent(
  new CustomEvent('conversacion-actualizada', {
    detail: {
      id: conversacionParaGuardar.id
    }
  })
)

    } catch (error) {
      console.error('Error al enviar el mensaje:', error)

      if (
        messagesContainer.isConnected &&
        conversacionActual.id === conversacionDeLaPeticion.id
      ) {
        addMessage(
        'No se pudo obtener una respuesta. Intentá nuevamente.',
        'model'
        )
      }

    } finally {
        indicadorDeLaPeticion.remove()

        peticionesPendientes.delete(conversacionDeLaPeticion.id)

        window.dispatchEvent(
          new CustomEvent('peticion-finalizada', {
          detail: {
           id: conversacionDeLaPeticion.id
           }
          })
        )

      if (
        messagesContainer.isConnected &&
        conversacionActual.id === conversacionDeLaPeticion.id
      ) {
        messagesContainer
        .querySelectorAll('.typing-indicator')
        .forEach((indicador) => indicador.remove())

        actualizarEstadoFormulario()
        input.focus()
        }
    }
  })

   return () => {
    controller.abort()
  }
}

