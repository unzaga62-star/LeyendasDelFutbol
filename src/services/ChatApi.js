
export async function enviarMensaje(message, personaje, historial) {
  const response = await fetch('/api/chat', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      message,
      personaje,
      historial
    })
  })

  const data = await response.json()

  if (!response.ok || !data.reply) {
    throw new Error(data.error || 'No se pudo obtener una respuesta de Gemini')
  }

  return data
}
