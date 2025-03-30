import express from 'express'
import { getUserProfile, getAllTasks } from '../controllers/user.controllers.js'
const router = express.Router()

import { isAuthenticated } from '../middlewares/auth.middleware.js'

router.route('/profile').get(isAuthenticated, getUserProfile)
router.route('/get-tasks').post(isAuthenticated, getAllTasks)

export default router
