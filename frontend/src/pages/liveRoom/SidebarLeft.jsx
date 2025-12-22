/* eslint-disable no-unused-vars */
import React, { useState } from 'react'
import { IoExitOutline } from 'react-icons/io5'
import { MdReviews } from 'react-icons/md'
import { motion } from 'framer-motion'
import { GrNotes } from "react-icons/gr";
import { RiAiGenerate2 } from "react-icons/ri";
import { useSelector } from 'react-redux';
import { BsSendFill } from "react-icons/bs";



const SidebarLeft = ({ roomData }) => {
    const [barNumber, setbarNumber] = useState(0)
    const [exitRoomPopUpOpen, setexitRoomPopUpOpen] = useState(false)
    const [isReviewOpen, setisReviewOpen] = useState(false)
    const { user } = useSelector(state => state.user)

    return (
        <>
            {/* exit room pop up  */}
            <motion.div initial={{ display: 'none' }} transition={{ delay: exitRoomPopUpOpen ? 0 : 0 }} animate={{ display: exitRoomPopUpOpen ? 'flex' : "none" }} className='absolute top-0 w-full h-full left-0 z-50  bg-[#0000005a] flex justify-center items-center '>
                <motion.div initial={{ scale: 0 }} transition={{ duration: 0.3 }} animate={{ scale: exitRoomPopUpOpen ? 1 : 0 }} className='rounded-xl shadow-xl px-10 bg-white py-4'>
                    <p className='font-bold text-xl'>Are you sure? you want to leave room</p>
                    <div className='flex mt-6 justify-end gap-5 items-center'>
                        <button onClick={() => setexitRoomPopUpOpen(false)} className='px-6 py-1 hover:scale-110 duration-200 rounded-lg border-2 text-purple-500 border-purple-500  '>No</button>
                        <button className='px-6 py-1 hover:scale-110 duration-200   rounded-lg text-white border-2 border-purple-500  bg-purple-600'>Yes</button>
                    </div>
                </motion.div>
            </motion.div>

            <div className='flex  '>
                <div className="flex gap-4 flex-col  py-4 bg-dark-navy ">
                    <div title='Ai code reviewer' onClick={() => setbarNumber(p => (p == 1 ? 0 : 1))} className={`flex cursor-pointer border-dark-navy text-white  border-l-4 ${barNumber == 1 && " text-purple-500 !border-purple-500"}   justify-center p-4`}>
                        <MdReviews className="text-3xl text-gray-500"></MdReviews>
                    </div>
                    <div title='Ai notes generator' className={`flex cursor-pointer border-dark-navy text-white  border-l-4    justify-center p-4`}>
                        <GrNotes className="text-3xl text-gray-500"></GrNotes>
                    </div>
                    {user?._id == roomData?.createdBy && <div title='Ai quiz generator' className={`flex cursor-pointer border-dark-navy text-white  border-l-4    justify-center p-4`}>
                        <RiAiGenerate2 className="text-3xl text-gray-500"></RiAiGenerate2>
                    </div>}



                    <div onClick={() => setexitRoomPopUpOpen(true)} title="Exit room" className="mt-auto cursor-pointer flex justify-center text-3xl text-red-500">
                        <IoExitOutline className="mt-auto"></IoExitOutline>
                    </div>
                </div>
                {/* code review  */}
                <motion.div initial={{ width: 0, opacity: 0 }} animate={{ width: barNumber == 1 ? 350 : 0, opacity: barNumber == 1 ? 1 : 0 }} transition={{ duration: 0.4 }} className={`w-72 overflow-hidden flex flex-col   bg-[#1c1e2ad4] ${barNumber == 1 && " p-3"} `}>
                    <div className='flex hap-2 min-w-[350px] items-center gap-2   '>
                        <img className='h-8 w-8' src="/public/ai.gif" alt="" />
                        <p className='font-bold text-gray-300'>Code Review with AI ✨</p>
                    </div>

                    <div className='relative flex flex-col  h-full '>
                        <div className='h-full' >
                            <div className='flex justify-center flex-col items-center h-[82%]'>
                                <p className='text-4xl'>🤖</p>
                                <p className='mt-2 text-2xl font-semibold text-gray-400'>Review your code!</p>
                            </div>
                        </div>
                        {!isReviewOpen && <button onClick={() => setisReviewOpen(true)} className='bottom-0 m-2 w-[95%] p-2 absolute bg-purple-500 text-white font-semibold rounded-lg hover:bg-purple-400'>Review</button>}
                        {isReviewOpen &&
                            <div className='absolute flex-col w-full bottom-0  flex'>
                                <div className=' translate-y-3 p-2 pb-4 rounded-t-2xl  bg-[#1c1e2ad4] flex items-center gap-2  '>
                                    <div className='h-2 w-2 bg-green-400 rounded-full'></div>
                                    <div className='font-semibold text-gray-300'>Your Code Is Attached!</div>
                                </div>
                                <div className='rounded-xl z-20 h-14 flex items-center w-full'>
                                    <textarea rows={2} className='w-[85%]  rounded-l-xl p-1 bg-gray-200  outline-none' placeholder='Ask Anything...' name="" id=""></textarea>
                                    <div className='w-[15%] cursor-pointer group  h-full bg-gray-200 rounded-r-xl flex justify-center items-center'>
                                        <BsSendFill className='text-green-600 group-hover:scale-110 transition-all duration-200 text-xl rotate-45' />
                                    </div>
                                </div>
                            </div>
                        }
                    </div>
                </motion.div>
            </div>
        </>
    )
}

export default SidebarLeft