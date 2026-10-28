export default async function handler(request, response) {

  // 1. Verificar que sea una petición POST
  if (request.method !== 'POST') {
    response.setHeader('Allow', 'POST')

    return response.status(405).json({
      error: 'Método no permitido'
    })
  }

  // 2. Obtener los datos enviados
  const { message, personaje, historial } = request.body ?? {}

  // 3. Validar el mensaje
  if (
    typeof message !== 'string' ||
    !message.trim() ||
    message.length > 2000
  ) {
    return response.status(400).json({
      error: 'Mensaje inválido'
    })
  }

  // 4. Validar el historial de conversación
  const historialValido =
    Array.isArray(historial) &&
    historial.length > 0 &&
    historial.every((turno) =>
      (turno?.role === 'user' || turno?.role === 'model') &&
      Array.isArray(turno.parts) &&
      turno.parts.length > 0 &&
      turno.parts.every(
        (parte) =>
          typeof parte?.text === 'string' &&
          parte.text.trim() !== ''
      )
    ) &&
    historial.at(-1)?.role === 'user' &&
    historial.at(-1)?.parts?.at(-1)?.text === message

  if (!historialValido) {
    return response.status(400).json({
      error: 'Historial de conversación inválido'
    })
  }

  // 5. Obtener la API key del servidor
  const apiKey = process.env.GEMINI_API_KEY

  if (!apiKey) {
    return response.status(503).json({
      error: 'Servicio de IA no configurado'
    })
  }


  const personajes = {
  bilardo: `
  Sos una simulación ficticia y humorística de Carlos Bilardo.

  Hablás en español argentino, como un entrenador
  exigente y obsesionado con ganar.

  REGLA PRINCIPAL:
  Todas tus respuestas deben incluir alguna referencia
  a una cábala, superstición o ritual de buena suerte.

  Respondé primero la pregunta del usuario y después
  relacioná la situación con una cábala divertida.

  Usá expresiones como "escuchame", "muchacho",
  "¿entendés?" y "no me cambiés nada".

  Variá constantemente las cábalas.
  Mantené un tono serio incluso al hacer humor.
  Respondé generalmente entre 2 y 4 oraciones.

  No afirmes ser el Bilardo real ni presentes
  historias inventadas como hechos históricos.
  `,

  zlatan: `Sos una simulación ficticia y humorística de Zlatan Ibrahimović.

Tenés una personalidad extremadamente confiada,
competitiva, provocadora y divertida.

REGLA PRINCIPAL:
Respondé con un ego exagerado y mucho humor.
Hablá ocasionalmente de vos mismo en tercera persona
utilizando el nombre "Zlatan".

Compará situaciones cotidianas con grandes hazañas
futbolísticas, usando ironía y comentarios ingeniosos.

Mantené un estilo directo, desafiante y carismático.
Evitá repetir siempre las mismas frases.
Respondé en español, generalmente en 2 a 4 oraciones.

No afirmes ser el Zlatan real ni inventes
declaraciones históricas`,

  maradona: `Sos una simulación ficticia de Diego Maradona.
    Respondé con entusiasmo, pasión y un estilo expresivo.
    Usá español argentino y transmití tu amor por el fútbol.
    Utilizá cada 3 palabras la muletillas  "eh...",.
    Incorporá frases y expresiones características de Maradona
    cuando tengan sentido dentro de la conversación.
    No fuerces las frases si no encajan con la pregunta.
    No afirmes ser el Maradona real.`
}

const personalidad = personajes[personaje] || personajes.bilardo

  

 const url = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-3.5-flash-lite:generateContent'
 try {
  
    const geminiResponse = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-goog-api-key': apiKey
      },
      body: JSON.stringify({
  systemInstruction: {
    parts: [{ text: personalidad }]
  },
  contents: historial,
    })
})

const data = await geminiResponse.json()

    if (!geminiResponse.ok) {
      return response.status(502).json({
        error: 'No se pudo obtener una respuesta de Gemini'
      })
    }

    const reply = data.candidates?.[0]?.content?.parts?.[0]?.text

    if (!reply) {
      return response.status(502).json({
        error: 'Gemini no generó una respuesta'
      })
    }

    return response.status(200).json({
      reply: reply
    })

  } catch (error) {
    console.error('ERROR AL CONSULTAR GEMINI:', error)

    return response.status(500).json({
      error: 'Error al conectar con Gemini'
    })
  }
}