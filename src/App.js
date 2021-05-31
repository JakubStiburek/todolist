import './global.css';
import CreateTasks from "./components/CreateTasks";
import Login from "./components/Login";
import {useState} from "react";

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [userId, setUserId] = useState(null)

  const checkLogin = (data) => {
    setLoggedIn(data);
  }

  const identifyUser = (id) => {
    setUserId(id)
  }

  if (loggedIn) {
    return (
      <div className="app-wrapper">
        <CreateTasks userId={userId}/>
      </div>
    )
  }
  else {
    return (
        <div className="app-wrapper">
          <Login checkLogin={checkLogin} identifyUser={identifyUser}/>
        </div>
      )
  }
}

export default App;
