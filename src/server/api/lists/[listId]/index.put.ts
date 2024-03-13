import ListSchema from '~/schemas/List.schema'

export default defineEventHandler(async (event) => {
  const listId = getRouterParam(event, 'listId')
  const user = event.context.user

  const body = await readBody(event)

  validateSchema(ListSchema.partial(), body)

  const updatedLists = await List.findByIdAndUpdate({
    _id: listId,
    owner: user._id,
  }, {
    $set: body,
  }, {
    new: true,
  })

  if (!updatedLists) {
    throw createError({
      statusCode: 404,
      message: 'List not found',
    })
  }

  return updatedLists
})
