import { Schema, model } from 'mongoose'

const schema = new Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
    },
    description: {
      type: String,
      trim: true,
      lowercase: true,
    },
    assignedTo: [
      {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
      },
    ],
    status: {
      type: String,
      enum: ['To-Do', 'In-Progress', 'Completed'],
      default: 'To-Do',
    },
    deadline: {
      type: Date,
      required: true,
    },
    priority: {
      type: String,
      enum: ['Low', 'Medium', 'High'],
      default: 'Medium',
    },
    deleted: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
)
export const Task = model('Task', schema)
