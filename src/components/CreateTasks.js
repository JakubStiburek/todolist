import '../global.css'
import {useEffect, useState} from "react";
import Todo from "./Todo";

const CreateTasks = ({ userId, }) => {
  // store input data
  const [inputValue, setInputValue] = useState("");
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState(null);
  const [todos, setTodos] = useState([]);
  const [count, setCount] = useState(0)

  const filterTodos = (todos) => {
    return todos.filter(todo => todo.userId === userId);
  }

  const countTodos = (todos) => {
    setCount(todos.length);
  }

  const  handleInputChange = (event) => {
    setInputValue(event.target.value)
  }

  const clearInput = () => {
    setInputValue("")
  }

  const makeTodo = (content) => {
    return {
      userId: userId,
      id: count + 1,
      title: content,
      completed: false,
    }
  }

  const handleAddTodo = () => {
    setTodos([...todos, makeTodo(inputValue)]);
  }

  // allow user to submit a new task using the enter instead of the Create task button
  const handleEnterPress = (event) => {
    if (event.key === "Enter"){
    }
  }

  const renderTodos = (todos) => {
    return todos.map(todo =>
      <Todo content={todo.title} completed={todo.completed} id={todo.id}/>
    )
  }

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/todos")
      .then(response => response.json())
      .then(
        (result) => {
          setIsLoaded(true);
          setTodos(filterTodos(result));
          countTodos(todos)
        },
        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      )
  }, [])

  if (error) {
    return <div>Error: {error.message}</div>
  } else if (!isLoaded) {
    return <div>LOADING</div>
  } else {
    return (
      <div>
        <div>
          <label htmlFor="createTask">New task</label>
          <textarea id="createTask" name="createTask" value={inputValue} onChange={handleInputChange} onKeyPress={handleEnterPress} placeholder="Enter task description"/>
          <button onClick={handleAddTodo}>Create task</button>
        </div>
        <ul>
          {renderTodos(todos)}
        </ul>
      </div>
    )
  }
};

export default CreateTasks;
