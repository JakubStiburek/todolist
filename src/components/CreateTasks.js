import '../global.css'
import {useEffect, useState} from "react";
import Todo from "./Todo";

const CreateTasks = ({ userId, }) => {
  // store input data
  const [inputValue, setInputValue] = useState("");
  const [editInputValue, setEditInputValue] = useState("")
  const [isLoaded, setIsLoaded] = useState(false);
  const [editableTodoId, setEditableTodoId] = useState(undefined);
  const [topTodoId, setTopTodoId] = useState(undefined);
  const [error, setError] = useState(null);
  const [todos, setTodos] = useState([]);

  const filterTodos = (todos) => {
    return todos.filter(todo => todo.userId === userId);
  }

  const handleTodoFinished = (finishedTodoId) => {
    let finishedTodo = todos.find(t => t.id === finishedTodoId);
    finishedTodo.completed = true;
    let index = todos.indexOf(finishedTodo);
    let newTodos = todos;
    newTodos[index] = finishedTodo;
    setTodos([...newTodos])
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
      editedTodo.title = editInputValue;
      let index = todos.indexOf(editedTodo)
      let newTodos = todos;
      newTodos[index] = editedTodo;
      setTodos([...newTodos]);
      setInputValue("")
      setEditableTodoId(undefined)
    }

    const editTodo = (todo) => {
      return (
        <div className="edit">
          <textarea id="edit-todo" name="edit-todo" rows="10" cols="50" onChange={handleEditInputChange} value={editInputValue}/>
          <button className="button" onClick={() => handleTodoEdited(todo.id)}>Done</button>
        </div>
      )
    }
  //
  // Edit todos end
  //

  //
  // Making todos go TOP
  //
  const handleTodoGoTop = (todoGoTopId) => {
    setTopTodoId(todoGoTopId);
  }

  const arrangeTodos = () => {
    let topTodo = todos.find(t => t.id === topTodoId);
    let newTodos = todos.filter(t => t.id !== topTodoId);
    setTodos([topTodo, ...newTodos]);
  }
  //
  // Making todos go TOP end
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

  useEffect(() => {
    if (topTodoId) {
      arrangeTodos()
    }
  }, [topTodoId])

  const renderTodos = (todos) => {
    return todos.map(todo =>
      <li key={todo.id} className="task-card">
        <Todo content={todo.title} completed={todo.completed}/>
        <button className="button" onClick={() => handleTodoFinished(todo.id)}>Finish</button>
        <button className="button" onClick={() => handleTodoGoTop(todo.id)}>TOP</button>
        {todo.id === editableTodoId ? editTodo(todo) : <button className="button" onClick={() => handleEditTodo(todo)}>Edit</button>}
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
        <div className="new-card-input-field">
          <label htmlFor="createTask">New task</label>
          <textarea id="createTask" name="createTask" value={inputValue} onChange={handleInputChange} onKeyPress={handleEnterPress} placeholder="Enter task description"/>
          <button className="button" onClick={handleAddTodo}>Create task</button>
        </div>
        <ul className="task-list">
          {renderTodos(todos)}
        </ul>
      </div>
    )
  }
};

export default CreateTasks;
