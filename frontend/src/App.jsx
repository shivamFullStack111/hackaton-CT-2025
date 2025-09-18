import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Login from './auth/Login'
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import Register from './auth/Register';
import { Toaster } from 'react-hot-toast';



const App = () => {
  return (
    <>

      <div className='container mx-auto '>

        <BrowserRouter >
          <Routes>
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