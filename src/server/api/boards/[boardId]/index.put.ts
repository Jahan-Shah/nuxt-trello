import BoardSchema from '~/schemas/Board.schema'

export default defineEventHandler(async (event) => {
  const user = event.context.user
  const body = await readBody(event)

  validateSchema(BoardSchema.partial(), body)

  const boardId = getRouterParam(event, 'boardId')

  const board = await Board.findOneAndUpdate({
    _id: boardId,
    owner: user._id,
  }, {
    $set: body,
  })

  return board
})
