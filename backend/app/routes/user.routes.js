import express from 'express'
import { getAllTasks } from '../controllers/user.controllers.js'
const router = express.Router()

router.route('/get-tasks').post(getAllTasks)

export default router
