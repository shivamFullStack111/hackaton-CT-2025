import React from 'react'
import { Link } from 'react-router-dom'

const Header = () => {
    return (
       <div className='bg-dark-navy'>
         <div className=' flex items-center justify-between p-2 w-full '>
            <div className='flex gap-2 items-center'>
                <img className='h-14 object-contain rounded-full w-14' src="logo.png" alt="logo" />
                <p className='text-2xl text-white font-extrabold'>SkillSync</p>
            </div>
            <div className='flex gap-8 text-gray-400 '>
                <Link to={'/'} className='hover:text-gray-300'>Home</Link>
                <Link to={'/discover'} className='hover:text-gray-300'>Discover</Link>
                <Link to={'/community'} className='hover:text-gray-300'>Community</Link>
            </div>
            <div className='flex gap-4 items-center mr-4 '>
                <Link to={'/login'} className='p-1 px-3 bg-purple-600 text-white rounded-md'>Login</Link>
                <Link to={'/register'} className='p-1 px-3 bg-gray-600 text-white rounded-md'>Register</Link>

            </div>
        </div>
       </div>
    )
}

export default Header