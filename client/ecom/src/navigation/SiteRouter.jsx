import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import NavigationBar from '../components/global/NavigationBar'
import HomeSite from '../pages/HomeSite'
import Products from '../pages/products/Products'
import SignIn from '../pages/signin/SignIn'
import { Suspense } from 'react'
import SignUp from '../pages/SignUp'
import Stores from '../pages/Stores'

/**
 * Component for site navigation.
 */
function SiteRouter({ i18n }) {

  return (
    <div>
      <Router>
        {/* <Suspense fallback={<div>Loading...</div>}> */}
        <>
          <NavigationBar i18n={i18n}/>
          {/* basket component that open/close */}
        </>
        <Routes>
          <Route path="/" element={<HomeSite />}/>
          <Route path="/tuotteet" element={<Products/>}/>
          <Route path="/kaupat" element={<Stores/>}/>
          <Route path="/signin" element={<SignIn i18n={i18n}/>}/>
          <Route path="/signup" element={<SignUp i18n={i18n}/>}/>
        </Routes>
        {/* </Suspense> */}
      </Router>
    </div>
  )
}

export default SiteRouter