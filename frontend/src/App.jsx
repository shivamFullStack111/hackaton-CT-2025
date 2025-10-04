import React from 'react'
import { Routes, Route, BrowserRouter } from "react-router-dom"
import Login from './pages/Login'
import Register from './pages/Register'
import LandingPage from './pages/LandingPage'
import CreateSession from './pages/createSession/CreateSession'
import JoinSession from './pages/joinSession/JoinSession'
import PersonalAIAssistant from './pages/personalizedAssistent/PersonalizedAssistent'
import LiveRoom from './pages/liveRoom/LiveRoom'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { setLoading, setUser } from './store/userSlice'
import IfLogedOut from './routes/IfLogedOut'
import IfLogedIn from './routes/IfLogedIn'
import Home from "./pages/Home/Home"


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
          {/* protected route if loged out */}


            <Route path="/" element={<LandingPage />}></Route>
            <Route path="/login" element={<Login />}></Route>
            <Route path="/register" element={<Register />}></Route>
            <Route path="/home" element={<Home />}></Route>

          {/* protected routes if loggedin */}
          <Route element={<IfLogedIn />}>
            <Route path="/create-session" element={<CreateSession />}></Route>
            <Route path="/join-session" element={<JoinSession />}></Route>
            <Route path="/personal-assistent" element={<PersonalAIAssistant />}></Route>
            <Route path="/room/:id" element={<LiveRoom />}></Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App