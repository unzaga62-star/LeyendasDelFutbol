
export function renderAbout() {
  return `
    <header class="home-header">
      <a href="/" class="home-logo" data-link>
        ⚽ Fútbol Legends <span>AI</span>
      </a>

      <nav>
        <a href="/" data-link>
          ← Volver al inicio
        </a>
      </nav>
    </header>

    <main class="about-main">
      <div class="about-content">

        <section class="about-hero">
          <p class="about-kicker">
            <span class="about-dot"></span>
            HENRY · PROYECTO INTEGRADOR · MÓDULO 03
          </p>

          <h1>
            El fútbol se encuentra
            <span>con la tecnología.</span>
          </h1>

          <p class="about-intro">
            <strong>Fútbol Legends AI</strong> es un proyecto
            desarrollado para el Módulo 3 del curso de
            <strong>Desarrollo Full Stack de Henry</strong>.

            Su objetivo es aplicar los conocimientos adquiridos
            en desarrollo frontend, JavaScript, aplicaciones SPA
            e integración de inteligencia artificial.
          </p>
        </section>

        <section class="about-grid">

          <article class="about-card">
            <span class="about-card-number">
              01 / EL PROYECTO
            </span>

            <h2>¿De qué se trata?</h2>

            <p>
              Es una aplicación web que permite conversar
              con simulaciones de tres grandes personalidades
              del fútbol: Carlos Bilardo, Zlatan Ibrahimović
              y Diego Maradona.
            </p>

            <p>
              Cada personaje tiene una personalidad definida
              mediante instrucciones específicas para la IA.
              Esto permite generar conversaciones diferentes
              según la leyenda seleccionada.
            </p>
          </article>

          <article class="about-card">
            <span class="about-card-number">
              02 / FUNCIONALIDADES
            </span>

            <h2>¿Qué puede hacer el usuario?</h2>

            <ul class="about-features">
              <li>Seleccionar una leyenda del fútbol.</li>
              <li>Conversar con inteligencia artificial.</li>
              <li>Crear nuevas conversaciones.</li>
              <li>Consultar conversaciones anteriores.</li>
              <li>Cambiar de personaje sin salir de la app.</li>
              <li>Utilizar la plataforma desde distintos dispositivos.</li>
            </ul>
          </article>

        </section>

        <section class="about-technologies">
          <div class="about-section-heading">
            <span class="about-card-number">
              03 / STACK TECNOLÓGICO
            </span>

            <h2>Tecnologías utilizadas</h2>

            <p>
              Herramientas empleadas para desarrollar,
              probar y publicar la aplicación.
            </p>
          </div>

          <div class="about-tech-grid">

            <article class="about-tech-item">
              <span class="about-tech-number">01</span>
              <div>
                <h3>HTML5 + CSS3</h3>
                <p>Estructura, estilos, responsive y diseño mobile-first.</p>
              </div>
            </article>

            <article class="about-tech-item">
              <span class="about-tech-number">02</span>
              <div>
                <h3>JavaScript</h3>
                <p>Interactividad, eventos, lógica y manejo del DOM.</p>
              </div>
            </article>

            <article class="about-tech-item">
              <span class="about-tech-number">03</span>
              <div>
                <h3>Vite + SPA</h3>
                <p>Entorno de desarrollo y navegación con History API.</p>
              </div>
            </article>

            <article class="about-tech-item">
              <span class="about-tech-number">04</span>
              <div>
                <h3>Google Gemini</h3>
                <p>Generación de respuestas mediante inteligencia artificial.</p>
              </div>
            </article>

            <article class="about-tech-item">
              <span class="about-tech-number">05</span>
              <div>
                <h3>LocalStorage</h3>
                <p>Persistencia del historial de conversaciones en el navegador.</p>
              </div>
            </article>

            <article class="about-tech-item">
              <span class="about-tech-number">06</span>
              <div>
                <h3>Vitest + Vercel</h3>
                <p>Pruebas automatizadas y despliegue con API serverless.</p>
              </div>
            </article>

          </div>
        </section>

        <div class="about-bottom">
          <p>
            Los personajes son simulaciones creadas mediante IA.
            No representan conversaciones ni declaraciones reales.
          </p>

          <a href="/" data-link class="about-cta">
            Volver a la cancha ↗
          </a>
        </div>

      </div>
    </main>
  `
}
