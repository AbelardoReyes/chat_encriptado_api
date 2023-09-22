import Ws from 'App/Services/Ws'
import MessagesController from 'App/Controllers/Http/MessagesController'
Ws.boot()

/**
 * Listen for incoming socket connections
 */
Ws.io.on('connection', (socket) => {
  socket.on('message', (data) => {
    console.log("Mensaje recibido", data)
    Ws.io.emit('message', data)
  })
  socket.on('getAllMessages', async (data) => {
    console.log("Mensaje recibido", data)
  });
})
