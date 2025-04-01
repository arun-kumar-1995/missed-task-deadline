import { CatchAsyncError } from '../helpers/catchAsyncError.helpers.js'
import { APIResponse } from '../shared/apiResponse.shared.js'
import { validate } from '../helpers/validate.helpers.js'
import { TaskService } from '../services/task.services.js'
import { HttpStatus } from '../constants/httpStatus.constants.js'
import { redisClient } from '../../configs/redis.configs.js'

export const createTask = CatchAsyncError(async (request, response, next) => {
  const {
    title,
    description,
    assignedTo,
    status,
    deadline,
    priority,
    expireTime,
  } = request.body

  validate(request.body, { title, description, status, priority, deadline })
  console.log('--Expire time from client in second', expireTime)
  const userId = request.userId
  const task = await TaskService.createNewTask({
    ...request.body,
    assignedTo: userId,
  })

  // Update Redis Task Count
  await redisClient.HINCRBY(`user:${userId}:task_counts`, status, 1)

  // Update unread count per user
  const users = await redisClient.SMEMBERS('unread_users')

  for (const userId of users) {
    await redisClient.HINCRBY(`user:${userId}:unread_counts`, status, 1)
  }

  await redisClient.zAdd(`user:deadline_tasks`, [
    { value: task._id.toString(), score: expireTime },
  ])

  // Emit Event to Clients
  request.io.emit('task_created', { task })

  return APIResponse(response, HttpStatus.CREATED, 'New task created', { task })
})

export const getAllTasks = CatchAsyncError(async (request, response, next) => {
  const { status = 'To-Do' } = request.query
  const tasks = await TaskService.getAllTasks(status)
  // Register the user for unread tracking
  await redisClient.SADD('unread_users', request.userId.toString())

  return APIResponse(response, HttpStatus.SUCCESS, 'Here is list of tasks', {
    tasks,
  })
})

export const updateTask = CatchAsyncError(async (request, response, next) => {
  const { taskId } = request.params

  await TaskService.updateTask(taskId, request.body)
  return APIResponse(response, HttpStatus.SUCCESS, 'Task updated')
})

export const deleteTask = CatchAsyncError(async (request, response, next) => {
  const { taskId } = request.params
  await TaskService.deleteTask(taskId)
  return APIResponse(response, HttpStatus.SUCCESS, 'Task deleted')
})

export const resetTasks = CatchAsyncError(async (request, response, next) => {
  const { status, userId } = request.body
  await redisClient.HSET(`user:${userId}:unread_counts`, status, 0)

  request.io.emit('update_unread_counts', {
    ...(await redisClient.HGETALL(`user:${userId}:unread_counts`)),
  })

  return APIResponse(response, HttpStatus.SUCCESS, 'Task read updated')
})
