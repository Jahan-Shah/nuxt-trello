// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  pages: true,
  srcDir: 'src/',
  modules: ['@nuxt/ui', '@sidebase/nuxt-auth', 'nuxt-mongoose', '@nuxt/image'],
  runtimeConfig: {
    auth: {
      secret: '',
      origin: '',
    },
    public: {
      pixabayApiKey: '',
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
