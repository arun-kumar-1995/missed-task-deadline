import { HttpStatus } from '../constants/httpStatus.constants.js'
import { TaskModel } from '../models/task.model.js'
import { APIError } from '../shared/errorHandler.shared.js'
class Service {
  async createNewTask(body) {
    // check if this task is already created
    const duplicate = await TaskModel.findOne({ title: body.title })
    if (duplicate)
      throw new APIError(HttpStatus.CONFLICT, 'Task title is already present')

    // create new task
    return await TaskModel.create(body)
  }

  async updateTask(taskId, updateData) {
    if (!updateData || Object.keys(updateData).length === 0)
      throw new APIError(
        HttpStatus.INVALID_REQUEST,
        'Must provide update task parameters'
      )
    await TaskModel.updateById(taskId, updateData)
  }

  async deleteTask(taskId) {
    // find the task
    const task = await TaskModel.findById(taskId)
    if (!task)
      throw new APIError(HttpStatus.NOT_FOUND, 'Invalid task parameter')

    // assign deleted to true
    task.deleted = true
    // save the task
    await task.save()
  }

  async getAllTasks() {
    return TaskModel.findAll({ deleted: false })
  }
}

export const TaskService = new Service()
