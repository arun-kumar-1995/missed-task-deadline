import { redisClient } from '../../configs/redis.configs.js'
import { HttpStatus } from '../constants/httpStatus.constants.js'
import { CatchAsyncError } from '../helpers/catchAsyncError.helpers.js'
import { UserModel } from '../models/user.model.js'
import { Notification } from '../schemas/notification.schema.js'
import { APIResponse } from '../shared/apiResponse.shared.js'

export const getUserProfile = CatchAsyncError(
  async (request, response, next) => {
    const user = await UserModel.findById(request.userId)
    return APIResponse(response, HttpStatus.SUCCESS, 'Here is user profile', {
      user,
      isAuthenticated: true,
    })
  }
)

export const fetchNotifications = CatchAsyncError(
  async (request, response, next) => {
    const userId = request.userId
    // Get all notifications sorted by timestamp
    let notifications = await redisClient.zRange(
      `user:${userId}:notifications`,
      0,
      -1,
      { REV: true }
    )

    // Get read/unread status for each taskId
    const statuses = await redisClient.hGetAll(
      `user:${userId}:notification_status`
    )

    // console.log(statuses);
    // const keys = Object.keys(statuses);
    notifications = notifications.map((item) => {
      const notification = JSON.parse(item)
      const status = statuses[notification._id]
      return {
        notification,
        status,
      }
    })

    return APIResponse(response, HttpStatus.SUCCESS, 'User notifications', {
      notifications,
    })
  }
)

export const markNotificationAsRead = CatchAsyncError(
  async (request, response, next) => {
    const userId = request.userId
    const { taskId } = request.body
    console.log(taskId)

    // Mark notifications as read
    await redisClient.hSet(`user:${userId}:notification_status`, taskId, 'read')

    return APIResponse(
      response,
      HttpStatus.SUCCESS,
      'Notifications marked as read'
    )
  }
)
