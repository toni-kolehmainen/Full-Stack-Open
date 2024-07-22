import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import { lazy, Suspense } from 'react'
// import { ProductsField } from '../pages/products/Products'
// import ProductsField  from '../pages/products/components/ProductsField'
// import NavigationBar from '../components/global/NavigationBar'
// import HomeSite from '../pages/HomeSite'
// import SignIn from '../pages/signin/SignIn'
// import SignUp from '../pages/SignUp'
// import Stores from '../pages/Stores'
import Groups, { SlugView } from '../pages/products/components/Groups'
import { SearchResult } from '../pages/products/components/Searchbar'
const ProductsField = lazy(() => import('../pages/products/components/ProductsField'))
const Products = lazy(() => import('../pages/products/Products'))
const Stores = lazy(() => import('../pages/Stores'))
const SignUp = lazy(() => import('../pages/SignUp'))
const SignIn = lazy(() => import('../pages/signin/SignIn'))
const HomeSite = lazy(() => import('../pages/HomeSite'))
const NavigationBar = lazy(() => import('../components/global/NavigationBar'))

/**
 * Component for site navigation.
 */
function SiteRouter({ i18n }) {
  return (
    <Suspense fallback={<></>}>
      <NavigationBar i18n={i18n} />
      <Routes>
        <Route path="/" element={<HomeSite />} />
        <Route path="/tuotteet" element={<Products />}>
          <Route path="" element={<ProductsField />} />
          <Route path="tuoteryhmat" >
            <Route path="" element={<Groups />} />
            <Route path=":category/:slug?/:childslug?" element={<SlugView />} />
          </Route>
          <Route path="tuotehaku" element={<SearchResult />} />
        </Route>
        <Route path="/kaupat" element={<Stores />} />
        <Route path="/signin" element={<SignIn i18n={i18n} />} />
        <Route path="/signup" element={<SignUp i18n={i18n} />} />
      </Routes>
    </Suspense>
  )
}

export default SiteRouter