// 26.6

import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import NavigationBar from "../components/global/NavigationBar";
import HomeSite from "../pages/HomeSite";
import Products from "../pages/Products";
import SignIn from "../pages/SignIn";
import { Suspense } from "react";
import SignUp from "../pages/SignUp";

/**
 * Component for site navigation bar.
 */
function SiteRouter({i18n}) {
  // const navigate = useNavigate();

  // const navigation = [
  //   {
  //     name: "Home",
  //     href: "/"
  //   },
  //   {
  //     name: "Login",
  //     href: "/login"
  //   },
  //   {
  //     name: "Register",
  //     href: "/register"
  //   }
  // ]

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
            <Route path="/signin" element={<SignIn i18n={i18n}/>}/>
            <Route path="/signup" element={<SignUp i18n={i18n}/>}/>
            {/* <Route path="/" element={<Home />} /> */}
            
          </Routes>
        {/* </Suspense> */}
      </Router>
    </div>
  );
}

export default SiteRouter;