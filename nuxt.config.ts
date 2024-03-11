// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  pages: true,
  srcDir: 'src/',
  modules: ['@nuxt/ui', '@sidebase/nuxt-auth', 'nuxt-mongoose'],
  runtimeConfig: {
    auth: {
      secret: '',
      origin: '',
    },
  },
  ui: {},
  auth: {
    /* eslint node/prefer-global/process: [error] */
    baseURL: process.env.NUXT_AUTH_ORIGIN,
    provider: {
      type: 'authjs',
    },
  },
})
