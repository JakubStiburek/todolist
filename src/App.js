import Task from './components/Task.js';
import './global.css';
import CreateTasks from "./components/CreateTasks";

function App() {
  return (
    <div className="app-wrapper">
      ahoj
      <CreateTasks />
      <Task taskPreset="Do this app"/>
    </div>
  );
}

export default App;
