import { CatchAsyncError } from '../helpers/catchAsyncError.helpers.js'
import { APIResponse } from '../shared/apiResponse.shared.js'
import { validate } from '../helpers/validate.helpers.js'
import { TaskService } from '../services/task.services.js'
import { HttpStatus } from '../constants/httpStatus.constants.js'
import { redisClient } from '../../configs/redis.configs.js'

export const createTask = CatchAsyncError(async (request, response, next) => {
  const { title, description, assignedTo, status, deadline, priority } =
    request.body

  validate(request.body, { title, assignedTo, deadline })

  const task = await TaskService.createNewTask(request.body)
  // Update Redis Task Count
  await redisClient.HINCRBY('task_counts', status, 1)

  // Update unread count per user
  const users = await redisClient.SMEMBERS('unread_users')

  for (const userId of users) {
    await redisClient.HINCRBY(`unread_counts:${userId}`, status, 1)
  }
  // Emit Event to Clients
  request.io.emit('task_created', { task })

  return APIResponse(response, HttpStatus.CREATED, 'New task created', { task })
})

export const getAllTasks = CatchAsyncError(async (request, response, next) => {
  const { status = 'To-Do' } = request.query
  const tasks = await TaskService.getAllTasks(status)
  // Register the user for unread tracking
  await redisClient.SADD('unread_users', String(request.userId))

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
  console.log(status, userId)
  await redisClient.HSET(`unread_counts:${userId}`, status, 0)

  request.io.emit('update_unread_counts', {
    ...(await redisClient.HGETALL(`unread_counts:${userId}`)),
  })

  return APIResponse(response, HttpStatus.SUCCESS, 'Task read updated')
})
