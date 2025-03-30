import { CatchAsyncError } from '../helpers/catchAsyncError.helpers.js'
import { APIResponse } from '../shared/apiResponse.shared.js'
import { validate } from '../helpers/validate.helpers.js'
import { TaskService } from '../services/task.services.js'
import { HttpStatus } from '../constants/httpStatus.constants.js'

export const createTask = CatchAsyncError(async (request, response, next) => {
  const { title, description, assignedTo, status, deadline, priority } =
    request.body

  validate(request.body, { title, assignedTo, deadline })

  const task = await TaskService.createNewTask(request.body)

  return APIResponse(response, HttpStatus.CREATED, 'New task created', { task })
})

export const getAllTasks = CatchAsyncError(async (request, response, next) => {
  const { status = 'To-Do' } = request.query
  const tasks = await TaskService.getAllTasks(status);
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
