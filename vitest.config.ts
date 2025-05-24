import { defineConfig } from "vitest/config"

export default defineConfig({
  test: {
    include: ["tests/**/*.{test,spec}.{js,ts,jsx,tsx}"],
    exclude: ["node_modules", "tests/e2e", "dist"],
    globals: true,
    environment: "jsdom",
    css: true,
    coverage: {
      include: ["src/**/*"],
      provider: "v8"
    }
  }
})
