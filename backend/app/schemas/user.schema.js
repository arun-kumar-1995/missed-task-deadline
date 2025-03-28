import { Schema, model } from 'mongoose'
import { Bcrypt } from '../services/bcrypt.services.js'

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
      select: false,
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

schema.pre('save', async function (next) {
  if (!this.isModified('password')) return next()
  this.password = await Bcrypt.hashPassword(this.password)
})

export const User = model('User', schema)
