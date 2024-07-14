import { createContext, useEffect, useState } from "react";

const ThemeContext = createContext();

function ThemeProvider(props) {
  const [themeDark, setThemeDark] = useState(false)
  useEffect(()=> {
    
  },[themeDark])
  const toggleTheme = () => {
    setThemeDark(!themeDark)
    let themeName = themeDark ? 'dark' : 'light'
    document.documentElement.setAttribute('data-bs-theme', themeName)
    document.documentElement.setAttribute('data-theme', themeName)
    window.localStorage.setItem('theme', themeName)
    console.log(themeName)
    console.log("here", themeDark)
    
  } 
  return (
    <>
    <ThemeContext.Provider value={{themeDark, toggleTheme}}>
      {props.children}
    </ThemeContext.Provider>
    </>
  )
}

export {ThemeContext, ThemeProvider}