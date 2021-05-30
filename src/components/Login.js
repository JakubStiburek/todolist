import '../global.css';
import {useEffect, useState} from "react";

const Login = ({checkLogin, ...props}) => {
  const [user, setUser] = useState("")
  const [password, setPassword] = useState("")
  const [users, setUsers] = useState([])
  const [isLoaded, setIsLoaded] = useState(false)
  const [error, setError] = useState(null)
  const [loggedIn, setLoggedIn] = useState(false)

  useEffect(() => {
    checkLogin(loggedIn);
  }, [checkLogin, loggedIn])

  const handleInputUserChange = (event) => {
    setUser(event.target.value)
  }

  const handleInputPasswordChange = (event) => {
    setPassword(event.target.value)
  }

  const validateInputUser = (user, users) => {
    const found = users.find(u => u.username === user)
    return !!found
  }

  const validateInputPassword = (password) => {
    return password === "password"
  }

  const handleLogin = () => {
    (validateInputUser(user, users) && validateInputPassword(password)) ? setLoggedIn(true) : setLoggedIn(false);
  }

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then(response => response.json())
      .then(
        (result) => {
          setIsLoaded(true);
          setUsers(result);
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
        <form>
          <label htmlFor="user">User name</label>
          <input type="text" id="user" name="user" onChange={handleInputUserChange} value={user} required/>
          <label htmlFor="password">Password</label>
          <input type="password" id="password" name="password" onChange={handleInputPasswordChange} value={password} required/>
          <button onClick={handleLogin}>Log in</button>
        </form>
      </div>
    )
  }
};

export default Login;
