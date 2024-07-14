import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import './index.scss'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'leaflet/dist/leaflet.css'
import 'leaflet/dist/leaflet.js'
import './i18n/i18n'
import { Provider } from 'react-redux'
import store from './redux/store/store.js'
import { ThemeProvider } from './redux/context/ThemeContext.jsx'

// @reduxjs/toolkit and rtk
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <ThemeProvider>
        <App />
      </ThemeProvider>
    </Provider>
  </React.StrictMode>
)