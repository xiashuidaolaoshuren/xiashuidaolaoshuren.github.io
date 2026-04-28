import { Moon, Sun } from "lucide-react"
import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import {
  applyThemeToDocument,
  getStoredTheme,
  setTheme,
  type ThemePreference,
} from "@/lib/theme"

function readModeFromDocument(): ThemePreference {
  return document.documentElement.classList.contains("dark") ? "dark" : "light"
}

export function ThemeToggle() {
  const [mode, setMode] = useState<ThemePreference>(() =>
    typeof document !== "undefined" ? readModeFromDocument() : "light"
  )

  useEffect(() => {
    const mq = window.matchMedia("(prefers-color-scheme: dark)")
    const onChange = () => {
      if (getStoredTheme() === null) {
        const next = mq.matches ? "dark" : "light"
        applyThemeToDocument(next)
        setMode(next)
      }
    }
    mq.addEventListener("change", onChange)
    return () => mq.removeEventListener("change", onChange)
  }, [])

  const toggle = () => {
    const next: ThemePreference = mode === "dark" ? "light" : "dark"
    setTheme(next)
    setMode(next)
  }

  const isDark = mode === "dark"

  return (
    <Button
      type="button"
      variant="outline"
      size="sm"
      className="w-full justify-center gap-2 border-primary/25 bg-primary/5 text-primary hover:bg-primary/15 hover:text-primary"
      onClick={toggle}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
    >
      {isDark ? (
        <>
          <Sun className="size-4" aria-hidden />
          Light mode
        </>
      ) : (
        <>
          <Moon className="size-4" aria-hidden />
          Dark mode
        </>
      )}
    </Button>
  )
}
