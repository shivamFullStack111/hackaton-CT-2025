/* eslint-disable no-unused-vars */
import React, { useState } from 'react'
import Particles from '../../components/Particles'
import { Link } from 'react-router-dom'
import ResponsiveContainer from '../../components/ResponsiveContainer'
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import { FaGuitar, FaRegStar, FaStar } from "react-icons/fa";
import { IoLanguage } from "react-icons/io5";
import { LuCookingPot } from "react-icons/lu";
import { PiBagSimpleFill } from "react-icons/pi";
import { GrYoga } from "react-icons/gr";
import { FaChevronDown } from "react-icons/fa6";
import { CiLogout, CiStar } from "react-icons/ci";
import { motion } from 'framer-motion'
import Cookies from 'js-cookie'



const Home = () => {
    const [profileOptionsBarOpen, setprofileOptionsBarOpen] = useState(false)
    const handleLogOut = () => {
        alert("log out done")
    }
    return (
        <div className="min-h-screen   relative w-full flex ">
            {/* Background Particles */}
            <Particles
                className={"h-screen fixed top-0 right-0 w-full "}
                particleColors={["#ffffff", "#ffffff"]}
                particleCount={300}
                particleSpread={10}
                speed={0.3}
                particleBaseSize={100}
                alphaParticles={false}
                disableRotation={true}
            />

            <div className='w-full z-10'>
                {/* header  */}
                <Header></Header>

                <ResponsiveContainer>
                    {/* main banner  */}
                    <div className=' w-full my-12 '>
                        <div >
                            <div className='flex relative justify-between'>
                                <motion.div initial={{ y: -20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.5 }} className='text-4xl font-bold text-white'>Welcome back, Shivam🚀</motion.div>
                                <div>
                                    {/* profile button  */}
                                    <div className='relative '>
                                        <div onClick={() => setprofileOptionsBarOpen(p => !p)} className='flex absolute -top-6 cursor-pointer right-0 gap-2 items-center '>
                                            <img className='h-10 w-10 rounded-full' src="f1.png" alt="" />
                                            <div className='flex gap-2 items-center'>
                                                <p className='font-bold text-white'>Shivam</p>
                                                <motion.div initial={{ rotate: 0 }} transition={{ duration: 0.2 }} animate={{ rotate: profileOptionsBarOpen ? 180 : 0 }}>
                                                    <FaChevronDown className='text-white' />
                                                </motion.div>
                                            </div>
                                        </div>

                                        {/* profile options pop up */}
                                        <motion.div initial={{ height: 0, width: 0, opacity: 0 }} animate={{ height: profileOptionsBarOpen ? 110 : 0, width: profileOptionsBarOpen ? 300 : 0, opacity: profileOptionsBarOpen ? 1 : 0 }} className='absolute overflow-hidden w-72 h-60 bg-dark-navy rounded-2xl  right-0 top-5'>
                                            <div className='flex gap-2 p-2 items-center'>
                                                <img className='h-12 w-12' src="s3.png" alt="" />
                                                <p className='text-white font-bold text-lg'>Shivam</p>
                                            </div>
                                            <p className='border-b-2 border-gray-600'></p>
                                            <div onClick={handleLogOut} className='cursor-pointer p-2 flex items-center gap-3 text-gray-300 hover:text-red-400  '><CiLogout></CiLogout><p>Log out</p></div>
                                        </motion.div>
                                    </div>
                                </div>
                            </div>
                            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1, delay: 1 }} >
                                <p className='text-gray-300 font-semibold mt-6'>Ready to continue your journey!</p>
                                <p className='text-gray-300 font-semibold mt-1'>I’ll be glad to see your progress</p>
                            </motion.div>
                            <div className='flex items-center mt-6 gap-6'>
                                <motion.div initial={{ x: -50, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ duration: 1, delay: 1.3 }}>
                                    <Link to={'/create-session'} className='p-2 px-3 rounded-lg hover:bg-dark-teal bg-teal text-white text-sm font-semibold  '>Start a session</Link>
                                </motion.div>
                                <motion.div to initial={{ x: 50, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ duration: 1, delay: 1.3 }}>
                                    <Link to={'/join-session'} className='p-2 px-3  rounded-lg  hover:bg-purple-500 bg-purple-600 text-white text-sm font-semibold  '>Join a session</Link>
                                </motion.div>
                            </div>

                        </div>
                        {/* <img className='h-80 object-contain' src="connectedPeoples.png" alt="" /> */}
                    </div>



                </ResponsiveContainer>


                <div className='w-full bg-dark-navy'>
                    <ResponsiveContainer>
                        {/* categories  */}
                        <div className='bg-dark-navy py-5 justify-center  flex items-center gap-8'>
                            <motion.div className='text-gray-300 px-5 py-2 border-2 border-teal rounded-full font-semibold text-sm'>🚀You'we completed 3/5 weekly goals-keep going</motion.div>
                            <div className='text-gray-300 px-5 py-2 border-2 border-purple-600 rounded-full font-semibold text-sm flex gap-2 items-center'>
                                <IoLanguage size={20} className='text-purple-600' />
                                <p>Language</p>
                            </div>
                            <div className='text-gray-300 px-5 py-2 border-2 border-purple-600 rounded-full font-semibold text-sm flex gap-2 items-center'>
                                <FaGuitar size={20} className='text-purple-600' />
                                <p>Music</p>
                            </div>
                            <div className='text-gray-300 px-5 py-2 border-2 border-purple-600 rounded-full font-semibold text-sm flex gap-2 items-center'>
                                <LuCookingPot size={20} className='text-purple-600' />
                                <p>Cooking</p>
                            </div>
                            <div className='text-gray-300 px-5 py-2 border-2 border-purple-600 rounded-full font-semibold text-sm flex gap-2 items-center'>
                                <PiBagSimpleFill size={20} className='text-purple-600' />
                                <p>Bussiness</p>
                            </div>
                            <div className='text-gray-300 px-5 py-2 border-2 border-purple-600 rounded-full font-semibold text-sm flex gap-2 items-center'>
                                <GrYoga size={20} className='text-purple-600' />
                                <p>Yoga</p>
                            </div>

                        </div>
                    </ResponsiveContainer>
                </div>

                <ResponsiveContainer>
                    <div className='mt-12 '>
                        <p className='font-bold  text-lg text-white'>🔥 Recommended For You</p>
                        <div className='flex overflow-x-scroll hide-scrollbar scrollbar pb-4 gap-12 px-6'>
                            <div className='mt-4 min-w-[350px] !bg-dark-navy p-6 rounded-2xl gap-10  '>
                                <div className=' flex gap-3 '>
                                    <img className='h-16  w-16 rounded-full  ' src="ai.gif" alt="" />
                                    <div>
                                        <p className='font-bold text-lg text-white'>Personalized AI Assistent</p>
                                        <p className='font-semibold mt-1 text-sm text-gray-300'>Your intelligent companion for personalized learning </p>
                                        <p className='font-semibold  text-sm text-gray-300'>guidance and career path recommendations</p>
                                        <div className="flex gap-2 mt-4 mb-2">
                                            <span className="bg-gray-700 text-gray-300 px-2 py-1 rounded text-xs">Personalized</span>
                                            <span className="bg-gray-700 text-gray-300 px-2 py-1 rounded text-xs">Quick Access</span>
                                            <span className="bg-gray-700 text-gray-300 px-2 py-1 rounded text-xs">Roadmaps</span>
                                        </div>
                                    </div>
                                </div>
                                <div className='mt-2 w-full flex justify-between '>
                                    <div className='flex items-center gap-1'>
                                        <FaStar size={23} className='text-yellow-500' /><p className='text-sm font-semibold text-white'>4.5 (ratings)</p>
                                    </div>
                                    <Link to={"/personal-assistent"} className='bg-purple-600 px-6  ml-auto py-1 rounded-full text-white font-bold hover:scale-105 transition-all duration-300'>Join</Link>
                                </div>
                            </div>

                               <div className='mt-4 min-w-[350px] !bg-dark-navy p-6 rounded-2xl gap-10  '>
                                <div className=' flex gap-3 '>
                                    <img className='h-16  w-16 rounded-full  ' src="ai.gif" alt="" />
                                    <div>
                                        <p className='font-bold text-lg text-white'>Grammer Checker</p>
                                        <p className='font-semibold mt-1 text-sm text-gray-300'>Eliminate errors and enhance your impact, every time you write.</p>
                                        <p className='font-semibold  text-sm text-gray-300'>Improve your grammer</p>
                                        <div className="flex gap-2 mt-4 mb-2">
                                            <span className="bg-gray-700 text-gray-300 px-2 py-1 rounded text-xs">Writing Assistant</span>
                                            <span className="bg-gray-700 text-gray-300 px-2 py-1 rounded text-xs">Proofreading Tool</span>
                                        </div>
                                    </div>
                                </div>
                                <div className='mt-2 w-full flex justify-between '>
                                    <div className='flex items-center gap-1'>
                                        <FaStar size={23} className='text-yellow-500' /><p className='text-sm font-semibold text-white'>4.5 (ratings)</p>
                                    </div>
                                    <Link to={"/personal-assistent"} className='bg-purple-600 px-6  ml-auto py-1 rounded-full text-white font-bold hover:scale-105 transition-all duration-300'>Join</Link>
                                </div>
                            </div>
                        </div>
                  

                    </div>

                    <div className='mt-12 '>
                        <p className='font-bold  text-lg text-white'>🔥 Open Rooms</p>
                        <div className='flex pt-3 overflow-x-scroll hide-scrollbar scrollbar pb-4 gap-12 px-6'>


                            <div className="bg-gray-750 bg-dark-navy rounded-xl p-6 border min-w-[500px] border-gray-600 hover:border-purple-500 transition-colors duration-200">
                                <div className="flex justify-between items-start mb-4">
                                    <div>
                                        <h3 className="text-white text-xl font-semibold mb-2">Advanced Mathematics Workshop</h3>
                                        <p className="text-gray-400 text-sm">Dr. Shivam</p>
                                    </div>
                                    <span className="bg-green-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                                        Live
                                    </span>
                                </div>

                                <div className="flex items-center justify-between text-gray-300 text-sm mb-4">
                                    <div className="flex items-center gap-4">
                                        <span>🔴 45/50 joined</span>
                                        <span>⏱️ 30 mins left</span>
                                    </div>
                                    <span className="text-purple-400 font-semibold">#X7B9-K2M4</span>
                                </div>

                                <div className="flex gap-2 mb-4">
                                    <span className="bg-gray-700 text-gray-300 px-2 py-1 rounded text-xs">Whiteboard</span>
                                    <span className="bg-gray-700 text-gray-300 px-2 py-1 rounded text-xs">Code Editor</span>
                                    <span className="bg-gray-700 text-gray-300 px-2 py-1 rounded text-xs">Live Chat</span>
                                </div>
                                <Link to={'/join-session'}>
                                    <button className="w-full bg-purple-600 text-white py-3 rounded-lg hover:bg-purple-700 transition-colors duration-200 font-semibold">
                                        Join Session
                                    </button>
                                </Link>
                            </div>


                            <div className="bg-gray-750 bg-dark-navy rounded-xl p-6 border min-w-[500px] border-gray-600 hover:border-purple-500 transition-colors duration-200">
                                <div className="flex justify-between items-start mb-4">
                                    <div>
                                        <h3 className="text-white text-xl font-semibold mb-2">Advanced Mathematics Workshop</h3>
                                        <p className="text-gray-400 text-sm">Dr. Shivam</p>
                                    </div>
                                    <span className="bg-green-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                                        Live
                                    </span>
                                </div>

                                <div className="flex items-center justify-between text-gray-300 text-sm mb-4">
                                    <div className="flex items-center gap-4">
                                        <span>🔴 45/50 joined</span>
                                        <span>⏱️ 30 mins left</span>
                                    </div>
                                    <span className="text-purple-400 font-semibold">#X7B9-K2M4</span>
                                </div>

                                <div className="flex gap-2 mb-4">
                                    <span className="bg-gray-700 text-gray-300 px-2 py-1 rounded text-xs">Whiteboard</span>
                                    <span className="bg-gray-700 text-gray-300 px-2 py-1 rounded text-xs">Code Editor</span>
                                    <span className="bg-gray-700 text-gray-300 px-2 py-1 rounded text-xs">Live Chat</span>
                                </div>
                                <Link to={'/join-session'}>
                                    <button className="w-full bg-purple-600 text-white py-3 rounded-lg hover:bg-purple-700 transition-colors duration-200 font-semibold">
                                        Join Session
                                    </button>
                                </Link>
                            </div>
                            <div className="bg-gray-750 bg-dark-navy rounded-xl p-6 border min-w-[500px] border-gray-600 hover:border-purple-500 transition-colors duration-200">
                                <div className="flex justify-between items-start mb-4">
                                    <div>
                                        <h3 className="text-white text-xl font-semibold mb-2">Advanced Mathematics Workshop</h3>
                                        <p className="text-gray-400 text-sm">Dr. Shivam</p>
                                    </div>
                                    <span className="bg-green-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                                        Live
                                    </span>
                                </div>

                                <div className="flex items-center justify-between text-gray-300 text-sm mb-4">
                                    <div className="flex items-center gap-4">
                                        <span>🔴 45/50 joined</span>
                                        <span>⏱️ 30 mins left</span>
                                    </div>
                                    <span className="text-purple-400 font-semibold">#X7B9-K2M4</span>
                                </div>

                                <div className="flex gap-2 mb-4">
                                    <span className="bg-gray-700 text-gray-300 px-2 py-1 rounded text-xs">Whiteboard</span>
                                    <span className="bg-gray-700 text-gray-300 px-2 py-1 rounded text-xs">Code Editor</span>
                                    <span className="bg-gray-700 text-gray-300 px-2 py-1 rounded text-xs">Live Chat</span>
                                </div>
                                <Link to={'/join-session'}>
                                    <button className="w-full bg-purple-600 text-white py-3 rounded-lg hover:bg-purple-700 transition-colors duration-200 font-semibold">
                                        Join Session
                                    </button>
                                </Link>
                            </div>
                            <div className="bg-gray-750 bg-dark-navy rounded-xl p-6 border min-w-[500px] border-gray-600 hover:border-purple-500 transition-colors duration-200">
                                <div className="flex justify-between items-start mb-4">
                                    <div>
                                        <h3 className="text-white text-xl font-semibold mb-2">Advanced Mathematics Workshop</h3>
                                        <p className="text-gray-400 text-sm">Dr. Shivam</p>
                                    </div>
                                    <span className="bg-green-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                                        Live
                                    </span>
                                </div>

                                <div className="flex items-center justify-between text-gray-300 text-sm mb-4">
                                    <div className="flex items-center gap-4">
                                        <span>🔴 45/50 joined</span>
                                        <span>⏱️ 30 mins left</span>
                                    </div>
                                    <span className="text-purple-400 font-semibold">#X7B9-K2M4</span>
                                </div>

                                <div className="flex gap-2 mb-4">
                                    <span className="bg-gray-700 text-gray-300 px-2 py-1 rounded text-xs">Whiteboard</span>
                                    <span className="bg-gray-700 text-gray-300 px-2 py-1 rounded text-xs">Code Editor</span>
                                    <span className="bg-gray-700 text-gray-300 px-2 py-1 rounded text-xs">Live Chat</span>
                                </div>
                                <Link to={'/join-session'}>
                                    <button className="w-full bg-purple-600 text-white py-3 rounded-lg hover:bg-purple-700 transition-colors duration-200 font-semibold">
                                        Join Session
                                    </button>
                                </Link>
                            </div>



                        </div>
                    </div>
                </ResponsiveContainer>




                <Footer></Footer>

            </div>


        </div>
    )
}

export default Home