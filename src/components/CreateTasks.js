import '../global.css'
import {useEffect, useState} from "react";
import Task from "./Task";

const CreateTasks = () => {
  const [inputValue, setInputValue] = useState("");
  const [tasks, setTasks] = useState([]);
  const [makeNewTask, setMakeNewTask] = useState(false);
  const [taskCount, setTaskCount] = useState(0);
  const [upTaskID, setUpTaskID] = useState(undefined)

  const  handleInputChange = (event) => {
    setInputValue(event.target.value)
  }

  const handleUp = (event) => {
    setUpTaskID(event.target.id)
  }

  const pushTask = () => {
    setTaskCount(tasks.length + 1)
    let newTask = createTask();
    setTasks([...tasks, newTask])
    setMakeNewTask(false)
  }

  const createTask = () => {
    return (
      <li key={taskCount}>
        <div className="task-card">
          <Task taskPreset={inputValue} />
          <button id={taskCount} onClick={handleUp}>Up</button>
        </div>
      </li>
    )
  }

  const handleCreateTask = () => {
    setMakeNewTask(true)
  }


  if (makeNewTask) {
    pushTask();
  }

  useEffect(() => {
    setTaskCount(tasks.length)
  }, [tasks.length])

  const upTask = () => {
   return tasks.find(task => task.key === upTaskID);
  }

  const otherTasks = () => {
    return tasks.filter(task => task.key !== upTaskID);
  }

  return (
    <div>
      <label htmlFor="createCard">New task</label>
      <textarea id="createCard" name="createCard" value={inputValue} onChange={handleInputChange} placeholder="Enter task description"/>
      <button onClick={handleCreateTask}>Create task</button>
      <ul>
        {upTask()}
        {upTaskID ? otherTasks() : tasks}
      </ul>
    </div>
  )
};

export default CreateTasks;
