import { Server } from 'socket.io'
import { logger as log } from '../app/helpers/logger.helpers.js'
import { socketManager } from './socketManager.socket.js'
export const initSocket = (server) => {
  const io = new Server(server, {
    cors: {
      origin: [process.env.FRONTEND_URL],
      methods: ['GET', 'POST', 'PUT', 'DELETE'],
      credentials: true,
    },
  })

  io.on('connection', (socket) => {
    log.info(`Client connected: ${socket.id}`)

    // call socket mager ti handle socket connection at one place
    socketManager(io, socket);

    // socket.on('message', (data) => {
    //   log.info(`Message received: ${data}`)
    //   io.emit('message', data)
    // })

    socket.on('disconnect', () => {
      log.info(`Client disconnected: ${socket.id}`)
    })
  })

  // attach io to global instance
  global._io = io;

  return io
}
