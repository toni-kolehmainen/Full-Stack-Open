import './App.css'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import SiteRouter from './navigation/SiteRouter'
import { v4 as uuidv4 } from 'uuid';
import { useCookies } from 'react-cookie'
import { useDispatch, useSelector } from 'react-redux'
import { fetchUserCart } from './redux/reducer/cartReducer'

function App() {
  const [cookies, setCookie] = useCookies(['uuid_token'])
  const { i18n, t } = useTranslation()
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchUserCart(cookies.uuid_token))
    if (!cookies.uuid_token) {
      setCookie("uuid_token", uuidv4())
    }
  }, [])

  useEffect(() => {
    if (window.localStorage.getItem('language') === null) {
      window.localStorage.setItem('language', 'en')
    } else {
      i18n.changeLanguage(window.localStorage.getItem('language'))
    }
  }, [i18n])

  return (
    <div className="App">
      {/* Maybe admin to add products */}
      <SiteRouter i18n={i18n} />
    </div>
  )
}

export default App
