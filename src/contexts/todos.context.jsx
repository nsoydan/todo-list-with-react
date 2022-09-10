import { createContext, useState,useEffect } from 'react';

//import PRODUCTS from '../shop-data.json';

export const TodosContext = createContext({
  todos: [],
});







export const TodosProvider = ({ children }) => {
  
    const [todos, setTodos] = useState([]);

    useEffect(() => {
        async function fetchData() {
          const response = await fetch(
            "https://631901208e51a64d2bdd1dc4.mockapi.io/todos"
          );
          const newTodos = await response.json();
          console.log(newTodos);
          setTodos(newTodos);
          console.log("todolar api den alındı ve set edildi.");
        }
        fetchData();
      }, []);



  
  const value = { todos,setTodos };
  
  return (
    <TodosContext.Provider value={value}>
      {children}
    </TodosContext.Provider>
  );
};