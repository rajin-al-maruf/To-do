import React from 'react'
import { BsJournalPlus } from "react-icons/bs";
import { FaRegTrashCan } from "react-icons/fa6";
import { nanoid } from 'nanoid';
import { RiCheckboxBlankCircleLine } from "react-icons/ri";
import { RiCheckboxCircleFill } from "react-icons/ri";


const Hero = () => {

  const [todoText, setTodoText] = React.useState('')

  const [tasks, setTasks] = React.useState(() => {
    const savedTasks = localStorage.getItem("tasks")
    return savedTasks ? JSON.parse(savedTasks) : []
  })

  React.useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks))
  }, [tasks])

  function handleChange(event) {
    setTodoText( event.target.value )
  }

  function addNewTask() {
    
    if(todoText){
        setTasks([...tasks, {text : todoText, id: nanoid(), completed: false}])
        setTodoText('')
    }
  }

  function deleteTask(id) {
    setTasks(tasks.filter(task => task.id !== id))
  }

  function checked(id){
    setTasks(tasks.map(task => task.id === id? {...task, completed: !task.completed} : task))
    console.log(id)
  }
  console.log(tasks)
// console.log(checked)
 
  return (
    <div>

        <div className='mt-10 px-6 max-w-2xl m-auto'>

          <p className='text-3xl mb-4 font-semibold'>TODO</p>

          <div className='flex'>
            <input 
              type="text" 
              placeholder='Create new task...' 
              className='w-full border-2 rounded-md px-4 py-2'
              onChange={handleChange}
              name="taskText"
              value={todoText}
            />
          
            <button onClick={addNewTask} className='bg-cyan-300 ml-4 px-4 py-2 rounded-md ' >
            <BsJournalPlus size={15}/>
            </button>
          </div>

          <div className='px-2 bg-gray-700 mt-6 rounded-md'>
            <ul>
              {tasks.map(task => (
                <li key={task.id} className='p-4 border-b border-b-slate-300'>
                  
                  <div className='flex items-center justify-between text-white border-none'>
                    <div onClick={() => checked(task.id)} className='flex items-center'>
                      {task.completed? <RiCheckboxCircleFill size={25} className='mr-1'/> : <RiCheckboxBlankCircleLine size={25} className='mr-1'/>}
                      {task.text}
                    </div>
                    <FaRegTrashCan onClick={() => deleteTask(task.id)} size={15} className='text-cyan-300'/>
                    
                  </div>
                  
                  
                </li>
                
                ))}
            </ul>
          </div>
        </div>

    </div>
  )
}

export default Hero
