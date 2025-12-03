import React from 'react'

function Todo() {
  return (
    <div className='flex justify-center items-center flex-col overflow-hidden'>

      <div className='m-2 my-2 md:mx-2 p-4  md:w-7xl h-25 flex  justify-center items-center rounded-lg'style={{backgroundImage: "url('https://th.bing.com/th/id/OIP.V_v-Q0TOxZ88QihhjxbWoAHaEo?w=319&h=180&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=3')"}}>

        <h1 className='text-amber-50 text-5xl font-bold'>TODO APP</h1>
      </div>
      <div className='pt-10 space-x-1'>
        <button className='bg-green-800 p-3 w-40 font-semibold text-amber-50 rounded-l-lg'>Today</button>
        <button className='bg-gray-300  p-3 w-40 font-semibold  ' >Pending</button>
        <button className='bg-gray-300 p-3 w-40 font-semibold  rounded-r-lg'>Completed</button>
      </div>
    </div>
  )
}

export default Todo