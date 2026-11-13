export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: false },

  modules: ['vuetify-nuxt-module'],

  vuetify: {
    moduleOptions: {
      styles: true,
    },
    vuetifyOptions: {
      icons: {
        defaultSet: 'mdi',
      },
      theme: {
        defaultTheme: 'light',
      },
    },
  },

  runtimeConfig: {
    public: {
      googleClientId: '',
    },
  },

  app: {
    head: {
      title: 'Canvas Studio — Nuxt 4 & Fabric.js',
      script: [
        {
          src: 'https://accounts.google.com/gsi/client',
          async: true,
          defer: true,
        },
      ],
    },
  },
})