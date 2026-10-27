export function renderAbout() {
  return `
    <header class="home-header">

      <a href="/" class="home-logo" data-link>
        ⚽ Fútbol Legends AI
      </a>

      <nav>
        <a href="/" data-link>
          ← Volver al inicio
        </a>
      </nav>

    </header>

    <main class="about-project">

      <h1>Sobre el proyecto</h1>

      <p>
        Fútbol Legends AI fue desarrollado como parte del
        Proyecto Integrador del Módulo 3 de la formación
        de Desarrollo Full Stack + IA de Henry.
      </p>

      <p>
        Su objetivo es aplicar conocimientos de JavaScript,
        diseño responsive, aplicaciones SPA e integración
        de inteligencia artificial mediante Gemini.
      </p>

      <p>
        Los personajes son simulaciones generadas mediante
        inteligencia artificial y no representan conversaciones
        reales con las figuras del fútbol.
      </p>

    </main>
  `
}