import { Types } from 'mongoose'
import type { Document, ObjectId } from 'mongoose'
import { defineMongooseModel } from '#nuxt/mongoose'

export interface ListDocument extends Document {
  name: string
  cards: ObjectId[]
  board: ObjectId
  owner: ObjectId
}

export const List = defineMongooseModel<ListDocument>('List', {
  name: {
    type: String,
    required: [true, 'List name is required'],
  },
  cards: [
    {
      type: Types.ObjectId,
      ref: 'Card',
    },
  ],
  board: {
    type: Types.ObjectId,
    ref: 'Board',
  },
  owner: {
    type: Types.ObjectId,
    ref: 'User',
  },
}, {
  timestamps: true,
})
