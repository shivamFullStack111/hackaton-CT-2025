/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react'
import { FaRegBell } from 'react-icons/fa'
import { Link, useLocation } from 'react-router-dom'
import { RxCross1, RxDashboard } from 'react-icons/rx'
import { motion } from 'framer-motion'

const Header = () => {
    const [isAnimateComplete, setisAnimateComplete] = useState(false)
    const location = useLocation()
    const isLandingPage = location.pathname === "/landing-page"

    useEffect(() => {
        if (isLandingPage) {
            const timer = setTimeout(() => {
                setisAnimateComplete(true)
            }, 4500)
            return () => clearTimeout(timer)
        }
    }, [isLandingPage])

    return (
        <>
            {isLandingPage && !isAnimateComplete && (
                <motion.div
                    initial={{ opacity: 1 }}
                    animate={{ opacity: 0 }}
                    transition={{ duration: 2, delay: 3 }}
                    className='fixed top-0 left-0 h-screen w-screen z-30 bg-dark-navy'
                />
            )}

            <div className='bg-dark-navy'>
                <div className='flex items-center justify-between p-2 w-full '>

                    {isLandingPage ? (
                        <motion.div
                            className='z-40'
                            initial={{ x: 600, y: 300, scale: 2 }}
                            animate={{ x: 0, y: 0, scale: 1 }}
                            transition={{ duration: 1, delay: 2 }}
                        >
                            <motion.div
                                initial={{ scale: 5 }}
                                animate={{ scale: 1 }}
                                transition={{ duration: 1 }}
                                className='flex gap-2 items-center'
                            >
                                <img className='h-14 object-contain rounded-full w-14' src="logo.png" alt="logo" />
                                <p className='text-2xl text-white font-extrabold'>SkillSync</p>
                            </motion.div>
                        </motion.div>
                    ) : (
                        <Link to={'/'} className='flex gap-2 items-center z-40'>
                            <img className='h-14 object-contain rounded-full w-14' src="logo.png" alt="logo" />
                            <p className='text-2xl text-white font-extrabold'>SkillSync</p>
                        </Link>
                    )}

                  <div className='flex gap-8 text-gray-400 '>
                        <Link to={'/'} className='hover:text-gray-300'>Home</Link>
                        <Link to={'/discover'} className='hover:text-gray-300'>Discover</Link>
                        <Link to={'/community'} className='hover:text-gray-300'>Community</Link>
                    </div>

                    {/* <div className='flex gap-4 items-center mr-4 '>
                        <Link to={'/sessions'} className=' p-2 bg-gray-600 text-white flex gap-2 items-center rounded-md hover:text-purple-500'><RxDashboard size={20} /> <p className='font-semibold text-sm text-gray-400'>Dashboard</p></Link>
                        <div
                            className='relative cursor-pointer  p-2 rounded-lg border border-purple-600'>
                            <FaRegBell className='text-purple-500'></FaRegBell>
                            <p className='text-center h-5 w-5 bg-teal rounded-full absolute -top-2 text-white text-sm -right-2'>1</p>
                        </div>
                    </div> */}

                    <div className='flex gap-4 items-center mr-4 '>
                        <Link to={'/login'} className='p-1 px-3 bg-purple-600 text-white rounded-md'>Login</Link>
                        {/* <Link to={'/register'} className='p-1 px-3 bg-gray-600 text-white rounded-md'>Register</Link> */}
                    </div>




                </div>
            </div>

       
        </>
    )
}

export default Header