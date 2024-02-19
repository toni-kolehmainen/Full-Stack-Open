import logo from './logo.svg';
import './App.css';
import {
  BrowserRouter as Router,
  Routes, Route, Link
} from 'react-router-dom'
import Login from './pages/Login/login';
import Register from './pages/Register/register';
import Home from './pages/Home/home';
import NavigationBar from './components/navigation_bar';
import { useState } from 'react';

function App() {

  const language = useState("en-US")
  const currency = useState("Euro")

  return (

    <Router>
      <>
        <NavigationBar/>
      </>
      {/* navigation component */}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>

      <div>
        <i>Current test build</i>
      </div>
    </Router>
  );
}

export default App;
