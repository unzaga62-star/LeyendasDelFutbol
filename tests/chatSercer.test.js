
import {
  describe,
  it,
  expect,
  vi,
  beforeEach,
  afterEach
} from 'vitest'

import handler from '../api/chat.js'

const historial = [
  { role: 'user', parts: [{ text: 'Hola' }] }
]

// Simula una petición válida
function crearRequest() {
  return {
    method: 'POST',
    body: {
      message: 'Hola',
      personaje: 'bilardo',
      historial
    }
  }
}

// Simula la respuesta de Vercel
function crearResponse() {
  const response = {
    status: vi.fn(),
    json: vi.fn(),
    setHeader: vi.fn()
  }

  response.status.mockReturnValue(response)
  response.json.mockReturnValue(response)

  return response
}

beforeEach(() => {
  vi.stubEnv('GEMINI_API_KEY', 'clave-de-prueba')

  // Evita llamadas reales a internet
  vi.stubGlobal('fetch', vi.fn().mockResolvedValue({
    ok: false,
    status: 400,
    json: async () => ({ error: 'Error simulado' })
  }))
})

afterEach(() => {
  vi.unstubAllGlobals()
  vi.unstubAllEnvs()
})

describe('Backend de Gemini', () => {

  // TEST 4: Método incorrecto
  it('rechaza peticiones que no sean POST', async () => {
    const request = { method: 'GET' }
    const response = crearResponse()

    await handler(request, response)

    expect(response.status).toHaveBeenCalledWith(405)
    expect(fetch).not.toHaveBeenCalled()
  })

  // TEST 5: Mensaje vacío
  it('rechaza mensajes vacíos', async () => {
    const request = crearRequest()
    const response = crearResponse()

    request.body.message = ''

    await handler(request, response)

    expect(response.status).toHaveBeenCalledWith(400)
    expect(fetch).not.toHaveBeenCalled()
  })

  // TEST 6: Respuesta de Gemini
  it('envía el historial y devuelve la respuesta de Gemini', async () => {
    const mockFetch = vi.fn().mockResolvedValue({
      ok: true,
      status: 200,
      json: async () => ({
        candidates: [{
          content: {
            parts: [{ text: 'Hola, soy una simulación de Messi.' }]
          }
        }]
      })
    })

    vi.stubGlobal('fetch', mockFetch)

    const response = crearResponse()

    await handler(crearRequest(), response)

    expect(response.status).toHaveBeenCalledWith(200)

    expect(response.json).toHaveBeenCalledWith({
      reply: 'Hola, soy una simulación de Messi.'
    })

    const opciones = mockFetch.mock.calls[0][1]
    const contenidoEnviado = JSON.parse(opciones.body)

    expect(contenidoEnviado.contents).toEqual(historial)

    expect(
      contenidoEnviado.systemInstruction.parts[0].text
    ).toContain('Carlos Bilardo')
  })

  // TEST 7: Error de Gemini
  it('maneja errores de la API de Gemini', async () => {
    const response = crearResponse()

    await handler(crearRequest(), response)

    expect(response.status).toHaveBeenCalledWith(502)
  })

})
