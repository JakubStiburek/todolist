import '../global.css'
import {useEffect, useState} from "react";
import Task from "./Task";

const CreateTasks = () => {
  // store input data
  const [inputValue, setInputValue] = useState("");
  // store task elements
  const [tasks, setTasks] = useState([]);
  // control whether a new task should be made
  const [makeNewTask, setMakeNewTask] = useState(false);
  // keep track of task amount
  const [taskCount, setTaskCount] = useState(0);
  // mark a task as more important
  const [upTaskID, setUpTaskID] = useState(undefined)

  const  handleInputChange = (event) => {
    setInputValue(event.target.value)
  }

  const handleUp = (event) => {
    setUpTaskID(event.target.id)
  }

  // ad a new task to task array
  const pushTask = () => {
    setTaskCount(tasks.length + 1)
    let newTask = createTask();
    setTasks([...tasks, newTask])
    setMakeNewTask(false)
  }

  // make a new task element
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

  // allow user to submit a new task using the enter instead of the Create task button
  const handleEnterPress = (event) => {
    if (event.key === "Enter"){
      handleCreateTask();
    }
  }

  // fire creation of a new task
  if (makeNewTask) {
    pushTask();
  }

  // adjust the amount of current tasks when there is a change
  useEffect(() => {
    setTaskCount(tasks.length)
  }, [tasks.length])

  // render the more important task if there is one
  const upTask = () => {
   return tasks.find(task => task.key === upTaskID);
  }

  // render the less important tasks or all of them
  const otherTasks = () => {
    return tasks.filter(task => task.key !== upTaskID);
  }

  return (
    <div>
      <label htmlFor="createTask">New task</label>
      <textarea id="createTask" name="createTask" value={inputValue} onChange={handleInputChange} onKeyPress={handleEnterPress} placeholder="Enter task description"/>
      <button onClick={handleCreateTask}>Create task</button>
      <ul>
        {upTask()}
        {upTaskID ? otherTasks() : tasks}
      </ul>
    </div>
  )
};

export default CreateTasks;
