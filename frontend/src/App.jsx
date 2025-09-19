import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { Toaster } from 'react-hot-toast';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import LandingPage from './pages/landingpage/LandingPage';
import Home from './pages/home/Home';




const App = () => {
  return (
    <>

      <div className=' '>

        <BrowserRouter >
          <Routes>
            <Route path='/' element={<Home />}></Route>
            <Route path='/landing-page' element={<LandingPage />}></Route>
            <Route path='/login' element={<Login />}></Route>
            <Route path='/register' element={<Register />}></Route>

          </Routes>
        </BrowserRouter>
        <Toaster />
      </div>

    </>
  )
}

export default App