import { use } from 'i18next'
import { createContext, useEffect, useState } from 'react'

const ThemeContext = createContext()

function ThemeProvider(props) {
  const [themeDark, setThemeDark] = useState(false)

  const handleChange = (event) => {
    setThemeDark(event.matches)
    let themeName = event.matches ? 'dark' : 'light'
    document.documentElement.setAttribute('data-bs-theme', themeName)
    document.documentElement.setAttribute('data-theme', themeName)
    window.localStorage.setItem('theme', themeName)
  }

  useEffect(() => {

    if (window.localStorage.getItem('theme')) {
      const themeName = window.localStorage.getItem('theme')
      setThemeDark(themeName === 'dark')
      document.documentElement.setAttribute('data-bs-theme', themeName)
      document.documentElement.setAttribute('data-theme', themeName)
    } else {
      const globalTheme = window.matchMedia('(prefers-color-scheme: dark)')
      handleChange(globalTheme)
      let themeName = globalTheme ? 'dark' : 'light'
      window.localStorage.setItem('theme', themeName)

      globalTheme.addEventListener('change',handleChange)
      return () => globalTheme.removeEventListener('change',handleChange)
    }
  }, [])
  const toggleTheme = () => {
    setThemeDark(!themeDark)
    let themeName = !themeDark ? 'dark' : 'light'
    document.documentElement.setAttribute('data-bs-theme', themeName)
    document.documentElement.setAttribute('data-theme', themeName)
    window.localStorage.setItem('theme', themeName)
  }
  return (
    <>
      <ThemeContext.Provider value={{ themeDark, toggleTheme }}>
        {props.children}
      </ThemeContext.Provider>
    </>
  )
}

export { ThemeContext, ThemeProvider }