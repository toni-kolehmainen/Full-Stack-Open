import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import './index.scss'
import 'bootstrap/dist/css/bootstrap.min.css'
import './i18n/i18n'
import { Provider } from 'react-redux'
import store from './redux/store/store.js'
import { ThemeProvider } from './redux/context/ThemeContext.jsx'
import { StoreProvider } from './redux/context/StoreContext.jsx'
import { BrowserRouter as Router, } from 'react-router-dom'

// @reduxjs/toolkit and rtk
ReactDOM.createRoot(document.getElementById('root')).render(
  // <React.StrictMode>
  <Router>
    <Provider store={store}>
      <ThemeProvider>
        <StoreProvider>
          <App />
        </StoreProvider>
      </ThemeProvider>
    </Provider>
  </Router>
  // </React.StrictMode>
)