import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Footer from '../components/Footer'
import { motion } from 'framer-motion'
import { Typewriter } from "react-simple-typewriter";
import Particles from '../components/Particles'
import ResponsiveContainer from '../components/ResponsiveContainer'
import Header from '../components/Header';


const LandingPage = () => {
    // const [animationDone, setanimationDone] = useState(false)


    // useEffect(() => {
    //     setTimeout(() => {
    //         setanimationDone(true)
    //     }, 1500);
    // }, [])
    return (
        <div className="min-h-screen   relative w-full flex ">
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
                {/* {animationDone && <> */}
                    {/* this for responsiveness */}
                    < ResponsiveContainer >
                        <div className='flex w-full   justify-between items-center  mt-10 '>
                            <motion.div initial={{ y: 100, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 1, delay: 3 }} >
                                <div className='text-2xl font-bold text-yellow-400 '>
                                    <p className='text-white inline'>SkillSync:</p>{" "}
                                    <Typewriter
                                        words={["Start Learning", "Start Teaching", "Start Growing"]}
                                        loop={0}
                                        cursor
                                        cursorStyle="|"

                                        typeSpeed={90}
                                        deleteSpeed={50}
                                        delaySpeed={1000}
                                    />
                                </div>
                                <p className='text-gray-300 font-semibold mt-2'>Unlock your potential with interactive live</p>
                                <p className='text-gray-300 font-semibold'>AI-powered personalized learning</p>
                                <button className='p-2 px-3 mt-8 rounded-lg animate-bounce hover:bg-dark-teal bg-teal text-white text-sm font-semibold  '>Start Your Journey</button>
                            </motion.div>
                            <motion.div initial={{ scale: 0, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: 1.5, delay: 3 }}>
                                <img className='h-72 object-contain' src="4person1.png" alt="" />
                            </motion.div>
                        </div>

                        <div className='mt-6'>
                            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1, delay: 4 }} className='font-bold text-lg text-white'>Key Features</motion.div>
                            <div className='flex mt-2 justify-between items-center'>
                                <motion.div initial={{ y: 100, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 1, delay: 4.2 }} className='bg-dark-navy  text-white p-3 rounded-xl w-[350px]'>
                                    <div className='flex items-center gap-3 '>
                                        <div className=''>
                                            <img className='h-16 w-16' src="f1.png" alt="" />
                                        </div>
                                        <div className='font-semibold text-lg'>
                                            Live
                                            Interactive
                                            Sessions
                                        </div>
                                    </div>
                                    <p className='mt-6 text-gray-300'>Personalized Feedback:
                                        audio-video, text chat with small
                                        group, global feedback
                                    </p>
                                </motion.div>
                                <motion.div initial={{ y: 100, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 1, delay: 4.4 }} className='bg-dark-navy mt-2 text-white p-3 rounded-xl w-[350px]'>
                                    <div className='flex items-center gap-3 '>
                                        <div className=''>
                                            <img className='h-16 w-16' src="f2.png" alt="" />
                                        </div>
                                        <div className='font-semibold text-lg'>
                                            AI-Powered
                                            Analytics
                                        </div>
                                    </div>
                                    <div className='flex gap-3 mt-6 items-center'>
                                        <img src="f2b.png" className='h-16 object-contain w-16' alt="" />
                                        <p className=' text-gray-300'>Speech Correction
                                            progress, personalized
                                            reports
                                        </p>
                                    </div>
                                </motion.div>
                                {/* 3 feature  */}
                                <motion.div initial={{ y: 100, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 1, delay: 4.6 }} className='bg-dark-navy mt-2 text-white p-3 rounded-xl w-[350px]'>
                                    <div className='flex items-center gap-3 '>
                                        <div className=''>
                                            <img className='h-16 w-16' src="f3.png" alt="" />
                                        </div>
                                        <div className='font-semibold text-lg'>
                                            Connect
                                            Worldwide
                                        </div>
                                    </div>
                                    <div className='flex gap-3 mt-6 items-center'>
                                        <img src="f3b.png" className='h-16 object-contain w-16' alt="" />
                                        <p className=' text-gray-300'>Peer explained topics
                                            Choose your people
                                        </p>
                                    </div>

                                </motion.div>
                            </div>
                        </div>

                        <div className='my-12'>
                            <p className='font-bold text-lg  text-white'>Subjects for everyone</p>
                            <div className='p-8 mt-2 flex justify-between rounded-2xl bg-dark-navy'>
                                <div className='flex items-center gap-16'>

                                    <div className='flex gap-3 items-center'>
                                        <div className='flex flex-col gap-1 items-center'>
                                            <img className='h-14 w-14 object-contain' src="s1.png" alt="" />
                                            <p className='text-sm font-semibold text-white'>Language</p>
                                        </div>
                                    </div>
                                    <div className='flex gap-3 items-center'>
                                        <div className='flex flex-col gap-1 items-center'>
                                            <img className='h-14 w-14 object-contain' src="s2.png" alt="" />
                                            <p className='text-sm font-semibold text-white'>Coding</p>
                                        </div>
                                    </div>
                                    <div className='flex gap-3 items-center'>
                                        <div className='flex flex-col gap-1 items-center'>
                                            <img className='h-14 w-14 object-contain' src="s3.png" alt="" />
                                            <p className='text-sm font-semibold text-white'>Digital Art</p>
                                        </div>
                                    </div>
                                    <div className='flex gap-3 items-center'>
                                        <div className='flex flex-col gap-1 items-center'>
                                            <img className='h-14 w-14 object-contain' src="s4.png" alt="" />
                                            <p className='text-sm font-semibold text-white'>Cooking</p>
                                        </div>
                                    </div>
                                    <div className='flex gap-3 items-center'>
                                        <div className='flex flex-col gap-1 items-center'>
                                            <img className='h-14 w-14 object-contain' src="s5.png" alt="" />
                                            <p className='text-sm font-semibold text-white'>Bussiness Skills</p>
                                        </div>
                                    </div>
                                    <div className='flex gap-3 items-center'>
                                        <div className='flex flex-col gap-1 items-center'>
                                            <img className='h-14 w-14 object-contain' src="s6.png" alt="" />
                                            <p className='text-sm font-semibold text-white'>Yoga</p>
                                        </div>
                                    </div>
                                </div>
                                <div className='flex flex-col justify-center gap-2'>
                                    <p className='text-white font-bold text-xl'>Join SkillSync Today!</p>
                                    <div className='flex gap-5 '>
                                        <Link className='px-4 p-2 font-semibold hover:scale-105 transition-all duration-300 text-sm bg-teal text-white rounded-lg'>Join</Link>
                                        <Link className='px-4 p-2 font-semibold text-sm border transition-all duration-300  hover:scale-105 border-purple-600  text-white rounded-lg'>Know more</Link>

                                    </div>
                                </div>
                            </div>
                        </div>
                    </ResponsiveContainer>
                    <Footer></Footer>
                    {/* </>  } */}
            </div>
        </div >
    )
}

export default LandingPage