
import { describe, it, expect, vi, afterEach } from 'vitest'
import { enviarMensaje } from '../src/services/ChatApi.js'

const historial = [
  { role: 'user', parts: [{ text: 'Hola' }] }
]

afterEach(() => {
  vi.unstubAllGlobals()
})

describe('ChatApi', () => {

  // TEST 1: Envío correcto
  it('envía el mensaje al backend correctamente', async () => {
    const mockFetch = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => ({ reply: 'Hola, ¿cómo andás?' })
    })

    vi.stubGlobal('fetch', mockFetch)

    const resultado = await enviarMensaje(
      'Hola',
      'bilardo',
      historial
    )

    expect(resultado.reply).toBe('Hola, ¿cómo andás?')

    expect(mockFetch).toHaveBeenCalledWith(
      '/api/chat',
      expect.objectContaining({
        method: 'POST',
        body: JSON.stringify({
          message: 'Hola',
          personaje: 'bilardo',
          historial
        })
      })
    )
  })

  // TEST 2: Error HTTP
  it('maneja errores devueltos por el servidor', async () => {
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue({
      ok: false,
      json: async () => ({ error: 'Servicio no disponible' })
    }))

    await expect(
      enviarMensaje('Hola', 'bilardo', historial)
    ).rejects.toThrow('Servicio no disponible')
  })

  // TEST 3: Respuesta sin contenido
  it('rechaza una respuesta sin texto', async () => {
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue({
      ok: true,
      json: async () => ({ reply: '' })
    }))

    await expect(
      enviarMensaje('Hola', 'bilardo', historial)
    ).rejects.toThrow()
  })

})
