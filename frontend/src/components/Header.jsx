import React, { useEffect, useState } from 'react'
import { FaRegBell } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import { RxCross1 } from 'react-icons/rx'
import { motion, scale } from 'framer-motion'

const Header = () => {
    const [notificationSideBarOpen, setnotificationSideBarOpen] = useState(false)
    const [isAnimateComplete, setisAnimateComplete] = useState(false)

    useEffect(() => {
        setTimeout(() => {
            setisAnimateComplete(true)
        }, 4500)
    }, [])

    return (
        <>
            {!isAnimateComplete && <motion.div initial={{ opacity: 1 }} animate={{ opacity: 0 }} transition={{ duration: 2, delay: 3 }} className='fixed top-0 left-0 h-screen w-screen z-30 bg-dark-navy'></motion.div>}
            <div className='bg-dark-navy'>
                <div className=' flex items-center justify-between p-2 w-full '>
                    <motion.dev className='z-40' initial={{ x: 600, y: 300, scale: 2 }} animate={{ x: 0, y: 0, scale: 1 }} transition={{ duration: 1, delay: 2 }} >
                        <motion.dev initial={{ scale: 5 }} animate={{ scale: 1 }} transition={{ duration: 1 }} className='flex gap-2 items-center'>
                            <img className='h-14 object-contain rounded-full w-14' src="logo.png" alt="logo" />
                            <p className='text-2xl text-white font-extrabold'>SkillSync</p>
                        </motion.dev>
                    </motion.dev>
                    <div className='flex gap-8 text-gray-400 '>
                        <Link to={'/'} className='hover:text-gray-300'>Home</Link>
                        <Link to={'/discover'} className='hover:text-gray-300'>Discover</Link>
                        <Link to={'/community'} className='hover:text-gray-300'>Community</Link>
                    </div>
                    <div className='flex gap-4 items-center mr-4 '>
                        {/* if not logged in  */}
                        <>
                            <Link to={'/login'} className='p-1 px-3 bg-purple-600 text-white rounded-md'>Login</Link>
                            <Link to={'/register'} className='p-1 px-3 bg-gray-600 text-white rounded-md'>Register</Link>
                        </>

                        {/* if logged in  */}
                        {/* <>
                            <Link to={'/sessions'} className='p-1 px-3 bg-gray-600 text-white rounded-md'>Sessions</Link>
                            <div onClick={() => setnotificationSideBarOpen(p => !p)} className='relative cursor-pointer  p-2 rounded-lg border border-purple-600'>
                                <FaRegBell className='text-purple-500'></FaRegBell>
                                <p className='text-center h-5 w-5 bg-teal rounded-full absolute -top-2 text-white text-sm -right-2'>1</p>
                            </div>

                        </> */}

                    </div>
                </div>
            </div>



            {/* notification sidebar  */}
            <motion.div initial={{ x: 500 }} animate={{ x: notificationSideBarOpen ? 0 : 500 }} transition={{ type: "tween" }} className='fixed h-full w-[350px] bg-dark-navy z-30 right-0 top-0 p-4'>
                <RxCross1 onClick={() => setnotificationSideBarOpen(false)} className='text-xl text-white hover:text-red-500 cursor-pointer hover:scale-110'></RxCross1>
                <div className='flex flex-col w-full gap-4 mt-8'>
                    <div className='flex p-2 gap-3'>
                        <img className='h-10 w-10 ' src="s3.png" alt="" />
                        <div>
                            <p className='font-bold text-white '>Class Invitation</p>
                            <p className='text-gray-400 text-sm'>Shivam, Invites you to join class</p>
                        </div>
                    </div>  <div className='flex p-2 gap-3'>
                        <img className='h-10 w-10 ' src="s3.png" alt="" />
                        <div>
                            <p className='font-bold text-white '>Class Invitation</p>
                            <p className='text-gray-400 text-sm'>Shivam, Invites you to join class</p>
                        </div>
                    </div>
                    <div className='flex p-2 gap-3'>
                        <img className='h-10 w-10 ' src="s3.png" alt="" />
                        <div>
                            <p className='font-bold text-white '>Class Invitation</p>
                            <p className='text-gray-400 text-sm'>Shivam, Invites you to join class</p>
                        </div>
                    </div>
                    <div className='flex p-2 gap-3'>
                        <img className='h-10 w-10 ' src="s3.png" alt="" />
                        <div>
                            <p className='font-bold text-white '>Class Invitation</p>
                            <p className='text-gray-400 text-sm'>Shivam, Invites you to join class</p>
                        </div>
                    </div>

                </div>
            </motion.div>
        </>
    )
}

export default Header