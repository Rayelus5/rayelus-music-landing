import { useEffect, useState } from 'react'

const STORAGE_KEY = 'rayelus-theme'

export type Theme = 'light' | 'dark'

// Light is the default regardless of OS preference; dark is an explicit choice.
export function useTheme() {
  const [theme, setTheme] = useState<Theme>(() =>
    localStorage.getItem(STORAGE_KEY) === 'dark' ? 'dark' : 'light',
  )

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark')
    localStorage.setItem(STORAGE_KEY, theme)
  }, [theme])

  return {
    theme,
    toggleTheme: () => setTheme((t) => (t === 'light' ? 'dark' : 'light')),
  }
}
