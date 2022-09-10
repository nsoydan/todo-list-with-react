import { Route,Routes } from 'react-router-dom';
import './App.css';
import Home from './component/home/home.component';
import TodoList from './component/todo-list/todo-list.component';
import { useContext } from 'react';
import { ModeContext } from './contexts/mode.context';

function App() {
  const {mode} =useContext(ModeContext);
 
    
  return (
    <div className={mode==='Dark Mode'?('app-dark-mode'):('app-light-mode')}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="todoList" element={<TodoList />} />
      </Routes>
    </div>
  );
}

export default App;
