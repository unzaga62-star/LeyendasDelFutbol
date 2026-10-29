
export function renderChatForm() {
  return `
    <form id="chat-form">
      <textarea
        id="message-input"
        placeholder="Escribí tu mensaje..."
        aria-label="Escribir mensaje"
        rows="1"
        maxlength="2000"
        required
      ></textarea>

      <button type="submit">
        Enviar
      </button>
    </form>
  `
}

