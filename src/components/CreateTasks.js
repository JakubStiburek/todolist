import '../global.css'
import {useEffect, useState} from "react";
import Task from "./Task";

const CreateTasks = () => {
  const [inputValue, setInputValue] = useState("");
  const [tasks, setTasks] = useState([]);
  const [makeNewTask, setMakeNewTask] = useState(false);
  const [taskCount, setTaskCount] = useState(0);

  const  handleInputChange = (event) => {
    setInputValue(event.target.value)
  }

  const pushTask = () => {
    setTaskCount(tasks.length + 1)
    let newTask = createTask();
    setTasks([...tasks, newTask])
    setMakeNewTask(false)
  }

  const createTask = () => {
    return (
      <li key={taskCount}><Task taskPreset={inputValue} /></li>
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


  return (
    <div>
      <label htmlFor="createCard">New task</label>
      <textarea id="createCard" name="createCard" value={inputValue} onChange={handleInputChange} placeholder="Enter task description"/>
      <button onClick={handleCreateTask}>Create task</button>
      <ul>
        {tasks}
      </ul>
    </div>
  )
};

export default CreateTasks;
