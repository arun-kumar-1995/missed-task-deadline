import { Schema, model } from 'mongoose'

const schema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ['admin', 'user'],
      default: 'user',
    },
    accountStatus: {
      type: String,
      enum: ['active', 'inactive', 'locked'],
      default: 'active',
    },
    tags: {},
  },
  { timestamps: true }
)

export const User = model('User', schema)
