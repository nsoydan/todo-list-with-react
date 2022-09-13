import { useRef, useContext, useState } from "react";
import { TodosContext } from "../../contexts/todos.context";
import { ModeContext } from "../../contexts/mode.context";
import "./todoAdd.style.css";

const TodoAdd = () => {
  const username = localStorage.getItem("username");
  const inputRef = useRef(null);

  const { todos, setTodos } = useContext(TodosContext);
  const { mode, setMode } = useContext(ModeContext);
  const [IsMessage, setIsMessage] = useState(false);

  console.log(IsMessage);

  const handleAddTodo = (e) => {
    e.preventDefault();

    const data = {
      content: inputRef.current.value,
    };

    const postData = async (data) => {
      let response = await fetch(
        "https://631901208e51a64d2bdd1dc4.mockapi.io/todos",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );

      let newTodo = await response.json();
      console.log(newTodo);
      let a = todos.concat(newTodo);
      setTodos(a);
      inputRef.current.value = "";
      console.log(todos);

      console.log("todolar api den alındı ve set edildi.");
    };
    if (inputRef.current.value.length > 2) {
      postData(data);
      setIsMessage(false);
    } 
  };

  const toggleMode = () => {
    setMode(mode === "Light Mode" ? "Dark Mode" : "Light Mode");
    localStorage.setItem(
      "mode",
      mode === "Light Mode" ? "Dark Mode" : "Light Mode"
    );
  };

  const valueControl = () => {
    inputRef.current.value.length >= 1 && inputRef.current.value.length <3
      ? setIsMessage(true)
      : setIsMessage(false);
  };

  return (
    <div className="todo-add-container">
      <h3>
        <strong>{username}</strong>'s TO DO LIST
      </h3>
      <div className="form-container">
        <form onSubmit={handleAddTodo}>
          <label>Add Some Todos ...</label>
          <input ref={inputRef} type="text" onChange={valueControl} required />
          <button type="submit" className="btn btn-success sm">
            Ekle
          </button>
          {IsMessage && (
            <span className="span-message">
              (Todo must have at least 3 characters)
            </span>
          )}
        </form>
        <button
          className={
            mode === "Dark Mode"
              ? "btn btn-outline-light"
              : "btn btn-outline-dark"
          }
          onClick={toggleMode}
        >
          {mode === "Light Mode"
            ? "Press for Dark Mode"
            : "Press for Light Mode"}
        </button>
      </div>
    </div>
  );
};

export default TodoAdd;
