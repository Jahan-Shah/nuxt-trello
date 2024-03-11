import bcrypt from 'bcryptjs'

export async function generateHash(password: string) {
  const salt = await bcrypt.genSalt(10)

  const hashedData = await bcrypt.hash(password, salt)

  return hashedData
}
