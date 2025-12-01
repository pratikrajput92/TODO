import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Route, Routes } from 'react-router-dom'
import Today from './pages/Today'
import Pending from './pages/Pending'
import Completed from './pages/Completed'
import View from './pages/View'
import AddTask from './pages/AddTask'

function App() {

  const [task, setTask] = useState([]);
  

  return (
    <Routes>
      <Route path='/' element={<View task={task} setTask={setTask}/>} />
      <Route path='/:type' element={<View task={task} setTask={setTask}/>} />
      {/* <Route path='today' element={<Today/>}/>
      <Route path='pending' element={<Pending/>}/>
      <Route path='completed' element={<Completed/>}/> */}
      <Route path='addTasks' element={<AddTask task={task} setTask={setTask}/>} />
    </Routes>
  )
}

export default App
