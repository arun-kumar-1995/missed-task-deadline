import express from 'express'
import authRoute from './auth.routes.js'
import userRoute from './user.routes.js'
import taskRoute from './task.routes.js'
const router = express.Router()

router.use('/auth', authRoute)
router.use('/user', userRoute)
router.use('/task', taskRoute)

export default router
