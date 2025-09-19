import React from 'react'

const ResponsiveContainer = ({ children}) => {
  return (
    <div className='container !max-w-[1200px] mx-auto'>

      {children}</div>
  )
}

export default ResponsiveContainer