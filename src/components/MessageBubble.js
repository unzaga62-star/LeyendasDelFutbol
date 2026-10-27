
export function createMessageBubble(text, role) {
  const message = document.createElement('p')

  message.textContent = text

  const className = role === 'user'
    ? 'message-user'
    : 'message-character'

  message.classList.add(className)

  return message
}
