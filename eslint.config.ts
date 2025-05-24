// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck

import tailwind from "@hyoban/eslint-plugin-tailwindcss"
import stylistic from "@stylistic/eslint-plugin"
import withNuxt from "./.nuxt/eslint.config.mjs"

export default withNuxt(
  stylistic.configs.recommended,
  ...tailwind.configs["flat/recommended"],
  {
    files: ["**/*.ts", "**/*.tsx", "**/*.js", "**/*.jsx", "**/*.mjs", "**/*.cjs", "**/*.vue"],
    plugins: { "@stylistic": stylistic },
    rules: {
      "@stylistic/indent": ["warn", 2],
      "@stylistic/quotes": ["warn", "double"],
      "@stylistic/semi": ["warn", "never"],
      "@stylistic/comma-dangle": ["warn", "never"],
      "@stylistic/brace-style": ["warn", "1tbs"],
      "vue/multi-word-component-names": "off",
      "vue/max-attributes-per-line": "off",
      "vue/first-attribute-linebreak": "off",
      "vue/html-closing-bracket-newline": "off",
      "vue/html-indent": "off",
      "vue/html-quotes": "warn",
      "tailwindcss/no-custom-classnames": "off"
    }
  }
)
