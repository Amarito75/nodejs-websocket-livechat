import { randomUUID } from 'crypto'

/**
 * @typedef {Object} Message
 * @property {string} id - an uuid
 * @property {string} pseudo - sender pseudo
 * @property {string} body - body of the message
 */

/** @type { Message[] } */
const messages = []

/**
 * @param {string} pseudo
 * @param {string} body
 */


function handleNewMessage(pseudo, body) {
  const message = {
    id: randomUUID(),
    pseudo,
    body,
    date : new Date().toLocaleDateString()
  }
  messages.push(message)
  return message
}

/**
 * @type { import('fastify').FastifyPluginCallback }
 */
export async function chatRoutes(app) {
  /**
   * @param {{ type: string, payload: object }} data
   */
  function broadcast(data) {
    app.websocketServer.clients.forEach((client) => {
      client.send(JSON.stringify(data))
    })
  }

  // Chat limits
  app.get('/', { websocket: true }, (connection, reply) => {
    connection.socket.on('message', (message) => {
      const data = JSON.parse(message.toString('utf-8'))
      // Fix a length limit 
      if(data.pseudo.length > 20) {
        connection.socket.send(JSON.stringify({
          type: 'ERROR_PSEUDO',
          payload: { error: "pseudo too long"},
        }));
        return
      }
      if(data.body.length > 144) {
      connection.socket.send(JSON.stringify({
        type: 'ERROR_MESSAGE',
        payload: { error: "message must be 144 characters"},
        }));
        return
      }    
      broadcast({
        type: 'NEW_MESSAGE',
        payload: handleNewMessage(data.pseudo, data.body),
      })
    })
  })

    // HISTORY
    app.get('/history', (request, reply) => {
    console.log(messages)
      reply.send(messages)
    })

}
