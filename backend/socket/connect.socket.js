import { Server } from 'socket.io'
import { logger as log } from '../app/helpers/logger.helpers.js'

export const initSocket = (server) => {
  const io = new Server(server, {
    cors: {
      origin: [process.env.FRONTEND_URL],
      methods: ['GET', 'POST', 'PUT', 'DELETE'],
      credentials: true,
    },
  })

  io.on('connection', (socket) => {
    log.info(`New client connected: ${socket.id}`)

    socket.on('message', (data) => {
      log.info(`Message received: ${data}`)
      io.emit('message', data)
    })

    socket.on('disconnect', () => {
      log.info(`Client disconnected: ${socket.id}`)
    })
  })

  return io
}
