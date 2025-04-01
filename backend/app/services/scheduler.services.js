import cron from 'node-cron'
import { redisClient } from '../../configs/redis.configs.js'
import { Task } from '../schemas/task.schema.js'
import { Notification } from '../schemas/notification.schema.js'
import { createNotification } from '../helpers/createNotification.helpers.js'

export const getCurrentUTCTimestamp = () => {
  const date = new Date()
  const offset = date.getTimezoneOffset() * 60000
  const localISOTime = new Date(date - offset).toISOString().slice(0, -1) + 'Z'
  return localISOTime
}

export const taskDeadlineScheduler = async (io) => {
  cron.schedule('0 * * * * *', async () => {
    try {
      const timestamp = getCurrentUTCTimestamp()
      const mills = new Date(timestamp).getTime()
      console.log('Schedule job started...', timestamp)
      console.log('Checking for expired tasks...', mills)

      // Fetch all users with deadline tasks
      const expiredTasks = await redisClient.ZRANGEBYSCORE(
        `user:deadline_tasks`,
        0,
        mills
      )
      console.log('-----ExpiredTasks', expiredTasks)

      for (const taskId of expiredTasks) {
        // create notification
        const notification = await createNotification(taskId, mills);

        // Notify the assigned user via WebSockets
        io.emit('deadline_tasks', { notification })
        // Remove task from Redis after notifying
        await redisClient.ZREM(`user:deadline_tasks`, expiredTasks)
      }
    } catch (err) {
      console.log('error---schedule', err)
    }
  })
}
