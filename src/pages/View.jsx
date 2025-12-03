import React from 'react'
import Header from '../component/Header.jsx'
import Home from '../component/Home.jsx'



function View({task, setTask}) {
  return (
    <>
      <Header setTask={setTask}/>
      <Home task= {task} setTask={setTask}/>
    </>
  )
}

export default View