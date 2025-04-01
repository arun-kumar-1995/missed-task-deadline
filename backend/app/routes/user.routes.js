import express from 'express'
import {
  getUserProfile,
  fetchNotifications,
  markNotificationAsRead,
} from '../controllers/user.controllers.js'
const router = express.Router()

import { isAuthenticated } from '../middlewares/auth.middleware.js'

router.route('/profile').get(isAuthenticated, getUserProfile)

// Fetch Notifications
router.route('/notifications').get(isAuthenticated, fetchNotifications)

// Mark Notifications as Read
router
  .route('/notifications/mark-read')
  .post(isAuthenticated, markNotificationAsRead)

export default router
