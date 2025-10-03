import React from 'react'
import { Routes, Route, BrowserRouter } from "react-router-dom"
import Login from './pages/Login'
import Register from './pages/Register'
import LandingPage from './pages/LandingPage'
import Home from './pages/Home/Home'

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/register" element={<Register />}></Route>
                    <Route path="/landing-page" element={<LandingPage />}></Route>
                                        <Route path="/" element={<Home />}></Route>


        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App