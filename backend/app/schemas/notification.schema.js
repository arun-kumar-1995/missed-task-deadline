import { Schema, model } from 'mongoose'
const schema = new Schema(
  {
    message: {
      type: String,
      required: true,
      trim: true,
    },
    priority: {
      type: String,
      enum: ['Low', 'Medium', 'High'],
      default: 'Medium',
    },
    taskId: {
      type: Schema.Types.ObjectId,
      ref: 'Task',
    },
    deadline: {
      type: Date,
    },
  },
  { timestamps: true }
)

export const Notification = model('Notification', schema)
