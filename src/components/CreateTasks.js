import '../global.css'
import {useEffect, useState} from "react";
import Task from "./Task";

const CreateTasks = ({ userId, }) => {
  // store input data
  const [inputValue, setInputValue] = useState("");
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState(null);
  const [todos, setTodos] = useState([]);
  const [tasks, setTasks] = useState([]);

  const filterTodos = (todos) => {
    return todos.filter(todo => todo.userId === userId);
  }

  const  handleInputChange = (event) => {
    setInputValue(event.target.value)
  }

  const clearInput = () => {
    setInputValue("")
  }

  // allow user to submit a new task using the enter instead of the Create task button
  const handleEnterPress = (event) => {
    if (event.key === "Enter"){
    }
  }

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/todos")
      .then(response => response.json())
      .then(
        (result) => {
          setIsLoaded(true);
          setTodos(filterTodos(result));
        },
        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      )
  }, [])

  console.log(todos)

  if (error) {
    return <div>Error: {error.message}</div>
  } else if (!isLoaded) {
    return <div>LOADING</div>
  } else {
    return (
      <div>
        <label htmlFor="createTask">New task</label>
        <textarea id="createTask" name="createTask" value={inputValue} onChange={handleInputChange} onKeyPress={handleEnterPress} placeholder="Enter task description"/>
        <button>Create task</button>
      </div>
    )
  }
};

export default CreateTasks;
