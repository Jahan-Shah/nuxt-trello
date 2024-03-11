import type { ZodSchema } from 'zod'

export function validateSchema(schema: ZodSchema, data: any): void {
  try {
    schema.parse(data)
  }
  catch (e: any) {
    const errorObj: any = {}

    for (const error of e.issues) {
      if (error.path.length === 1)
        errorObj[error.path[0]] = error.message

      if (error.path.length === 2)
        errorObj[error.path[1]] = error

      if (error.path.length === 3)
        errorObj[`${error.path[1]}.${error.path[2]}`] = error
    }

    throw createError({
      statusCode: 400,
      statusMessage: 'Validation Error',
      data: errorObj,
    })
  }
}
