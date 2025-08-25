import { fileURLToPath } from "node:url"
import tailwindcss from "@tailwindcss/vite"

export default defineNuxtConfig({
  modules: [ "@nuxt/icon", "@nuxtjs/color-mode", "@nuxtjs/google-fonts", "@pinia/nuxt", "nuxt-auth-utils", ],
  alias: {
    "#server": fileURLToPath(new URL("./server", import.meta.url)),
  },
  imports: {
    dirs: ["lib", "lib/middleware", "lib/services", "lib/stores"],
  },
  runtimeConfig: {
    public: {
      baseUrl: process.env.NUXT_PUBLIC_BASE_URL,
    },
  },
  css: ["~/assets/styles.css"],
  vite: {
    plugins: [
      tailwindcss(),
    ],
  },
  colorMode: {
    classSuffix: "",
    preference: "system",
    fallback: "light",
    storageKey: "nuxt-color-mode",
  },
  googleFonts: {
    display: "swap",
    prefetch: true,
    preconnect: true,
    families: {
      Inter: true,
    },
  },
  icon: {
    clientBundle: {
      scan: true,
    },
  },
  compatibilityDate: "2025-05-24",
})
