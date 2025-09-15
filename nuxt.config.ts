// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2024-11-01",
  devtools: { enabled: true },
  modules: ["@nuxtjs/tailwindcss", "@nuxtjs/google-fonts", "@nuxt/icon", "@nuxtjs/color-mode"],
  css: ['~/assets/main.css'],
  googleFonts: {
    families: {
      'Inter': [400, 500, 600, 700],
      'Roboto': [300, 400, 500, 700],
    }
  },
  colorMode: {
    classSuffix: ''
  }
});