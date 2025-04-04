'use strict'

import './configs/loadEnv.configs.js'
import { logger as log } from './app/helpers/logger.helpers.js'
import { connectDB } from './configs/db.configs.js'
import app from './app/app.js'
import { createServer } from 'http'
import { initSocket } from './socket/connect.socket.js'
import { taskDeadlineScheduler } from './app/services/scheduler.services.js'

const { PORT: port = 8000 } = process.env
// Handle Uncaught Exceptions (Sync Errors)
process.on('uncaughtException', (err) => {
  console.error(`💥 Uncaught Exception: ${err.message}`)
  process.exit(1)
})

// Handle Unhandled Promise Rejections (Async Errors)
process.on('unhandledRejection', (reason, promise) => {
  console.error(`⚠️ Unhandled Rejection at:`, promise, 'reason:', reason)
  process.exit(1)
})

const startServer = async () => {
  console.log('===  Server Startup Initiated... ===')
  try {
    // connect to db
    await connectDB()
    // Create HTTP server
    const server = createServer(app)

    // Initialize Socket.io
    const io = initSocket(server)

    server.listen(port, (err) => {
      if (err) {
        log.error(`Error ${err.message}`)
        process.exit(1)
      }
      log.warn(`[Server started]:\n http://localhost:${port}`)
    })
    taskDeadlineScheduler(io)
  } catch (err) {
    log.error('Failed to start server', err.message)
    process.exit(1)
  }
}

startServer()
