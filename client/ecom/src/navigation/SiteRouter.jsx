import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import NavigationBar from '../components/global/NavigationBar'
import HomeSite from '../pages/HomeSite'
import Products, { ProductsField } from '../pages/products/Products'
import SignIn from '../pages/signin/SignIn'
import SignUp from '../pages/SignUp'
import Stores from '../pages/Stores'
import Groups, { SlugView } from '../pages/products/components/Groups'
import { SearchResult } from '../pages/products/components/Searchbar'

/**
 * Component for site navigation.
 */
function SiteRouter({ i18n }) {
  return (
    <div>
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
    </div>
  )
}

export default SiteRouter