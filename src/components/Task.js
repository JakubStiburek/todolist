import '../global.css';
import {useEffect, useState} from "react";

const Task = ({ content, completed }) => {
  const [className, setClassName] = useState("task")

  useEffect(() => {
    completed ? setClassName("task completed") : setClassName("task")
  })
  return (
    <p className={className}>{content}</p>
  )
};

export default Task;
