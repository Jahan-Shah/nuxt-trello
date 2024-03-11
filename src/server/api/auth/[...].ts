import CredentialsProvider from 'next-auth/providers/credentials'
import { NuxtAuthHandler } from '#auth'

async function getUser(id: string) {
  const user = await User.findById(id)

  return user?.toJSON()
}

export default NuxtAuthHandler({
  secret: useRuntimeConfig().auth.secret,

  pages: {
    signIn: '/auth/signin',
  },

  providers: [
    // @ts-expect-error: Dep Error
    CredentialsProvider.default({
      name: 'credentials',
      origin: useRuntimeConfig().auth.origin,
      async authorize(credentials: { email: string, password: string }) {
        const user = await User.findOne({ email: credentials.email }).select('+password')
        if (!user)
          return null

        const isValid = await user.comparePassword(credentials.password)

        if (!isValid)
          return null

        return { ...user.toObject(), password: undefined }
      },
    }),
  ],
  session: {
    strategy: 'jwt',
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token = {
          ...token,
          ...user,
        }
      }
      return token
    },

    async session({ session, token }) {
      // @ts-expect-error: Dep Error
      const refreshedUser = await getUser(token._id)

      session.user = {
        ...token,
        ...session.user,
        ...refreshedUser,
      }
      return session
    },
  },
})
