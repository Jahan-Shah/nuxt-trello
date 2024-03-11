import bcrypt from 'bcryptjs'
import type { Document } from 'mongoose'
import { defineMongooseModel } from '#nuxt/mongoose'

export interface UserDocument extends Document {
  name: string
  email: string
  password: string
  stripeCustomerId: string

  comparePassword: (password: string) => Promise<boolean>
}

export const User = defineMongooseModel<UserDocument>('User', {
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
  stripeCustomerId: {
    type: String,
    default: null,
  },
}, {
  timestamps: true,
}, (schema) => {
  schema.pre('save', async function (next) {
    if (!this.isModified('password'))
      return next()
    this.password = await generateHash(this.password)
  })

  schema.methods.comparePassword = async function (password: string) {
    return await bcrypt.compare(password, this.password)
  }
})
