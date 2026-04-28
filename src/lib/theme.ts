/** localStorage key for explicit light/dark preference */
export const THEME_STORAGE_KEY = "personal-webpage-theme"

export type ThemePreference = "light" | "dark"

export function getStoredTheme(): ThemePreference | null {
  try {
    const v = localStorage.getItem(THEME_STORAGE_KEY)
    if (v === "light" || v === "dark") return v
  } catch {
    /* ignore */
  }
  return null
}

/** Resolved appearance: stored choice or OS preference */
export function resolveTheme(): ThemePreference {
  const stored = getStoredTheme()
  if (stored) return stored
  if (typeof window === "undefined") return "light"
  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light"
}

export function applyThemeToDocument(mode: ThemePreference): void {
  document.documentElement.classList.toggle("dark", mode === "dark")
}

export function setTheme(mode: ThemePreference): void {
  try {
    localStorage.setItem(THEME_STORAGE_KEY, mode)
  } catch {
    /* ignore */
  }
  applyThemeToDocument(mode)
}
