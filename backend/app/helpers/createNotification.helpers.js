import { redisClient } from '../../configs/redis.configs.js'
import { Notification } from '../schemas/notification.schema.js'
import { Task } from '../schemas/task.schema.js'

export const createNotification = async (taskId, miliseconds) => {
  // / get tasky id
  const task = await Task.findByIdAndUpdate(
    taskId,
    { $set: { status: 'Missed' } },
    { new: true, upsert: true }
  )

  const userId = task.assignedTo
  // create notification for futher reference
  const notification = await Notification.create({
    taskId: task._id,
    message: task.title,
    deadline: task.deadline,
    priority: task.priority,
  })

  // store them inside redis for getting new task missed notification
  await redisClient.zAdd(`user:${userId}:notifications`, [
    {
      score: miliseconds,
      value: JSON.stringify(notification),
    },
  ])

  // Mark as "new" in Redis
  await redisClient.hSet(
    `user:${userId}:notification_status`,
    notification._id.toString(),
    'new'
  )

  return notification
}
