import { createContext, useState } from "react";

const ThemeContext = createContext();

function ThemeProvider(props) {
  const [themeDark, setThemeDark] = useState(false)

  const toggleTheme = () => {
    setThemeDark(!themeDark)
    let themeName = themeDark ? 'dark' : 'light'
    document.documentElement.setAttribute('data-bs-theme', themeName)
    document.documentElement.setAttribute('data-theme', themeName)
    window.localStorage.setItem('theme', themeName)
    console.log("here", themeName)
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