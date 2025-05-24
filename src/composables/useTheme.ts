export function useTheme() {
  const colorMode = useState<"light" | "dark">("theme", () => {
    if (import.meta.client) {
      const saved = localStorage.getItem("theme")
      if (saved === "dark" || saved === "light") {
        return saved
      }
    }
    return "light"
  })

  const updateHtmlClass = () => {
    const html = document.documentElement
    if (colorMode.value === "dark") {
      html.classList.add("dark")
    }
    else {
      html.classList.remove("dark")
    }
  }

  const toggleTheme = () => {
    colorMode.value = colorMode.value === "dark" ? "light" : "dark"
    if (import.meta.client) {
      localStorage.setItem("theme", colorMode.value)
    }
    updateHtmlClass()
  }
  if (import.meta.client) {
    updateHtmlClass()

    const saved = localStorage.getItem("theme")
    if (saved === "dark" || saved === "light") {
      if (colorMode.value !== saved) {
        colorMode.value = saved
        updateHtmlClass()
      }
    }
  }

  return { colorMode, toggleTheme }
}
