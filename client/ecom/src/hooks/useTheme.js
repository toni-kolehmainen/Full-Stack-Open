import { useEffect, useState } from 'react'

const useTheme = () => {
  const getCurrentTheme = () => window.matchMedia('(prefers-color-scheme: dark)').matches
  const [theme, setTheme] = useState(getCurrentTheme())
  useEffect(() => {

    const handleWindowTheme = (evt) => {
      setTheme(evt.matches)
    }
    window.addEventListener('change', handleWindowTheme)
    return () => window.removeEventListener('change',handleWindowTheme)
  }, [])
  console.log('theme', theme)
  return theme
}
export default useTheme