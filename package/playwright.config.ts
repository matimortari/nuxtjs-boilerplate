import { defineConfig } from "@playwright/test"

export default defineConfig({
  outputDir: "./test/e2e/test-results",
  testDir: "./test/e2e",
})
