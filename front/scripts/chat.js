import { fetchAPI } from './api'
import { appendMessage } from './dom'

/** @param {MessageEvent} event */
function handleWSMessage(event) {
  const data = JSON.parse(event.data)

  if (data?.type === 'NEW_MESSAGE') {
    appendMessage(data.payload)
  }
}

const ws = new WebSocket('ws://localhost:5000/chat')
ws.onopen = function open() {
  console.log('ws connected')
}
ws.onmessage = handleWSMessage

// GET /HISTORY
async function getHistory() {
  const history = await fetchAPI('/chat/history')
  console.log(history)
  // boucle foreach
  history.forEach((message) => {
    appendMessage(message)
  })
}

export function initChat() {
  getHistory()
  /** @type {HTMLFormElement | null} */
  const messageForm = document.querySelector('#new-message')
  if (!messageForm) throw new Error('missing form')

  messageForm.addEventListener('submit', (event) => {
    event.preventDefault()

    const pseudo = messageForm.pseudo.value
    const body = messageForm.body.value

    if (!pseudo || !body) return
    localStorage.setItem('myPseudo', pseudo)
    ws.send(JSON.stringify({ pseudo, body }))
    messageForm.body.value = null
  })
}

// localStorage

