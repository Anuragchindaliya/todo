import { useEffect, useState } from 'react';
import Header from './components/header';
import "./App.css"
import HomePage from './pages/HomePage';
import { ITask } from './interfaces';
const initialTask = localStorage.getItem("tasks") ? JSON.parse(localStorage.getItem("tasks") || "") : []
function App() {
  const [tasks, setTasks] = useState<ITask[]>(initialTask);
  const [filterText, setFilterText] = useState<string>("");
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks))
  }, [tasks])
  return (
    <div>
      <Header setFilterText={setFilterText} />
      <HomePage tasks={tasks.filter((task: ITask) => task.taskName.includes(filterText))} setTasks={setTasks} />
    </div>
  );
}

export default App;
