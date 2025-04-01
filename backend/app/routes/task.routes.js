import express from 'express'
import {
  createTask,
  deleteTask,
  updateTask,
  getAllTasks,
  resetTasks,
} from '../controllers/task.controllers.js'
import { isAuthenticated } from '../middlewares/auth.middleware.js'

const router = express.Router()

router.route('/create').post(isAuthenticated, createTask)
router.route('/update-task/:taskId').put(isAuthenticated, updateTask)
router.route('/delete-task/:taskId').delete(isAuthenticated, deleteTask)
router.route('/get-tasks').get(isAuthenticated, getAllTasks)
router.route('/reset-unread').post(isAuthenticated, resetTasks)

export default router
