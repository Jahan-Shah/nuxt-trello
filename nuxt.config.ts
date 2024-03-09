// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  pages: true,
  srcDir: 'src/',
  modules: ['@nuxt/ui', '@sidebase/nuxt-auth', 'nuxt-mongoose'],
  runtimeConfig: {
    auth: {
      secret: process.env.AUTH_SECRET,
      origin: process.env.AUTH_ORIGIN
    }
  },
  ui: {},
  auth: {
    baseUrl: process.env.AUTH_ORIGIN,
    provider: {
      type: 'authjs'
    }
  }
})
