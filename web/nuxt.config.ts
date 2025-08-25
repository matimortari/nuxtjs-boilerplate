import tailwindcss from "@tailwindcss/vite"

export default defineNuxtConfig({
  modules: ["@nuxt/icon", "@nuxtjs/color-mode", "@nuxtjs/google-fonts", "nuxt-shiki"],
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
  shiki: {
    bundledLangs: ["bash", "html", "javascript", "json", "markdown", "typescript", "vue"],
    bundledThemes: ["catppuccin-macchiato"],
    highlightOptions: {
      theme: "catppuccin-macchiato",
    },
  },
  compatibilityDate: "2025-05-24",
})
