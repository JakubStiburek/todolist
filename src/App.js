import './global.css';
import CreateTasks from "./components/CreateTasks";
import Login from "./components/Login";
import {useState} from "react";

function App() {
  const [loggedIn, setLoggedIn] = useState(false);

  const checkLogin = (data) => {
    setLoggedIn(data);
  }

  if (loggedIn) {
    return (
      <div className="app-wrapper">
        <CreateTasks />
      </div>
    )
  }
  else {
    return (
        <div className="app-wrapper">
          <Login checkLogin={checkLogin}/>
        </div>
      )
  }
}

export default App;
