import React from 'react'
import ADDTask from '../component/todo/ADDTask'
import Header from '../component/todo/Header'

function AddTask({task, setTask}) {
  return (
    <>
    <Header/>
    <ADDTask setTask={setTask}/>
    </>
  )
}

export default AddTask