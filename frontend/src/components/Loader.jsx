import React from 'react'

const Loader = () => {
    return (
        <div className='absolute bg-dark-navy w-[100vw]  h-[100vh] top-0 left-0 z-50 flex justify-center items-center'>
            <img className='h-52  w-52 ' src="loader.gif" alt="" />
        </div>
    )
}

export default Loader