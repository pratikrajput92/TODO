import axios from 'axios';
import { FileSearch } from 'lucide-react';
import React, { useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'

function Header({setTask, }) {
   
  const {type} = useParams();


  const navigate = useNavigate();

  const baseClass = "p-3 w-28 md:w-40 text-center font-semibold";
  const activeClass = "bg-orange-600 hover:bg-orange-500 text-amber-50";
  const inactiveClass = "bg-gray-300 hover:bg-gray-200";

  // const baseClass = "p-3 w-40 text-center font-semibold";
  // const activeClass = "bg-orange-600 hover:bg-orange-500  text-amber-50 ";
  // const inactiveClass = "bg-gray-300 hover:bg-gray-200"; 

  const [search ,setSearch] = useState("");

  const handleSearch = async() => {
    try {
      const response = await axios.get(`https://api.freeapi.app/api/v1/todos?query=${search}`);
      console.log("Search Data",response.data.data);
      
      if (response.data && Array.isArray(response.data.data)) {
      setTask(response.data.data); 
    }

      
     
    }catch (error) {
      console.error("Error",error);
      alert("O Bhai Galat Ho gya");
      
    }
  }

  return (

    <div className='bg-gray-100 flex justify-center items-center flex-col overflow-hidden p-4'>
      <div 
        className='m-2 my-2 md:mx-2 p-4 w-full max-w-6xl h-25 flex justify-center items-center rounded-lg bg-cover bg-center'
        style={{backgroundImage: "url('https://cdn.wallpapersafari.com/10/47/wEziqy.png')"}}
      >
        <h1 className='text-amber-50 text-3xl md:text-6xl font-bold'>TODO APP</h1>
      </div>
      <div className='mt-10 flex gap-2 flex-wrap justify-center'>
        <Link to={'/today'} className={`${baseClass} rounded-l-lg ${type === "today" ? activeClass : inactiveClass}`}>Today</Link>
        <Link to={'/pending'} className={`${baseClass} ${type === "pending" ? activeClass : inactiveClass}`}>Pending</Link>
        <Link to={'/completed'} className={`${baseClass} rounded-r-lg ${type === "completed" ? activeClass : inactiveClass}`}>Completed</Link>
      </div>
      <div className='w-full max-w-6xl flex flex-col md:flex-row md:justify-between justify-center items-center mt-10 gap-4 px-4'>
        <div>
          <Link to={'/'} className='font-semibold text-2xl md:text-3xl'>Tasks</Link>
        </div>
        <div className='flex justify-center items-center gap-2 w-full md:w-auto'>
          <input 
            type="text" 
            placeholder='Search List'
            onChange={(e) => setSearch(e.target.value)} 
            className='w-full md:w-80 bg-white rounded-lg border-2 border-gray-500 p-2'
          />
          <button onClick={handleSearch} className='text-indigo-600 cursor-pointer'>
            <FileSearch size={36} />
          </button>
        </div>
        <div className='w-full md:w-auto flex justify-center'>
          <Link 
            to={'/addTasks'} 
            className='text-amber-50 text-lg bg-orange-600 hover:bg-orange-500 rounded-lg p-2 w-full md:w-40 text-center'>
            + Add Task
          </Link>
        </div>  
      </div>

    </div>
  )
}


export default Header




    // <div className=' bg-gray-100 flex justify-center items-center flex-col overflow-hidden pb-8'>

    //    <div className='m-2 my-2 md:mx-2 p-4 w-xl md:w-7xl h-25 flex  justify-center items-center rounded-lg'style={{backgroundImage: "url('https://cdn.wallpapersafari.com/10/47/wEziqy.png')"}}>

    //     <h1 className='text-amber-50 text-5xl font-bold'>TODO APP</h1>
    //   </div>
    //   <div className='mt-10 flex gap-2'>
    //     <Link to={'/today'} className={`${baseClass} rounded-l-lg ${type === "today" ? activeClass : inactiveClass}`}>Today</Link>
    //     <Link to={'/pending'} className={`${baseClass} ${type === "pending" ? activeClass : inactiveClass}`} >Pending</Link>
    //     <Link to={'/completed'} className={`${baseClass} rounded-r-lg ${type === "completed" ? activeClass : inactiveClass}`}>Completed</Link>

    //     </div>

    //     <div className=' md:w-7xl w-xl flex justify-between items-center  mt-10  my-4'>
    //     <div>
    //       <Link to={'/'} className='font-semibold text-3xl'>Tasks</Link>
    //     </div>
    //     <div className='flex justify-center items-center gap-1'>
    //       <input type="text" placeholder='Search List ' onChange={(e) => setSearch(e.target.value)} className=' md:w-3xl  bg-white rounded-lg border-2 border-gray-500 p-2' />
    //       <button onClick={handleSearch} className='text-indigo-600 cursor-pointer ' ><FileSearch size={40} /></button>
    //     </div>
    //     <div>
    //       <Link to={'/addTasks'} className=' text-amber-50 text-xl bg-orange-600 hover:bg-orange-500 rounded-lg p-2 w-40'>+ Add Task</Link>
    //     </div>  
    //   </div>
      
    //   </div>