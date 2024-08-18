


    <div className="container">
      <div className="todo-add-container">
        <form onSubmit={handleAddTodo}>
          <label>Todo Giriniz</label>
          <input ref={inputRef} type="text" required />
          <button type="submit" className="btn btn-success">
            Ekle
          </button>
        </form>
        <button
          className={
            mode === "Dark Mode"
              ? "btn btn-outline-dark"
              : "btn btn-outline-light"
          }
          onClick={toggleMode}
        >
          {mode === "Light Mode"
            ? "Press for Dark Mode"
            : "Press for Light Mode"}
        </button>
      </div>

        {todos.map((todo) => (
          <Todo key={todo.id} todoToChild={todo} deleteTodo={deleteTodo} changeStatusTodo={changeStatusTodo} />
        ))}
      </div>
    </div>