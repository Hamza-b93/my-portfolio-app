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
  },
  nitro: {
    // Bundle cv-resume.md into the server output so it works on Node.js and edge runtimes
    serverAssets: [{
      baseName: 'resume',
      dir: '../'
    }],
    prerender: {
      // Generate /api/resume as a static JSON file for static (Cloudflare Pages) deployments
      routes: ['/api/resume']
    }
  }
});