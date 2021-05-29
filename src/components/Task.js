import '../global.css';
import {useState} from "react";

const Task = ({ taskPreset, ...props }) => {
  const [task, setTask] = useState(taskPreset)
  const [showEdit, setShowEdit] = useState(false)
  const [taskDone, setTaskDone] = useState(false)

  const handleEditClick = () => {
    setShowEdit(true)
  }

  const handleTaskChange = (event) => {
    setTask(event.target.value)
  }

  const handleEditDone = () => {
    setShowEdit(false)
  }

  const handleTaskDone = () => {
    setTaskDone(true)
  }

  const edit = () => {
    return (
      <div>
        <form>
          <textarea id="task" name="task" rows="10" cols="50" onChange={handleTaskChange} value={task}/>
        </form>
        <button onClick={handleEditDone}>Done</button>
      </div>
    )
  }

  const askEdit = () => {
    if (!taskDone) {
      return (
        <button onClick={handleEditClick}>Edit</button>
      )
    }
  }

  const renderTask = () => {
    return (
      <div>
        <p>{task}</p>
        <button onClick={handleTaskDone}>Finish task</button>
      </div>
    )
  }

  const renderTaskDone = ()  => {
    return (
      <p className="strike">{task}</p>
    )
  }

  return (
    <div>
      {taskDone ? renderTaskDone() : renderTask()}
      {showEdit ? edit() : askEdit()}
    </div>
  )
};

export default Task
