import './App.css'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { initTheme } from './services/globalHandler'
import SiteRouter from './navigation/SiteRouter'

function App() {
  const [language, setLanguage] = useState(null)
  const { i18n, t } = useTranslation()

  useEffect(() => {
    initTheme()
  }, [])

  useEffect(() => {
    if (window.localStorage.getItem('language') === null) {
      setLanguage('en')
      window.localStorage.setItem('language', 'en')
    } else {
      i18n.changeLanguage(window.localStorage.getItem('language'))
      setLanguage(window.localStorage.getItem('language'))

    }
  }, [i18n])

  return (
    <>
      <div className="App">
        {/* Maybe admin to add products */}
        <SiteRouter i18n={i18n} />
      </div>
    </>
  )
}

export default App
