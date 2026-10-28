
import {
  describe,
  it,
  expect,
  vi,
  beforeEach,
  afterEach
} from 'vitest'

import {
  obtenerConversaciones,
  guardarConversaciones
} from '../src/state/ChatStore.js'

describe('ChatStore - Historial', () => {
  let almacenamiento

  beforeEach(() => {
    almacenamiento = new Map()

    // Simulamos el localStorage del navegador
    vi.stubGlobal('localStorage', {
      getItem: vi.fn((clave) =>
        almacenamiento.get(clave) ?? null
      ),

      setItem: vi.fn((clave, valor) => {
        almacenamiento.set(clave, valor)
      })
    })
  })

  afterEach(() => {
    vi.unstubAllGlobals()
  })

  // TEST 8
  it('guarda correctamente una conversación nueva', () => {
    const conversacion = {
      id: '1',
      personaje: 'bilardo',
      mensajes: []
    }

    const resultado = guardarConversaciones([
      conversacion
    ])

    expect(resultado).toBe(true)

    expect(obtenerConversaciones()).toEqual([
      conversacion
    ])
  })

  // TEST 9
  it('actualiza una conversación sin duplicarla y la mueve al final', () => {
    const conversacion1 = {
      id: '1',
      personaje: 'bilardo',
      mensajes: []
    }

    const conversacion2 = {
      id: '2',
      personaje: 'zlatan',
      mensajes: []
    }

    guardarConversaciones([
      conversacion1,
      conversacion2
    ])

    guardarConversaciones([{
      ...conversacion1,
      mensajes: [
        {
          role: 'user',
          parts: [{ text: 'Hola Bilardo' }]
        }
      ]
    }])

    const conversaciones = obtenerConversaciones()

    // Debe haber únicamente dos conversaciones
    expect(conversaciones).toHaveLength(2)

    // La conversación actualizada queda al final
    expect(conversaciones.map((chat) => chat.id))
      .toEqual(['2', '1'])

    // Su nuevo mensaje debe haberse guardado
    expect(conversaciones[1].mensajes)
      .toHaveLength(1)
  })
})
