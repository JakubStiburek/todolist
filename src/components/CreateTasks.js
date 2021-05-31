import '../global.css'
import {useEffect, useState} from "react";
import Todo from "./Todo";

const CreateTasks = ({ userId, }) => {
  // store input data
  const [inputValue, setInputValue] = useState("");
  const [editInputValue, setEditInputValue] = useState("")
  const [isLoaded, setIsLoaded] = useState(false);
  const [editableTodoId, setEditableTodoId] = useState(undefined);
  const [error, setError] = useState(null);
  const [todos, setTodos] = useState([]);

  const filterTodos = (todos) => {
    return todos.filter(todo => todo.userId === userId);
  }

  const handleTodoFinished = (finishedTodoId) => {
    let finishedTodo = todos.find(t => t.id === finishedTodoId);
    setTodos(todos.filter(t => t.id !== finishedTodoId));
    finishedTodo.completed = true;
    setTodos([...todos, finishedTodo])
  }

  //
  // Edt todos
  //
    const handleEditTodo = (editTodo) => {
      setEditInputValue(editTodo.title);
      setEditableTodoId(editTodo.id);
    }

    const handleEditInputChange = (event) => {
      setEditInputValue(event.target.value)
    }

    const handleTodoEdited = (editedTodoId) => {
      let editedTodo = todos.find(t => t.id === editedTodoId);
      setTodos(todos.filter(t => t.id === editableTodoId));
      editedTodo.title = editInputValue;
      setTodos([...todos, editedTodo]);
      setInputValue("")
      setEditableTodoId(undefined)
    }

    const editTodo = (todo) => {
      return (
        <div>
          <textarea id="edit-todo" name="edit-todo" rows="10" cols="50" onChange={handleEditInputChange} value={editInputValue}/>
          <button onClick={() => handleTodoEdited(todo.id)}>Done</button>
        </div>
      )
    }
  //
  // Edit todos end
  //

  //
  // Making new todos
  //
  const  handleInputChange = (event) => {
    setInputValue(event.target.value)
  }

  const clearInput = () => {
    setInputValue("")
  }

  const makeTodo = (content) => {
    return {
      userId: userId,
      id: todos.length + 1,
      title: content,
      completed: false,
    }
  }

  const handleAddTodo = () => {
    setTodos([...todos, makeTodo(inputValue)]);
    clearInput();
  }

  // allow user to submit a new task using the enter instead of the Create task button
  const handleEnterPress = (event) => {
    if (event.key === "Enter"){
      handleAddTodo();
    }
  }
  //
  // Making new todos end
  //

  const renderTodos = (todos) => {
    return todos.map(todo =>
      <li key={todo.id} className="task-card">
        <Todo content={todo.title} completed={todo.completed}/>
        <button onClick={() => handleTodoFinished(todo.id)}>Finish</button>
        {todo.id === editableTodoId ? editTodo(todo) : <button onClick={() => handleEditTodo(todo)}>Edit</button>}
      </li>
    )
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
