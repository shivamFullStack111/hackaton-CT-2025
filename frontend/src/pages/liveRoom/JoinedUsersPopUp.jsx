/* eslint-disable no-unused-vars */
import React from 'react'
import { CiSquareRemove } from 'react-icons/ci'
import { MdPersonRemoveAlt1 } from 'react-icons/md'
import { useSelector } from 'react-redux'
import { useState } from 'react'
import { motion } from 'framer-motion'

const JoinedUsersPopUp = ({ setactiveUsersPopUpOpen, allUsersData, roomData, handleKickUser }) => {
    const [kickingUserId, setKickingUserId] = useState(false)
    const { user } = useSelector(state => state.user)


    return (

        <>
            <motion.div initial={{ display: 'none' }} transition={{ delay: kickingUserId ? 0 : 0 }} animate={{ display: kickingUserId ? 'flex' : "none" }} className='absolute top-0 w-full h-full left-0 z-50  bg-[#0000005a] flex justify-center items-center '>
                <motion.div initial={{ scale: 0 }} transition={{ duration: 0.3 }} animate={{ scale: kickingUserId ? 1 : 0 }} className='rounded-xl shadow-xl px-10 bg-white py-4'>
                    <p className='font-bold text-xl'>Are you sure? you want to kick "{allUsersData?.find(usr => usr?._id == kickingUserId)?.name}"</p>
                    <div className='flex mt-6 justify-end gap-5 items-center'>
                        <button onClick={() => setKickingUserId('')} className='px-6 py-1 hover:scale-110 duration-200 rounded-lg border-2 text-purple-500 border-purple-500  '>No</button>
                        <button onClick={() => {
                            handleKickUser(kickingUserId)
                            setKickingUserId('')
                        }} className='px-6 py-1 hover:scale-110 duration-200   rounded-lg text-white border-2 border-purple-500  bg-purple-600'>Yes</button>
                    </div>
                </motion.div>
            </motion.div>
            <div className='fixed top-0 w-full h-full left-0 z-40 backdrop-blur-sm bg-[#0000005a] flex justify-center items-center'>
                <div className='rounded-xl w-[90%] max-w-4xl h-[85%] shadow-xl px-8 bg-dark-navy py-6 flex flex-col'>
                    <div className='flex justify-between items-center border-b border-gray-700 pb-4'>
                        <div>
                            <h2 className='font-bold text-2xl text-white'>Joined Users</h2>
                            <p className='text-gray-400 text-sm mt-1'>
                                {allUsersData.length} users currently in room
                            </p>
                        </div>
                        <button
                            onClick={() => setactiveUsersPopUpOpen(false)}
                            className='text-gray-400 hover:text-white hover:bg-gray-700 w-8 h-8 rounded-full flex items-center justify-center transition-colors'
                        >
                            ✕
                        </button>
                    </div>

                    <div className='flex-1 overflow-y-auto mt-6 space-y-4 pr-2'>
                        {allUsersData.map((usr, i) => (
                            <div
                                key={usr?._id}
                                className={`bg-gray-800 rounded-lg p-4 border-l-4 ${i % 2 == 0 ? 'border-purple-500' : 'border-transparent'
                                    } transition-all duration-300 hover:bg-gray-750`}
                            >
                                <div className='flex items-center justify-between'>
                                    <div className='flex items-center space-x-4'>
                                        <div className='relative'>
                                            <img
                                                src={"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR92SteKCmoJpBh3GlakGipEznqeWRH2NyfpA&s"}
                                                alt={usr?.name}
                                                className='w-12 h-12 rounded-full object-cover border-2 border-gray-600'
                                            />
                                            <div className='absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-dark-navy'></div>
                                        </div>

                                        <div>
                                            <h3 className='font-semibold text-white text-lg'>{usr?.name} {usr?._id == roomData?.createdBy?._id && <span className='text-gray-500 text-sm'>(Host)</span>}</h3>
                                            <p className='text-gray-400 text-sm'>{usr?.email}</p>
                                        </div>
                                    </div>

                                    <div className='flex items-center space-x-3'>
                                        <div className='flex items-center space-x-4'>
                                            {/* <div className='flex items-center space-x-2'>
                                            <div className={`w-3 h-3 rounded-full ${user.isVideoOn ? 'bg-green-500' : 'bg-red-500'}`}></div>
                                            <span className='text-gray-300 text-sm'>Video</span>
                                        </div> */}

                                            {/* <div className='flex items-center space-x-2'>
                                            <div className={`w-3 h-3 rounded-full ${user?.isAudioOn ? 'bg-green-500' : 'bg-red-500'}`}></div>
                                            <span className='text-gray-300 text-sm'>Audio</span>
                                        </div> */}
                                        </div>
                                    </div>

                                    <div className='flex items-center space-x-2'>
                                        {/* {!user.isVideoOn && (
                                        <button 
                                            className='px-4 py-2 rounded-lg text-sm font-medium text-purple-500 border border-purple-500 hover:bg-purple-500 hover:text-white transition-colors duration-200'
                                        >
                                            Ask Video
                                        </button>
                                    )} */}

                                        {/* {!user?.isAudioOn && (
                                        <button
                                            className='px-4 py-2 rounded-lg text-sm font-medium text-purple-500 border border-purple-500 hover:bg-purple-500 hover:text-white transition-colors duration-200'
                                        >
                                            Ask Audio
                                        </button>
                                    )} */}

                                        {/* <button
                                        className='px-4 py-2 rounded-lg text-sm font-medium text-yellow-500 border border-yellow-500 hover:bg-yellow-500 hover:text-white transition-colors duration-200'
                                    >
                                        Mute
                                    </button> */}

                                        {/* Kick Button */}
                                        {user?._id == roomData?.createdBy?._id && usr?._id !== roomData?.createdBy?._id &&
                                            <button
                                                onClick={() => setKickingUserId(usr?._id)}
                                                className='px-4 py-2 rounded-lg text-sm font-medium text-red-500 border border-red-500 hover:bg-red-500 hover:text-white transition-colors duration-200'
                                            >
                                                <MdPersonRemoveAlt1></MdPersonRemoveAlt1>
                                            </button>
                                        }
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Footer */}
                    <div className='flex justify-between items-center pt-6 border-t border-gray-700 mt-4'>
                        <p className='text-gray-400 text-sm'>
                            Click on actions to manage users in the room
                        </p>
                        <button
                            onClick={() => setactiveUsersPopUpOpen(false)}
                            className='px-6 py-2 rounded-lg text-white bg-purple-600 hover:bg-purple-700 transition-colors duration-200 font-medium'
                        >
                            Close
                        </button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default JoinedUsersPopUp