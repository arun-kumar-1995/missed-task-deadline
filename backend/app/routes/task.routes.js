import express from 'express'
import {
  createTask,
  deleteTask,
  updateTask,
  getAllTasks,
} from '../controllers/task.controllers.js'
import { isAuthenticated } from '../middlewares/auth.middleware.js'

const router = express.Router()

router.route('/create').post(isAuthenticated, createTask)
router.route('/update-task/:id').put(isAuthenticated, updateTask)
router.route('/delete-task/:id').delete(isAuthenticated, deleteTask)
router.route('/get-tasks').get(isAuthenticated, getAllTasks)
export default router
