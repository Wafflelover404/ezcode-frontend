// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  vite: {
    server: {
      allowedHosts: ['kathy-serve-meal-stroke.trycloudflare.com'],
    }
  },
  compatibilityDate: '2024-11-01',
  devtools: { enabled: false },
  modules: ['@nuxt/ui', '@nuxtjs/i18n'],
  i18n: {
    locales: ['en', 'ru', 'by'],
    defaultLocale: 'en',
    vueI18n: './i18n.config.ts'
  },
  ui: {
    global: true,
  },
  colorMode: {
    preference: 'system',
    fallback: 'dark',
    classSuffix: '',
    storageKey: 'color-mode',
    dataValue: 'theme'
  },
  css: [
    '~/assets/css/main.css'
  ]
});
