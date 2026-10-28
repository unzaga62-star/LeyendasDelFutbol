
export function renderChatForm() {
  return `
    <form id="chat-form">
      <input
        type="text"
        id="message-input"
        placeholder="Escribí tu mensaje..."
        autocomplete="off"
        aria-label="Escribir mensaje"
        maxlength="2000"
        required
      >

      <button type="submit">
        Enviar
      </button>
    </form>
  `
}
