
export function renderHome() {
  return `
    <header class="home-header">
      <a href="/" class="home-logo" data-link>
        ⚽ Fútbol Legends <span>AI</span>
      </a>

      <nav>
        <a href="/about" data-link>
          Sobre el proyecto
        </a>
      </nav>
    </header>

    <main class="home-main">
      <section class="home-hero">

        <div class="home-eyebrow">
          <span class="home-live-dot"></span>
          EL FÚTBOL SE ENCUENTRA CON LA IA
        </div>

        <h1>
          Las leyendas nunca
          <span>dejan de hablar.</span>
        </h1>

        <p class="home-description">
          Entrá al vestuario de las grandes figuras
          del fútbol. Elegí una leyenda y conversá
          con su versión creada mediante inteligencia
          artificial.
        </p>

        <button
          id="iniciar-chat"
          type="button"
          aria-expanded="false"
          aria-controls="personajes"
        >
          Elegir mi leyenda ⚽
        </button>

        <div id="personajes" class="personajes" hidden>

          <a
            href="/chat?personaje=bilardo"
            class="legend-card"
            data-link
          >
            <span class="legend-number">01 / DT</span>
            <span class="legend-icon">🧠</span>
            <span class="legend-name">Carlos Bilardo</span>
            <span class="legend-description">
              Estrategia, obsesión por ganar
              y alguna que otra cábala.
            </span>
            <span class="legend-action">
              Entrar al chat ↗
            </span>
          </a>

          <a
            href="/chat?personaje=zlatan"
            class="legend-card"
            data-link
          >
            <span class="legend-number">02 / DELANTERO</span>
            <span class="legend-icon">🦁</span>
            <span class="legend-name">Zlatan Ibrahimović</span>
            <span class="legend-description">
              Personalidad, confianza
              y un ego a la altura de su talento.
            </span>
            <span class="legend-action">
              Entrar al chat ↗
            </span>
          </a>

          <a
            href="/chat?personaje=maradona"
            class="legend-card"
            data-link
          >
            <span class="legend-number">03 / EL DIEZ</span>
            <span class="legend-icon">🔟</span>
            <span class="legend-name">Diego Maradona</span>
            <span class="legend-description">
              Pasión argentina, potrero
              y fútbol en estado puro.
            </span>
            <span class="legend-action">
              Entrar al chat ↗
            </span>
          </a>

        </div>

        <p class="home-footer-note">
          PROYECTO INTEGRADOR · HENRY · MÓDULO 3
        </p>

      </section>
    </main>
  `
}

export function initHome() {
  const botonIniciar = document.querySelector('#iniciar-chat')
  const personajes = document.querySelector('#personajes')

  if (!botonIniciar || !personajes) return

  botonIniciar.addEventListener('click', () => {
    personajes.hidden = !personajes.hidden

    botonIniciar.setAttribute(
      'aria-expanded',
      String(!personajes.hidden)
    )
  })
}
