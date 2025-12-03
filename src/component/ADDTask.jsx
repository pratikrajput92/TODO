import React, { useEffect, useState } from 'react'
import AddTask from '../pages/AddTask';
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
      "http://localhost:5000/api/todos",
      {
        title: add.title,
        priority: add.priority,
        comments: add.comments,
      
        deadline: add.deadline,
        id: add.id,
        status: "Pending",
      }
    );

    console.log("✅ Task created:", response.data);

   
    setAdd({
      title: "",
      priority: "",
      deadline: "",
      comments: "",
      id: Date.now(),
      status: "Pending",
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

    <div className="min-h-screen flex justify-center items-center bg-gray-100 px-4 py-6">
      <div className="w-full max-w-xl bg-white rounded-xl p-6 shadow-lg border border-gray-300">
        <h1 className="text-3xl font-semibold text-center text-black mb-6">
          Add New Task
        </h1>

        <form onSubmit={handleSubmit} className="space-y-5">

          {/* TITLE */}
          <div className="flex flex-col">
            <label className="font-medium mb-1">Title</label>
            <input
              type="text"
              name="title"
              value={add.title}
              onChange={handleInput}
              placeholder="Add task title"
              required
              className="border border-gray-400 rounded-lg p-2"
            />
          </div>

          {/* PRIORITY + DEADLINE (responsive) */}
          <div className="flex flex-col md:flex-row gap-5">

            {/* PRIORITY */}
            <div className="flex flex-col w-full">
              <label className="font-medium mb-1">Priority</label>

              <div className="flex items-center gap-4 mt-1">
                <label className="flex items-center gap-1">
                  <input
                    type="radio"
                    name="priority"
                    value="Low"
                    checked={add.priority === "Low"}
                    onChange={handleInput}
                  />
                  <span>Low</span>
                </label>

                <label className="flex items-center gap-1">
                  <input
                    type="radio"
                    name="priority"
                    value="Medium"
                    checked={add.priority === "Medium"}
                    onChange={handleInput}
                  />
                  <span>Medium</span>
                </label>

                <label className="flex items-center gap-1">
                  <input
                    type="radio"
                    name="priority"
                    value="High"
                    checked={add.priority === "High"}
                    onChange={handleInput}
                  />
                  <span>High</span>
                </label>
              </div>
            </div>

            {/* DEADLINE */}
            <div className="flex flex-col w-full">
              <label className="font-medium mb-1">Deadline</label>
              <input
                type="date"
                name="deadline"
                value={add.deadline}
                onChange={handleInput}
                required
                className="border border-gray-400 rounded-lg p-2"
              />
            </div>
          </div>

          {/* COMMENTS */}
          <div className="flex flex-col">
            <label className="font-medium mb-1">Comments</label>
            <textarea
              name="comments"
              value={add.comments}
              onChange={handleInput}
              placeholder="Add comments"
              required
              className="border border-gray-400 rounded-lg p-2 h-28 resize-none"
            ></textarea>
          </div>

          {/* BUTTONS */}
          <div className="flex justify-center gap-4 mt-2">
            <Link
              to="/"
              className="border rounded-lg px-8 py-2 border-gray-500 hover:bg-gray-200"
            >
              Close
            </Link>

            <button
              type="submit"
              className="bg-green-600 text-white px-8 py-2 rounded-lg hover:bg-green-500"
            >
              Add Task
            </button>
          </div>

        </form>
      </div>
    </div>

    // <div className='h-140 flex flex-col justify-center items-center bg-gray-100'>
    //   <div className='w-130 flex justify-center items-center rounded-lg flex-col  bg-white  p-6 shadow-md shadow-gray-500'>
    //     <h1 className='text-3xl font-semibold text-black'>Task Details</h1>
    //     <form onSubmit={handleSubmit}>
    //       <div className='w-120 flex flex-col gap-4 m-4 text-gray-800 '>
    //         <div className='flex flex-col '>
    //           <label htmlFor='title'>Title</label>
    //           <input className='border-1 border-gray-400 rounded-lg p-2' type="text" name='title' placeholder='Add a task title' value={add.title} onChange={handleInput} required />
    //         </div>
    //         <div className='flex gap-4'>
    //           <div className="flex flex-col w-60">
    //             <label className="mb-1">Priority</label>
    //             <div className="flex items-center gap-4">
    //               {/* Low */}
    //               <label className="flex items-center gap-1">
    //                 <input type="radio" name="priority" value="Low" checked={add.priority === "Low"} onChange={handleInput}/>
    //                 <span>Low</span>
    //               </label>
    //               {/* Medium */}
    //               <label className="flex items-center gap-1">
    //                 <input type="radio" name="priority" value="Medium" checked={add.priority === "Medium"} onChange={handleInput}/>
    //                 <span>Medium</span>
    //               </label>
    //               {/* High */}
    //               <label className="flex items-center gap-1">
    //                 <input type="radio" name="priority" value="High" checked={add.priority === "High"} onChange={handleInput}/>
    //                 <span>High</span>
    //               </label>
    //             </div>
    //           </div>

    //           <div className='w-60 flex flex-col'>
    //             <label htmlFor='deadline'>Deadline</label>
    //             <input className='border-1 border-gray-400 rounded-lg p-2' type="date" name='deadline' placeholder='Select Date' value={add.deadline} onChange={handleInput} required />
    //           </div>
    //         </div>
    //         <div className='flex flex-col'>
    //           <label htmlFor='comments'>Comments</label>
    //           <textarea className='border-1 border-gray-400 rounded-lg p-2 ' type="text" name='comments' placeholder='Add any comments to your task' value={add.comments} onChange={handleInput} required />
    //         </div>
    //       </div>

    //       <div className='flex justify-center items-center'>
    //         <Link to={'/'} className='bg-transparent hover:bg-gray-200  border-2  rounded-lg px-8 py-1 m-2 border-green-600 ' >Close</Link>
    //         <button type='submit' className='bg-green-600 hover:bg-green-500 text-amber-50  rounded-lg px-6 py-1 m-2 '  >Add Tasks</button>
    //       </div>
    //     </form>
    //   </div>

    // </div>
  )
}

export default ADDTask




{/*<div className='w-60 flex flex-col'>
    <label htmlFor='priority'>Priority</label>
    <select name="priority" value={add.priority} onChange={handleInput} className='border-1 border-gray-400 rounded-lg p-2' required >
      <option value="">Select priority</option>
      <option value="Low">Low</option>
      <option value="Medium">Medium</option>
      <option value="High">High</option>
    </select>
  </div> 
  <div className='w-60 flex flex-col'>
    <label htmlFor='priority'>Priority</label>
    <input className='border-1 border-gray-400 rounded-lg p-2' type="text" name='priority' placeholder='Select priority' value={add.priority} onChange={handleInput} required />
  </div> */}