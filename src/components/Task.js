import '../global.css';
import {useState} from "react";

const Task = ({ taskPreset, ...props }) => {
  // store task data
  const [task, setTask] = useState(taskPreset)
  // control if user can edit task
  const [showEdit, setShowEdit] = useState(false)
  // manage task completion
  const [taskDone, setTaskDone] = useState(false)

  const handleEditClick = () => {
    setShowEdit(true)
  }

  // save edit input
  const handleTaskChange = (event) => {
    setTask(event.target.value)
  }

  // hide edit option if task is done
  const handleEditDone = () => {
    setShowEdit(false)
  }

  const handleTaskDone = () => {
    setTaskDone(true)
  }

  const edit = () => {
    return (
      <div>
          <textarea id="task" name="task" rows="10" cols="50" onChange={handleTaskChange} value={task}/>
        <button onClick={handleEditDone}>Done</button>
      </div>
    )
  }

  // if the task isn't done, user have the option to edit it
  const allowEdit = () => {
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
      {showEdit ? edit() : allowEdit()}
    </div>
  )
};

export default Task;
