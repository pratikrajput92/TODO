import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Pencil, Trash2 } from "lucide-react";
import axios from 'axios';
import Todo from './Todo';


function Home({task, setTask}) {

  // const [task, setTask] = useState([]);
  const [allTask, setAllTask] = useState([])

  const { type } = useParams();

  const fatchData = async ()=>{

    try{
      const response = await axios.get("https://api.freeapi.app/api/v1/todos");
      console.log("API Response", response.data);

       if (response.data && Array.isArray(response.data.data)) {
        setTask(response.data.data);
        setAllTask(response.data.data)
      } else {
        console.error("Error :", error);
      }
    } catch (error) {
      console.error("Error :", error);
    }
  };



  useEffect(() => {
    fatchData()
   }, [])

  // useEffect(() => {

  //   console.log(type)
  //   try {
  //     let saved = localStorage.getItem("tasks");
  //     if (saved) {
  //       saved = JSON.parse(saved);
  //       if (Array.isArray(saved)) {
  //         setTask(saved);
  //         setAllTask(saved)
  //       } else {
  //         setTask([]);
  //       }
  //     } else {
  //       setTask([]);
  //     }
  //     console.log(saved);

  //   } catch (error) {
  //     console.error("error", error);
  //     setTask([]);
  //   }

  //   if (type && type == 'pending') {
  //     setTask((prev) => {
  //       return prev.filter(t => t.status === "pending");
  //     })
  //   } else if (type && type == 'completed') {
  //     setTask((prev) => {
  //       return prev.filter(t => t.status === "completed");
  //     })
  //   } else if (type && type == 'today') {
  //     const today = new Date().toISOString().split("T")[0];
  //     setTask((prev) => {
  //       return prev.filter(t => t.date === today);
  //     })
  //   }
  // }, [type])

  const filteredTasks = task.filter(t => {
  if (type === "pending") return t.isComplete === false;
  if (type === "completed") return t.isComplete === true;
  if (type === "today") {
    const today = new Date().toISOString().split("T")[0];
    return t.date === today; 
    }
    return true;
  });

  const handleCheckbox = async(id) => {
   try {
    const response = await axios.patch(`https://api.freeapi.app/api/v1/todos/toggle/status/${id}`)
   
    const updateTask = allTask.map((t) => t._id === id ? { ...t, status: t.status === 'pending' ? 'completed' : 'pending' } : t);
    setTask(updateTask);
    setAllTask(updateTask);
    

     

    alert("List Completed")

   } catch (error) {
    console.error("Error",error);
    
   }
  }

  // const handleCheckbox = (id) => {
  //   const updateTask = allTask.map((t) => t._id === id ? { ...t, status: t.status === 'pending' ? 'completed' : 'pending' } : t);
  //   setTask(updateTask);
  //   // setAllTask(updateTask);
  //   // localStorage.setItem("tasks", JSON.stringify(updateTask));
  //   console.log(updateTask);
  // }

  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(`https://api.freeapi.app/api/v1/todos/${id}`);
       const updateTask = task.filter((t) => t._id !== id);
        setTask(updateTask);
        setAllTask(updateTask);
        
        console.log("list  deleted successfully",);
        alert("List  deleted successfully ");
        
    } catch (error) {
      console.error("Error",error);
    }
  }  

  // const handleDelete = (id) => {
  //   const updateTask = task.filter((t) => t._id !== id);
  //   setTask(updateTask);
  //   setAllTask(updateTask);
  //   // localStorage.setItem("tasks", JSON.stringify(updateTask));
  // }

  // const {id} = useParams();
  // const navigate = useNavigate();
  const [editIndex, setEditIndex] = useState(null);

  const [edit, setEdit] = useState({
    title: "",
    priority: "",
    deadline: "",
    comments: "",
  });

  // useEffect(() => {
  //   const allTasks = JSON.parse(localStorage.getItem("tasks")) || [];
  //   if (allTasks[id]){
  //     setEdit(allTasks[id]);
  //   }
  // },[id])

  const handleEdit = (e) => {
    const { name, value } = e.target;
    setEdit((prev) => ({ ...prev, [name]: value }));
  }

  const handleEditClick =async (id) => {
 
      setEditIndex(id);  
       
        try {
          const response = await axios.get(`https://api.freeapi.app/api/v1/todos/${id}`);
          console.log("get data",response.data)
          const todo = response.data.data || response.data;
          setEdit({
            title: todo.title || "",
            comments: todo.comments || "", 
            priority: todo.priority || "",
            deadline: todo.deadline || "",
          })
        } catch (error) {
          console.error("error")
        }

  };


  const editSubmit = async (e) => {
    e.preventDefault();

     if (editIndex !== null) {
      try{
         const response = await axios.patch(`https://api.freeapi.app/api/v1/todos/${editIndex}`,edit);

         const updateTask = response.data;
         const updateTasks = task.map(t=> t._id === editIndex ? updateTask :t);
         setTask(updateTasks);
         setAllTask(updateTasks);

          setEdit({ title: "", priority: "", deadline: "", comments: "" });
          setEditIndex(null);
     
      }
      catch(error){
       console.error("Error updating task:",error);
      }
    }
  };




  return (

    <div className=' bg-gray-100 flex  justify-center items-center flex-col overflow-hidden pb-8'>


      <div className='w-xl md:w-7xl h-auto flex flex-col mt-2 bg-white border-1 border-gray-300 shadow-lg shadow-gray-500 overflow-hidden '>

        <div className='p-2 m-6 md:w-6.5xl border-1 border-gray-300 h-auto'>
          {filteredTasks?.length === 0 ? (
            <p className="text-gray-500">No pending tasks</p>
          ) : (<ul className='space-y-4'>
            {filteredTasks?.map((item, index) => {
              const overDue = item.status === "pending" && new Date(item.deadline) < new Date();

              return (

                <li key={item._id} className={`border rounded p-4 shadow-sm hover:shadow-sm flex justify-between items-center ${overDue ? 'bg-red-100 border-red-500' : 'bg-white'}`}>
                  <div className='flex gap-4'>
                    <input type="checkbox" checked={item.isComplete} onChange={() => handleCheckbox(item._id)} />
                    <div>
                      <h2 className='text-lg font-semibold'>{item.title}</h2>
                      <p>Deadline: {item.deadline}</p>
                    </div>

                  </div>
                  <div className='space-x-4 '>
                    <button type='button' onClick={() => handleEditClick(item._id)} className=''><Pencil size={20} /></button>
                    <button type='button' onClick={() => handleDelete(item._id)}><Trash2 size={20} /></button>
                  </div>
                </li>

              )

            })}
          </ul>
          )}
        </div>

        <div className='w-xl md:w-7xl h-auto flex flex-col mt-8 bg-white border-1 border-gray-300 shadow-lg shadow-gray-500 overflow-hidden '>

        </div>

        {editIndex !== null && (
          <div className="fixed inset-0 flex justify-center items-center bg-gray-700 bg-opacity-10 z-50">
            <div className="w-[500px] max-w-full rounded-lg bg-white p-6 shadow-lg">
              <h1 className="text-2xl font-semibold mb-4">Task Details</h1>
              <form onSubmit={editSubmit} className="space-y-4">
                <div className="flex flex-col">
                  <label htmlFor="title">Title</label>
                  <input
                    className="border border-gray-400 rounded-lg p-2"
                    type="text"
                    name="title"
                    placeholder="Add a task title"
                    value={edit.title}
                    onChange={handleEdit}
                    required
                  />
                </div>

                <div className="flex gap-4">
                  <div className="flex flex-col flex-1">
                    <label htmlFor="priority">Priority</label>
                    <input
                      className="border border-gray-400 rounded-lg p-2"
                      type="text"
                      name="priority"
                      placeholder="Select priority"
                      value={edit.priority}
                      onChange={handleEdit}
                      required
                    />
                  </div>
                  <div className="flex flex-col flex-1">
                    <label htmlFor="deadline">Deadline</label>
                    <input
                      className="border border-gray-400 rounded-lg p-2"
                      type="date"
                      name="deadline"
                      value={edit.deadline}
                      onChange={handleEdit}
                      required
                    />
                  </div>
                </div>

                <div className="flex flex-col">
                  <label htmlFor="comments">Comments</label>
                  <textarea
                    className="border border-gray-400 rounded-lg p-2"
                    name="comments"
                    placeholder="Add any comments to your task"
                    value={edit.comments}
                    onChange={handleEdit}
                    required
                  />
                </div>

                <div className="flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      setEditIndex(null);
                      setEdit({ title: "", priority: "", deadline: "", comments: "" });
                    }}
                    className="bg-gray-200 hover:bg-gray-300 rounded-lg px-4 py-2"
                  >
                    Close
                  </button>
                  <button
                    type="submit"
                    className="bg-green-600 hover:bg-green-500 text-white rounded-lg px-4 py-2"
                  >
                    Update Task
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Home

 // let tasks = JSON.parse(localStorage.getItem("tasks")) || [];   // [{obj1},{obj2},....]
  

 // tasks[editIndex] = { ...tasks[editIndex], ...edit }; // {...tasks[eI], status:'completed':}
      // localStorage.setItem("tasks", JSON.stringify(tasks));
      // setTask([...tasks]);
     






{/* {editIndex !== null && (
           <div className='flex flex-col justify-center items-center bg-gray-100'>
                 <div className='w-130 flex justify-center items-center rounded-lg flex-col  bg-white  p-6 shadow-md shadow-rose-500'>
                   <h1 className='text-3xl font-semibold text-black'>Task Details</h1>
                   <form onSubmit={editSubmit}>
                     <div className='w-120 flex flex-col gap-4 m-4 text-gray-500 '>
                       <div className='flex flex-col '>
                         <label htmlFor='title'>Title</label>
                         <input className='border-1 border-gray-400 rounded-lg p-2' type="text" name='title' placeholder='Add a task title' value={edit.title} onChange={handleEdit} required />
                       </div>
                       <div className='flex gap-4'>
                         <div className='w-60 flex flex-col'>
                           <label htmlFor='priority'>Priority</label>
                           <input className='border-1 border-gray-400 rounded-lg p-2' type="text" name='priority' placeholder='Select priority' value={edit.priority} onChange={handleEdit} required />
                         </div>
                         <div className='w-60 flex flex-col'>
                           <label htmlFor='deadline'>Deadline</label>
                           <input className='border-1 border-gray-400 rounded-lg p-2' type="date" name='deadline' placeholder='Select Date' value={edit.deadline} onChange={handleEdit} required />
                         </div>
                       </div>
                       <div className='flex flex-col'>
                         <label htmlFor='comments'>Comments</label>
                         <textarea className='border-1 border-gray-400 rounded-lg p-2 ' type="text" name='comments' placeholder='Add any comments to your task' value={edit.comments} onChange={handleEdit} required />
                       </div>
                     </div>
           
                     <div className='flex justify-center items-center'>
                       <button type='button' onClick={() => {
                         setEditIndex(null);
                         setEdit({ title: "", priority: "", deadline: "", comments: "" });
                           }} className='bg-transparent hover:bg-gray-200  border-2  rounded-lg px-8 py-1 m-2 border-green-600 ' >Close</button>
                       <button type='submit' className='bg-green-600 hover:bg-green-500 text-amber-50  rounded-lg px-6 py-1 m-2 '  >Update Tasks</button>
                     </div>
                   </form>
                 </div>
           
               </div>
       )} */}

{/* <div className='m-2 my-2 md:mx-2 p-4 w-xl md:w-7xl h-25 flex  justify-center items-center rounded-lg'style={{backgroundImage: "url('https://cdn.wallpapersafari.com/10/47/wEziqy.png')"}}>

        <h1 className='text-amber-50 text-5xl font-bold'>TODO APP</h1>
      </div>
      <div className='mt-10 space-x-1'>
        <button className='bg-orange-600 hover:bg-orange-500 p-3 w-40 font-semibold text-amber-50 rounded-l-lg'>Today</button>
        <button className='bg-gray-300 hover:bg-gray-200 p-3 w-40 font-semibold  ' >Pending</button>
        <button className='bg-gray-300 hover:bg-gray-200 p-3 w-40 font-semibold  rounded-r-lg'>Completed</button>
      </div> */}


// <li key={index} className='border rounded p-4 shadow-sm hover:shadow-sm flex justify-between items-center'>
//   <div className='flex gap-2'>
//     <input type="checkbox" checked={item.status === "completed"} onChange={() => handleCheckbox(item.id)} />
//     <h2>{item.title}</h2>
//     <p>Deadline: {item.deadline}</p>
//   </div>
//   <div className='space-x-4 '>
//     <button type='button' onClick={() => handleEditClick(index)} className=''><Pencil size={20} /></button>
//     <button type='button' onClick={() => handleDelete(index)}><Trash2 size={20} /></button>
//   </div>
// </li>
