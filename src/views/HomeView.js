export function renderHome() {
  return `
    <header class="home-header">
      <a href="/" class="home-logo" data-link>
        ⚽ Fútbol Legends AI
      </a>

      <nav>
        <a href="/about" data-link>
          Sobre nosotros
        </a>
      </nav>
    </header>

    <main class="home-main">
      <section class="home-hero">
        <h1>Conversá con las leyendas del fútbol</h1>

        <p>
          Elegí a tu ídolo y comenzá una conversación
          con inteligencia artificial.
        </p>

        <button id="iniciar-chat" type="button" aria-expanded="false" aria-controls="personajes">
          Iniciar chat
        </button>

        <div id="personajes" class="personajes" hidden>
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
      </section>
    </main>
  `;
}

export function initHome() {
  const botonIniciar = document.querySelector("#iniciar-chat");
  const personajes = document.querySelector("#personajes");

  if (!botonIniciar || !personajes) return;

  botonIniciar.addEventListener("click", () => {
    personajes.hidden = !personajes.hidden;

    botonIniciar.setAttribute(
      "aria-expanded",
      String(!personajes.hidden)
    );
  });
}