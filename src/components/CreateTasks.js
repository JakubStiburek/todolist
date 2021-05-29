import '../global.css'
import {useState} from "react";
import Task from "./Task";

const CreateTasks = () => {
  const [inputValue, setInputValue] = useState("");
  const [tasks, setTasks] = useState([]);
  const [makeNewTask, setMakeNewTask] = useState(false);
  const [taskCount, setTaskCount] = useState(0);
  const [deleteTask, setDeleteTask] = useState("")

  const  handleInputChange = (event) => {
    setInputValue(event.target.value)
  }

  const pushTask = (newTask) => {
    setTasks([...tasks, newTask])
    setMakeNewTask(false)
  }

  const createTask = () => {
    setTaskCount(taskCount + 1)
    return (
      <li key={taskCount}><Task taskPreset={inputValue} /></li>
    )
  }

  const handleCreateTask = () => {
    setMakeNewTask(true)
  }

  return (
    <div>
      <label htmlFor="createCard">New task</label>
      <textarea id="createCard" name="createCard" value={inputValue} onChange={handleInputChange} placeholder="Enter task description"/>
      <button onClick={handleCreateTask}>Create task</button>
      <ul>
        {makeNewTask ? pushTask(createTask()) : tasks}
      </ul>
    </div>
  )
};

export default CreateTasks;
