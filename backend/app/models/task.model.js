import { Model } from '../helpers/model.helpers.js'
import { Task } from '../schemas/task.schema.js'

class TaskModal extends Model {
  constructor() {
    super(Task)
  }
}

export const TaskModel = new TaskModal(Task)
