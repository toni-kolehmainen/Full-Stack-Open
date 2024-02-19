import { Route, Routes, useNavigate } from 'react-router-dom';
import { Suspense, useState } from 'react';
import LoginViews from "../views/login/login"


function Navigation() {
  const navigate = useNavigate();

  const navigation = [
    {
      name: "Home",
      href: "/"
    },
    {
      name: "Login",
      href: "/login"
    },
    {
      name: "Register",
      href: "/register"
    }
  ]

  return (
  <>
  <Suspense fallback={<div>Loading...</div>}>
      <Routes>
          <Route path="/" element={<LoginViews/>}/>
          {/* <Route path="/" element={<Shopping_list/>}/>
          <Route path="/Spending_detail" element={<Spending_detail />}/>
          <Route path="/Stores" element={<Stores />}/>
          <Route path="/Common_shoppings" element={<Common_shoppings />}/> */}
      </Routes>
  </Suspense>
  </>
  )
}

export default Navigation;