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
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { setLoading, setUser } from './store/userSlice'

const App = () => {
   const { user } = useSelector(state => state.user)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(setLoading(true))
    const user = JSON.parse(localStorage.getItem('user'))
    if (user) {
      dispatch(setUser(user))
    }
    dispatch(setLoading(false))

  }, [])
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