import '../global.css';
import {useEffect, useState} from "react";

const Todo = ({ content, completed, id, }) => {
  const [className, setClassName] = useState("task")

  useEffect(() => {
    completed ? setClassName("task completed") : setClassName("task")
  })
  return (
    <li key={id} className={className}>{content}</li>
  )
};

export default Todo;
