import "./todo.style.css";
import { Fragment, useState, useRef, useContext } from "react";
import { TodosContext } from "../../contexts/todos.context";

const Todo = ({ todoToChild, changeStatusTodo }) => {
  const { todos, setTodos } = useContext(TodosContext);

  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isMessage, setIsMessage] = useState(false);
  
  const inputRef = useRef(null);

  const toggleOpenEdit = () => {
    setIsEditOpen(!isEditOpen);
  };

  const editTodo = (e, id, data) => {
    e.preventDefault();
    const updateTodo = async () => {
      const requestOptions = {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content: data }),
      };
      const response = await fetch(
        "https://631901208e51a64d2bdd1dc4.mockapi.io/todos/" + id,
        requestOptions
      );
      const newTodo = await response.json();
      console.log("+++++++", newTodo);
      let updatedTodos = todos.map((todo) => {
        if (todo.id === newTodo.id) {
          return newTodo;
        }
        return todo;
      });
      setTodos(updatedTodos);
    };
    if(!isMessage){
      updateTodo(id, data);
      setIsEditOpen(false);
    }
  };

  const deleteTodo = (id) => {
    const delTodo = async () => {
      const requestOptions = {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
      };

      const response = await fetch(
        "https://631901208e51a64d2bdd1dc4.mockapi.io/todos/" + id,
        requestOptions
      );
      const newTodo = await response.json();
      let updatedTodos = todos.filter((todo) => todo.id !== newTodo.id);
      setTodos(updatedTodos);
    };
    delTodo(id);
  };

  const valueControl = () => {
    inputRef.current.value.length < 3 && inputRef.current.value.length >= 1
      ? setIsMessage(true)
      : setIsMessage(false);
  };


  const { id, isCompleted, content } = todoToChild;

  return (
    <Fragment>
      <tr>
        <th scope="row">{id}</th>
        {isEditOpen ? (<td>
          <div className="edit-input-container">
            <form className="edit-form-container">
              <input type="text" ref={inputRef} defaultValue={content} onChange={valueControl}/>
              <button
                className="btn btn-primary"
                type="submit"
                onClick={(e) => editTodo(e, id, inputRef.current.value)}
              >
                Change
              </button>
              <button className="btn btn-dark" onClick={toggleOpenEdit}>
                Cancel
              </button>
              {isMessage && (
                <span className="span-message">
                  (Todo must have at least 3 characters)
                </span>
              )}
            </form>
          </div></td>
        ) : (
          <Fragment>
            <td className={isCompleted ? "td-content-overline" : ""}>
              {content}
            </td>
            <td>{isCompleted ? "Yes" : "No"}</td>
            <td>
              <input
                type="checkbox"
                checked={isCompleted}
                onChange={() => changeStatusTodo(id, isCompleted)}
              />
            </td>
            <td>
              <button className="btn btn-success" onClick={toggleOpenEdit}>
                Change
              </button>
            </td>
            <td>
              <button className="btn btn-danger" onClick={() => deleteTodo(id)}>
                Del
              </button>
            </td>
          </Fragment>
        )}
      </tr>
    </Fragment>
  );
};

export default Todo;
