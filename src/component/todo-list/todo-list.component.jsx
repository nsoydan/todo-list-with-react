import {  useContext } from "react";
import "./todo-list.style.css";
import Todo from "../todo/todo.component";
import TodoAdd from "../TodoAdd/todoAdd.component";
import { TodosContext } from "../../contexts/todos.context";
import { ModeContext } from "../../contexts/mode.context";

const TodoList = () => {
  
  const {todos,setTodos}=useContext(TodosContext);
  const{mode}=useContext(ModeContext)

  const changeStatusTodo=(id,isCompleted)=>{
    
    const updateTodo=async()=>{
      const requestOptions = {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ isCompleted: !isCompleted  })
    };

      const response = await fetch('https://631901208e51a64d2bdd1dc4.mockapi.io/todos/'+id, requestOptions);
      const newTodo = await response.json();
      console.log("+++++++",newTodo);
        let updatedTodos=todos.map((todo)=>{
          if(todo.id === newTodo.id){
            return newTodo;
          } 
        return todo;
      })
        console.log("------>",updatedTodos);

        setTodos(updatedTodos);

      };
    updateTodo(id,isCompleted)
}; 
  
  return (
    <div>
    <TodoAdd todos={todos}/>
    <div className={mode==='Dark Mode'?('todo-list-dark-container'):('todo-list-container')}>
        <table className={mode==='Dark Mode'?('table-dark'):('table')}>
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Content</th>
            <th scope="col">IsCompleted</th>
            <th scope="col">Status</th>
            <th scope="col">Edit</th>
            <th scope="col">Remove</th>
          </tr>
        </thead>
        <tbody>

        {todos.map((todo) => (
          <Todo key={todo.id} todoToChild={todo}  changeStatusTodo={changeStatusTodo}  />
        ))}
        
        </tbody>
      </table>
  </div>


  </div>


  );
};

export default TodoList;
