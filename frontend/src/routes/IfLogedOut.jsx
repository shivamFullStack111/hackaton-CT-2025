import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate, Outlet } from 'react-router-dom'
import Loader from '../components/Loader'

const IfLogedOut = () => {
    const { user ,isLoading} = useSelector(state => state.user)

   if(isLoading){
    return <Loader/>
   }else{
    if(user){
        return <Navigate to={'/'}/>
    }else{
        return <Outlet/>
    }
   }


}

export default IfLogedOut