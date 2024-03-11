import { Types } from 'mongoose'
import type { Document, ObjectId } from 'mongoose'
import { defineMongooseModel } from '#nuxt/mongoose'

export interface BoardDocument extends Document {
  name: string
  list: string[]
  owner: ObjectId
  coverImage: string
}

export const Board = defineMongooseModel<BoardDocument>('Board', {
  name: {
    type: String,
    default: 'Untitled Board',
  },
  list: [
    {
      type: Types.ObjectId,
      ref: 'List',
    },
  ],
  owner: {
    type: Types.ObjectId,
    ref: 'User',
  },
  coverImage: {
    type: String,
    default: null,
  },
}, {
  timestamps: true,
})
