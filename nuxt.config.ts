import { defineNuxtConfig } from "nuxt/config"

export default defineNuxtConfig({
  modules: [
    "@nuxtjs/color-mode",
    "@nuxtjs/google-fonts",
    "@nuxtjs/i18n",
    "@nuxt/icon",
    "@nuxtjs/tailwindcss",
    "@pinia/nuxt",
    "@sidebase/nuxt-auth",
    "@vueuse/motion/nuxt",
  ],
  srcDir: "src",
  serverDir: "server",
  auth: {
    baseURL: `${process.env.BASE_URL}/api/auth`,
    originEnvKey: process.env.BASE_URL,
    provider: {
      type: "authjs",
      defaultProvider: "github",
    },
    sessionRefresh: {
      enablePeriodically: 20000,
      enableOnWindowFocus: true,
    },
  },
  colorMode: {
    classSuffix: "",
    preference: "system",
    fallback: "light",
    storageKey: "nuxt-color-mode",
  },
  googleFonts: {
    families: {
      Inter: true,
    },
    display: "swap",
    prefetch: true,
    preconnect: true,
  },
  i18n: {
    baseUrl: process.env.BASE_URL,
    restructureDir: "src/lib",
    vueI18n: "i18n.ts",
    detectBrowserLanguage: {
      useCookie: false,
      alwaysRedirect: true,
      redirectOn: "root",
      fallbackLocale: "en-US",
    },
  },
  tailwindcss: {
    cssPath: "~/styles/globals.css",
  },
  compatibilityDate: "2025-05-24",
})
