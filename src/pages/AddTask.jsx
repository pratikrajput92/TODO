import React from 'react'
import ADDTask from '../component/ADDTask'
import Header from '../component/Header'

function AddTask({task, setTask}) {
  return (
    <>
    <Header/>
    <ADDTask setTask={setTask}/>
    </>
  )
}

export default AddTask