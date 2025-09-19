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



const Home = () => {
    const [profileOptionsBarOpen, setprofileOptionsBarOpen] = useState(false)
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
                                <p className='text-4xl font-bold text-white'>Welcome back, Shivam🚀</p>
                                <div>
                                    {/* profile button  */}
                                    <div className='relative '>
                                        <div onClick={() => setprofileOptionsBarOpen(p => !p)} className='flex absolute -top-6 cursor-pointer right-0 gap-2 items-center '>
                                            <img className='h-10 w-10 rounded-full' src="f1.png" alt="" />
                                            <div className='flex gap-2 items-center'>
                                                <p className='font-bold text-white'>Shivam</p>
                                                <motion.div initial={{rotate:0}} transition={{duration:0.2}} animate={{rotate:profileOptionsBarOpen?180:0}}>
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
                                            <div className='cursor-pointer p-2 flex items-center gap-3 text-gray-300 hover:text-red-400  '><CiLogout></CiLogout><p>Log out</p></div>
                                        </motion.div>
                                    </div>
                                </div>
                            </div>
                            <p className='text-gray-300 font-semibold mt-6'>Ready to continue your journey!</p>
                            <p className='text-gray-300 font-semibold mt-1'>I’ll be glad to see your progress</p>
                            <button className='p-2 px-3 mt-6 rounded-lg hover:bg-dark-teal bg-teal text-white text-sm font-semibold  '>Start a session</button>
                            <button className='p-2 px-3  rounded-lg ml-8 hover:bg-purple-500 bg-purple-600 text-white text-sm font-semibold  '>Join a session</button>

                        </div>
                        {/* <img className='h-80 object-contain' src="connectedPeoples.png" alt="" /> */}
                    </div>



                </ResponsiveContainer>


                <div className='w-full bg-dark-navy'>
                    <ResponsiveContainer>
                        {/* categories  */}
                        <div className='bg-dark-navy py-5 justify-center  flex items-center gap-8'>
                            <div className='text-gray-300 px-5 py-2 border-2 border-teal rounded-full font-semibold text-sm'>🚀You'we completed 3/5 weekly goals-keep going</div>
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
                    {/* Recommendations  */}
                    <div className='mt-12 '>
                        <p className='font-bold  text-lg text-white'>🔥 Recommended For You</p>
                        <div className='flex overflow-x-scroll hide-scrollbar scrollbar pb-4 gap-12 px-6'>
                            <div className='mt-4 min-w-[350px] !bg-dark-navy p-6 rounded-2xl gap-10  '>
                                <div className=' flex gap-3 '>
                                    <img className='h-16  w-16 rounded-full  ' src="s3.png" alt="" />
                                    <div>
                                        <p className='font-bold text-lg text-white'>Ai Mentor</p>
                                        <p className='font-semibold mt-1 text-sm text-gray-300'>Practice your speaking with AI Available Anytime</p>
                                    </div>
                                </div>
                                <div className='mt-2 w-full flex justify-between '>
                                    <div className='flex items-center gap-1'>
                                        <FaStar size={23} className='text-yellow-500' /><p className='text-sm font-semibold text-white'>4.5 (ratings)</p>
                                    </div>
                                    <button className='bg-purple-600 px-6  ml-auto py-1 rounded-full text-white font-bold hover:scale-105 transition-all duration-300'>Join</button>
                                </div>



                            </div>
                            <div className='mt-4 min-w-[350px] !bg-dark-navy p-6 rounded-2xl gap-10  '>
                                <div className=' flex gap-3 '>
                                    <img className='h-16  w-16 rounded-full  ' src="s3.png" alt="" />
                                    <div>
                                        <p className='font-bold text-lg text-white'>Ai Mentor</p>
                                        <p className='font-semibold mt-1 text-sm text-gray-300'>Practice your speaking with AI Available Anytime</p>
                                    </div>
                                </div>
                                <div className='mt-2 w-full flex justify-between '>
                                    <div className='flex items-center gap-1'>
                                        <FaStar size={23} className='text-yellow-500' /><p className='text-sm font-semibold text-white'>4.5 (ratings)</p>
                                    </div>
                                    <button className='bg-purple-600 px-6  ml-auto py-1 rounded-full text-white font-bold hover:scale-105 transition-all duration-300'>Join</button>
                                </div>



                            </div>
                            <div className='mt-4 min-w-[350px] !bg-dark-navy p-6 rounded-2xl gap-10  '>
                                <div className=' flex gap-3 '>
                                    <img className='h-16  w-16 rounded-full  ' src="s3.png" alt="" />
                                    <div>
                                        <p className='font-bold text-lg text-white'>Ai Mentor</p>
                                        <p className='font-semibold mt-1 text-sm text-gray-300'>Practice your speaking with AI Available Anytime</p>
                                    </div>
                                </div>
                                <div className='mt-2 w-full flex justify-between '>
                                    <div className='flex items-center gap-1'>
                                        <FaStar size={23} className='text-yellow-500' /><p className='text-sm font-semibold text-white'>4.5 (ratings)</p>
                                    </div>
                                    <button className='bg-purple-600 px-6  ml-auto py-1 rounded-full text-white font-bold hover:scale-105 transition-all duration-300'>Join</button>
                                </div>



                            </div>
                            <div className='mt-4 min-w-[350px] !bg-dark-navy p-6 rounded-2xl gap-10  '>
                                <div className=' flex gap-3 '>
                                    <img className='h-16  w-16 rounded-full  ' src="s3.png" alt="" />
                                    <div>
                                        <p className='font-bold text-lg text-white'>Ai Mentor</p>
                                        <p className='font-semibold mt-1 text-sm text-gray-300'>Practice your speaking with AI Available Anytime</p>
                                    </div>
                                </div>
                                <div className='mt-2 w-full flex justify-between '>
                                    <div className='flex items-center gap-1'>
                                        <FaStar size={23} className='text-yellow-500' /><p className='text-sm font-semibold text-white'>4.5 (ratings)</p>
                                    </div>
                                    <button className='bg-purple-600 px-6  ml-auto py-1 rounded-full text-white font-bold hover:scale-105 transition-all duration-300'>Join</button>
                                </div>



                            </div>
                        </div>
                    </div>

                    {/* open Rooms  */}
                    <div className='mt-12 '>
                        <p className='font-bold  text-lg text-white'>🔥 Open Rooms</p>
                        <div className='flex overflow-x-scroll hide-scrollbar scrollbar pb-4 gap-12 px-6'>
                            <div className='mt-4 min-w-[350px] !bg-dark-navy p-6 rounded-2xl gap-10  '>
                                <div className=' flex gap-3 '>
                                    <img className='h-16  w-16 rounded-full  ' src="s3.png" alt="" />
                                    <div>
                                        <p className='font-bold text-lg text-white'>Ai Mentor</p>
                                        <p className='font-semibold mt-1 text-sm text-gray-300'>Practice your speaking with AI Available Anytime</p>
                                    </div>
                                </div>
                                <div className='mt-2 w-full flex justify-between '>
                                    <div className='flex items-center gap-1'>
                                        <FaStar size={23} className='text-yellow-500' /><p className='text-sm font-semibold text-white'>4.5 (ratings)</p>
                                    </div>
                                    <button className='bg-purple-600 px-6  ml-auto py-1 rounded-full text-white font-bold hover:scale-105 transition-all duration-300'>Join</button>
                                </div>



                            </div>
                            <div className='mt-4 min-w-[350px] !bg-dark-navy p-6 rounded-2xl gap-10  '>
                                <div className=' flex gap-3 '>
                                    <img className='h-16  w-16 rounded-full  ' src="s3.png" alt="" />
                                    <div>
                                        <p className='font-bold text-lg text-white'>Ai Mentor</p>
                                        <p className='font-semibold mt-1 text-sm text-gray-300'>Practice your speaking with AI Available Anytime</p>
                                    </div>
                                </div>
                                <div className='mt-2 w-full flex justify-between '>
                                    <div className='flex items-center gap-1'>
                                        <FaStar size={23} className='text-yellow-500' /><p className='text-sm font-semibold text-white'>4.5 (ratings)</p>
                                    </div>
                                    <button className='bg-purple-600 px-6  ml-auto py-1 rounded-full text-white font-bold hover:scale-105 transition-all duration-300'>Join</button>
                                </div>



                            </div>
                            <div className='mt-4 min-w-[350px] !bg-dark-navy p-6 rounded-2xl gap-10  '>
                                <div className=' flex gap-3 '>
                                    <img className='h-16  w-16 rounded-full  ' src="s3.png" alt="" />
                                    <div>
                                        <p className='font-bold text-lg text-white'>Ai Mentor</p>
                                        <p className='font-semibold mt-1 text-sm text-gray-300'>Practice your speaking with AI Available Anytime</p>
                                    </div>
                                </div>
                                <div className='mt-2 w-full flex justify-between '>
                                    <div className='flex items-center gap-1'>
                                        <FaStar size={23} className='text-yellow-500' /><p className='text-sm font-semibold text-white'>4.5 (ratings)</p>
                                    </div>
                                    <button className='bg-purple-600 px-6  ml-auto py-1 rounded-full text-white font-bold hover:scale-105 transition-all duration-300'>Join</button>
                                </div>



                            </div>
                            <div className='mt-4 min-w-[350px] !bg-dark-navy p-6 rounded-2xl gap-10  '>
                                <div className=' flex gap-3 '>
                                    <img className='h-16  w-16 rounded-full  ' src="s3.png" alt="" />
                                    <div>
                                        <p className='font-bold text-lg text-white'>Ai Mentor</p>
                                        <p className='font-semibold mt-1 text-sm text-gray-300'>Practice your speaking with AI Available Anytime</p>
                                    </div>
                                </div>
                                <div className='mt-2 w-full flex justify-between '>
                                    <div className='flex items-center gap-1'>
                                        <FaStar size={23} className='text-yellow-500' /><p className='text-sm font-semibold text-white'>4.5 (ratings)</p>
                                    </div>
                                    <button className='bg-purple-600 px-6  ml-auto py-1 rounded-full text-white font-bold hover:scale-105 transition-all duration-300'>Join</button>
                                </div>



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