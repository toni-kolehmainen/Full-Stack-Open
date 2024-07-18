import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import NavigationBar from '../components/global/NavigationBar'
import HomeSite from '../pages/HomeSite'
import Products, { ProductsField } from '../pages/products/Products'
import SignIn from '../pages/signin/SignIn'
import { Suspense } from 'react'
import SignUp from '../pages/SignUp'
import Stores from '../pages/Stores'
import ShoppingCart from '../components/global/ShoppingCart'
import { useViewport } from '../hooks'
import Groups from '../pages/products/components/Groups'

/**
 * Component for site navigation.
 */
function SiteRouter({ i18n }) {
  const viewport = useViewport()
  return (
    <div>
      <Router>
        {/* <Suspense fallback={<div>Loading...</div>}> */}
        <>
          <NavigationBar i18n={i18n} />
          {/* <ShoppingCart /> */}
          {/* basket component that open/close */}
        </>
        <Routes>
          <Route path="/" element={<HomeSite />} />
          <Route path="/tuotteet" element={<Products />}>
            <Route path="" element={<ProductsField />} />
            <Route path="tuoteryhmat" element={<Groups />} />
            {/* <Route path="haku" element={<SearchResult/>}/> */}
            {/* <Route path="/tuotteet" element={<Products/>}/> */}
          </Route>
          {/* <Route path="/tuotteet/:" element={<BySlug/>}/> */}
          <Route path="/kaupat" element={<Stores />} />
          <Route path="/signin" element={<SignIn i18n={i18n} />} />
          <Route path="/signup" element={<SignUp i18n={i18n} />} />
        </Routes>
        {/* </Suspense> */}
      </Router>
    </div>
  )
}

export default SiteRouter