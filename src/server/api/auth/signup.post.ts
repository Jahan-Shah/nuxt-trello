import SignupSchema from "~/schemas/Signup.schema";

export default defineEventHandler(async (event) => {
  const body = await readBody(event)

  validateSchema(SignupSchema, body)

  const user = await User.create(body);

  return { ...user.toObject(), password: undefined }
})
