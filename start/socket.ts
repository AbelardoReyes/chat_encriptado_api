import Ws from 'App/Services/Ws'
import MessagesController from 'App/Controllers/Http/MessagesController'
Ws.boot()

/**
 * Listen for incoming socket connections
 */
Ws.io.on('connection', (socket) => {
  socket.on('sendMessage', async (data) => {
    console.log("Mensaje recibido", data)
    const messagesController = new MessagesController()
    await messagesController.store({ request: { all: () => data } })
    Ws.io.emit('message', data)
  });
  socket.on('message', (data) => {
    console.log("Mensaje recibido", data)
    Ws.io.emit('message', data)
  })

  socket.on('getAllMessages', async (data) => {
    console.log("Mensaje recibido", data)
    const messagesController = new MessagesController()
    const messages = await messagesController.index()
    Ws.io.emit('allMessages', messages)
  });
  socket.on('allMessages', (data) => {
    console.log("Mensaje recibido", data)
    Ws.io.emit('allMessages', data)
  });
})
