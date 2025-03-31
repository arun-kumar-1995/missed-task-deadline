export const socketManager = (io, socket) => {
  // Listen for a custom event from the client
  socket.on('eventName', (data) => {
    // broadcast event to all
    io.emit('receiveMessage', data)
  })

  //  Emit an event when a user connects
  socket.emit('welcome', { message: 'Welcome to the socket server!' })
}
