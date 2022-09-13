import { createContext, useState,useEffect } from 'react';

//import PRODUCTS from '../shop-data.json';

export const TodosContext = createContext({
  todos: [],
});







export const TodosProvider = ({ children }) => {
  
    const [todos, setTodos] = useState([]);
    const [isLoading,setIsLoading]=useState(true);

    useEffect(() => {
        async function fetchData() {
          const response = await fetch(
            "https://631901208e51a64d2bdd1dc4.mockapi.io/todos"
          );
          const newTodos = await response.json();
          console.log(newTodos);
          setTodos(newTodos);
          setIsLoading(false);
          console.log("todolar api den alındı ve set edildi.");
        }
        fetchData();
      }, []);



  
  const value = { todos,setTodos,isLoading };
  
  return (
    <TodosContext.Provider value={value}>
      {children}
    </TodosContext.Provider>
  );
};