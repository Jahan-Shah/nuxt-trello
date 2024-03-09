import BoardSchema from "~/schemas/Board.schema"

export default defineEventHandler(async (event) => {
  const user = event.context.user
  const body = await readBody(event)

  validateSchema(BoardSchema, body)

  const board = await Board.create({
    ...body,
    owner: user._id
  })

  return board
})
