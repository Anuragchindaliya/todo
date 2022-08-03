
import Header from './components/header';
import "./App.css"
import HomePage from './pages/HomePage';
import { TodoProvider } from './context/TodoProvider';

function App() {

  return (
    <div>
      <TodoProvider>
        <Header />
        <HomePage />
      </TodoProvider>
    </div>
  );
}

export default App;
