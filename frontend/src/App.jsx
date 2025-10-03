import React from 'react'
import { Routes, Route, BrowserRouter } from "react-router-dom"
import Login from './pages/Login'
import Register from './pages/Register'
import LandingPage from './pages/LandingPage'
import CreateSession from './pages/createSession/CreateSession'
import JoinSession from './pages/joinSession/JoinSession'
import Home from './pages/Home/Home'
import PersonalAIAssistant from './pages/personalizedAssistent/PersonalizedAssistent'
import LiveRoom from './pages/liveRoom/LiveRoom'

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/register" element={<Register />}></Route>
          <Route path="/landing-page" element={<LandingPage />}></Route>
          <Route path="/" element={<Home />}></Route>
          <Route path="/create-session" element={<CreateSession />}></Route>
          <Route path="/join-session" element={<JoinSession />}></Route>
          <Route path="/personalized-assistent" element={<PersonalAIAssistant />}></Route>
          <Route path="/room/:id" element={<LiveRoom />}></Route>


        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App