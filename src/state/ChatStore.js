
const STORAGE_KEY = 'conversaciones'

const peticionesPendientes = new Set()

export function obtenerPeticionesPendientes() {
  return peticionesPendientes
}

// Recupera las conversaciones guardadas
export function obtenerConversaciones() {
  try {
    const guardadas = JSON.parse(
      localStorage.getItem(STORAGE_KEY) || '[]'
    )

    return Array.isArray(guardadas) ? guardadas : []
  } catch (error) {
    console.error('Error al recuperar conversaciones:', error)
    return []
  }
}

// Guarda las conversaciones
export function guardarConversaciones(conversaciones) {
  try {
    const conversacionesGuardadas = obtenerConversaciones()

    const conversacionesActualizadas = [
      ...conversacionesGuardadas
    ]

    conversaciones.forEach((conversacion) => {
      const indice = conversacionesActualizadas.findIndex(
        (guardada) => guardada.id === conversacion.id
      )

      
      if (indice !== -1) {
      conversacionesActualizadas.splice(indice, 1)
      }

      conversacionesActualizadas.push(conversacion)

      })

    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(conversacionesActualizadas)
    )

    return true
  } catch (error) {
    console.error('Error al guardar conversaciones:', error)
    return false
  }
}


// Crea una conversación nueva para el personaje seleccionado
export function crearConversacion(personaje) {
  return {
    id: crypto.randomUUID(),
    personaje,
    mensajes: []
  }
}