import React from 'react'
import Header from '../component/todo/Header.jsx'
import Home from '../component/todo/Home.jsx'



function View({task, setTask}) {
  return (
    <>
      <Header setTask={setTask}/>
      <Home task= {task} setTask={setTask}/>
    </>
  )
}

export default View