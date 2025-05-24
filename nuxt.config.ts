import { defineNuxtConfig } from "nuxt/config"

export default defineNuxtConfig({
  modules: [
    "@nuxt/eslint",
    "@nuxtjs/google-fonts",
    "@nuxtjs/i18n",
    "@nuxt/icon",
    "@nuxtjs/supabase",
    "@nuxtjs/tailwindcss",
    "@pinia/nuxt"
  ],
  srcDir: "src",
  googleFonts: {
    families: {
      Inter: true
    },
    display: "swap",
    prefetch: true,
    preconnect: true
  },
  i18n: {
    baseUrl: process.env.BASE_URL,
    restructureDir: "src/lib",
    vueI18n: "i18n.ts",
    detectBrowserLanguage: {
      useCookie: false,
      alwaysRedirect: true,
      redirectOn: "root",
      fallbackLocale: "en-US"
    }
  },
  supabase: {
    url: process.env.VITE_SUPABASE_URL,
    key: process.env.VITE_SUPABASE_ANON_KEY,
    serviceKey: process.env.VITE_SUPABASE_SERVICE_ROLE_KEY,
    redirect: false
  },
  tailwindcss: {
    cssPath: "~/styles/globals.css"
  },
  compatibilityDate: "2025-05-24"
})
