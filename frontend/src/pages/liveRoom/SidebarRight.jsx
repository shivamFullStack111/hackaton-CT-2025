/* eslint-disable no-unused-vars */
import React, { useState } from 'react'
import { IoExitOutline, IoSend } from 'react-icons/io5'
import { MdQuiz, MdReviews } from 'react-icons/md'
import { motion } from 'framer-motion'
import { FaCode, FaRegMessage } from 'react-icons/fa6'
import { FaChalkboardTeacher } from "react-icons/fa";
import { useSelector } from 'react-redux'


const SidebarRight = ({ currentPage, setcurrentPage, handleSendMessage, allLiveChatMessages, setallLiveChatMessages }) => {
    const [barNumber, setbarNumber] = useState(0)
    const [inputValue, setinputValue] = useState('')

    return (
        <div className='flex  '>
            {/* live chats  */}
            <motion.div initial={{ width: 0, opacity: 0 }} animate={{ width: barNumber == 1 ? 350 : 0, opacity: barNumber == 1 ? 1 : 0 }} transition={{ duration: 0.4 }} className={`w-72 relative overflow-hidden  bg-[#1c1e2ad4] ${barNumber == 1 && " p-3"} `}>
                <div className='flex hap-2 justify-center min-w-[350px] items-center gap-2   '>
                    <img className='h-16 w-16' src="/public/chat.png" alt="" />
                    <p className='font-bold text-gray-300'>Live Chat ✨</p>
                </div>
                {/* messages  */}
                <div className='border-2  h-[95%] gap-2 flex flex-col scrollbar p-5 mt-2 overflow-y-auto border-gray-700 rounded-t-[35px]'>
                    <>
                        <div className='flex gap-2'>
                            <img className='min-h-6 max-h-6 min-w-6 max-w-6 rounded-full' src="/public/logo.png" alt="" />
                            <div className='text-sm max-w-[80%] min-w-[50%] text-white bg-gray-600 p-2 rounded-xl '>
                                <p className='text-[12px] text-green-500'>Shivam</p>
                                <p>
                                    Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quia facilis possimus repudiandae ullam. Tempora deleniti cum nostrum et corrupti ullam?
                                </p>
                            </div>
                        </div>
                        <div className='flex   gap-2'>
                            <div className='text-sm ml-auto max-w-[80%] min-w-[50%] text-gray-800 bg-purple-300 p-2 rounded-xl '>
                                <p>
                                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Sapiente, cupiditate.                                      </p>
                            </div>
                        </div>



                    </>
                </div>
                <div className='absolute w-full h-14 p-2 px-4  bottom-0 left-0 '>
                    <div className='flex items-center  border-2 rounded-lg overflow-hidden border-gray-600 justify-center h-full w-full '>
                        <input value={inputValue} onChange={(e) => setinputValue(e.target.value)} className='outline-none  px-2 backdrop-blur-sm bg-dark-navy text-gray-200 w-[85%] rounded-l-lg h-full ' type="text" name="" id="" />
                        <div onClick={() => {

                            setinputValue('')

                        }} className=' flex justify-center items-center text-green-500 bg-dark-purple  rounded-r-lg w-[15%] h-full'>
                            <IoSend size={25}></IoSend>
                        </div>
                    </div>
                </div>



            </motion.div>
            <div className="flex gap-4 flex-col  py-4 bg-dark-navy ">
                <div onClick={() => setcurrentPage('whiteboard')} className={`text-white  ${currentPage == "whiteboard" && " !text-purple-500 "} flex  cursor-pointer    justify-center p-4`}>
                    <FaChalkboardTeacher title='Whiteboard' className="text-3xl"></FaChalkboardTeacher>
                </div>
                <div onClick={() => setcurrentPage('editor')} className={`text-white  ${currentPage == "editor" && " !text-purple-500 "} flex cursor-pointer  border-r-4  text-white border-dark-navy justify-center p-4`}>
                    <FaCode title="Code Editor" className="text-3xl"></FaCode >
                </div>

                <div className='mt-auto'>
                    <div onClick={() => setcurrentPage("quiz")} className={`flex  mt-auto cursor-pointer  text-white   ${currentPage == "quiz" && " !text-purple-500 "}  justify-center p-4`}>
                        <MdQuiz title='Quiz Test' className="text-3xl"></MdQuiz>
                    </div>
                    <div onClick={() => setbarNumber(p => (p == 1 ? 0 : 1))} className="flex mt-auto cursor-pointer  text-white  justify-center p-4">
                        <FaRegMessage title='Live Chats' className="text-3xl"></FaRegMessage>
                    </div>
                </div>

            </div>

        </div>
    )
}

export default SidebarRight