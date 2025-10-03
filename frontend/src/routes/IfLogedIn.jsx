import React from 'react'
import { useSelector } from 'react-redux'
import Loader from '../components/Loader'
import { Navigate, Outlet } from 'react-router-dom'

const IfLogedIn = () => {
    const { user, isLoading } = useSelector(state => state.user)

    if (isLoading) {
        return <Loader />
    } else {
        if (!user) {
            return <Navigate to={'/login'} />
        } else {
            return <Outlet />
        }
    }


}

export default IfLogedIn