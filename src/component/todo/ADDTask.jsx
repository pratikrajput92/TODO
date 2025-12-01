import React, { useEffect, useState } from 'react'
import AddTask from '../../pages/AddTask';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

function ADDTask({task, setTask}) {
  
  // const [task,setTask] = useState([]);
  const [add, setAdd] = useState({
    title: "",
    priority: "",
    deadline: "",
    comments: "",
    status:"pending",
    date: new Date().toISOString().split("T")[0],
    id: Date.now()
  });

  const handleInput = (e) => {
    const { name, value } = e.target;
    setAdd((prev) => ({ ...prev, [name]: value }));
  }

  const navigate = useNavigate();

 const handleSubmit = async (event) => {
  event.preventDefault();
  console.log("submitting Task", add);

  try {
    const response = await axios.post(
      "https://api.freeapi.app/api/v1/todos",
      {
        title: add.title,
        description: add.comments,
        // date: add.date,
        // deadline: add.deadline,
        // id: add.id,
        // completed: false,
      }
    );

    console.log("✅ Task created:", response.data);

    // const newApiTask = {
    //   id: response.data?.data?._id || Date.now(),
    //   title: response.data?.data?.title || add.title,
    //   description: response.data?.data?.description || add.comments,
    //   // status: response.data?.data?.completed ? "completed" : "pending",
    //   // priority: add.priority,
    //   // deadline: add.deadline,
    //   // date: add.date,
    // };

    // setTask((prev) => [...prev, newApiTask]);

    setAdd({
      title: "",
      priority: "",
      deadline: "",
      comments: "",
      id: Date.now(),
      status: "pending",
      date: new Date().toISOString().split("T")[0],
    });

    navigate("/");
  } catch (error) {
    console.error("❌ Error creating task:", error);
    alert("Task create karte waqt error aaya. Try again!");
  }
};   
  

  // const handleSubmit = (event) => {
  //   event.preventDefault();
  //   console.log(add);

  //   let oldTasks = JSON.parse(localStorage.getItem("tasks"));

  //   if (!oldTasks) { 
  //     oldTasks = [] 
  //   };
  //   console.log(oldTasks);
  //   oldTasks.push(add);

  //   localStorage.setItem("tasks", JSON.stringify(oldTasks));

  //   setAdd({
  //     title: "",
  //     priority: "",
  //     deadline: "",
  //     comments: "",
  //     id: Date.now(),
  //     date: new Date().toISOString().split("T")[0],
  //     status:"pending"
  //   })

  //   navigate('/');

  // }


  return (
    <div className='h-140 flex flex-col justify-center items-center bg-gray-100'>
      <div className='w-130 flex justify-center items-center rounded-lg flex-col  bg-white  p-6 shadow-md shadow-rose-500'>
        <h1 className='text-3xl font-semibold text-black'>Task Details</h1>
        <form onSubmit={handleSubmit}>
          <div className='w-120 flex flex-col gap-4 m-4 text-gray-500 '>
            <div className='flex flex-col '>
              <label htmlFor='title'>Title</label>
              <input className='border-1 border-gray-400 rounded-lg p-2' type="text" name='title' placeholder='Add a task title' value={add.title} onChange={handleInput} required />
            </div>
            <div className='flex gap-4'>
              <div className='w-60 flex flex-col'>
                <label htmlFor='priority'>Priority</label>
                <input className='border-1 border-gray-400 rounded-lg p-2' type="text" name='priority' placeholder='Select priority' value={add.priority} onChange={handleInput} required />
              </div>
              <div className='w-60 flex flex-col'>
                <label htmlFor='deadline'>Deadline</label>
                <input className='border-1 border-gray-400 rounded-lg p-2' type="date" name='deadline' placeholder='Select Date' value={add.deadline} onChange={handleInput} required />
              </div>
            </div>
            <div className='flex flex-col'>
              <label htmlFor='comments'>Comments</label>
              <textarea className='border-1 border-gray-400 rounded-lg p-2 ' type="text" name='comments' placeholder='Add any comments to your task' value={add.comments} onChange={handleInput} required />
            </div>
          </div>

          <div className='flex justify-center items-center'>
            <Link to={'/'} className='bg-transparent hover:bg-gray-200  border-2  rounded-lg px-8 py-1 m-2 border-green-600 ' >Close</Link>
            <button type='submit' className='bg-green-600 hover:bg-green-500 text-amber-50  rounded-lg px-6 py-1 m-2 '  >Add Tasks</button>
          </div>
        </form>
      </div>

    </div>
  )
}

export default ADDTask