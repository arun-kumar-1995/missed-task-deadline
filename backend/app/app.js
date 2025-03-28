'use strict'

// * GLOBAL Imports

import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import compression from 'compression'
import cookieParser from 'cookie-parser'
import session from "express-session";
import appRoute from './routes/index.js'
import { errorMiddleware } from './middlewares/error.middleware.js'
import { configSession } from '../configs/session.configs.js'

// * Define app
const app = express()

// * Security, Compression & Parser

app.use(helmet())
app.use(compression())
app.use(express.json())
app.use(cookieParser())
app.use(express.urlencoded({ extended: true }))
app.set('trust proxy', true)

// *  Implement session storage for redis
app.use(session(configSession))

// * Use CORS middleware
app.use(
  cors({
    origin: [process.env.FRONTEND_URL],
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
    credentials: true,
    allowedHeaders: ['Content-Type', 'Authorization'],
  })
)

// * Route
app.use('/app', appRoute)

// * error middleware
app.use(errorMiddleware)

export default app
