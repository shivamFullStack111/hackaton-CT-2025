import React from 'react'
import { Routes, Route, BrowserRouter } from "react-router-dom"
import Login from './pages/Login'
import Register from './pages/Register'

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/register" element={<Register />}></Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App