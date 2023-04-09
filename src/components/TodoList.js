import React from "react";

const TodoList = ({ todos, handleToggle, handleDelete }) => {
  const today = new Date();

  const importantTodos = todos
    .filter((todo) => todo.important)
    .sort((a, b) => {
      return todos.indexOf(b) - todos.indexOf(a);
    });
  const sortedTodos = importantTodos.concat(
    todos.filter((todo) => !todo.important)
  );

  const todoElement = (
    <>
      {sortedTodos.length ? (
        sortedTodos.map((item) => {
          const isOverdue = new Date(item.dueDate) < today && !item.completed;
          // const importantClass = item.important ? "important-class" : "";

          // style={(item.checked) ? { textDecoration: 'line-through' } : null}

          return (
            <div
              className="item-card"
              key={item.id}
              style={item.completed ? { textDecoration: "line-through" } : null}
            >
              <input
                type="checkbox"
                checked={item.completed}
                onChange={() => (isOverdue ? null : handleToggle(item.id))}
                disabled={isOverdue}
              />
              <div className="todo-info">
                <h3>{item.todo}</h3>
                <p>{item.detail}</p>
                <p>
                  Scheduled date: {item.dueDate}{" "}
                  <span style={{ color: "green" }}>
                    {isOverdue && "(overdued)"}
                  </span>
                </p>
                <div className="important-todo">
                  <p>{item.important ? "important" : ""}</p>
                </div>
                <button
                  className="del-btn"
                  onClick={() => handleDelete(item.id)}
                >
                  Delete
                </button>
              </div>
            </div>
          );
        })
      ) : (
        <div className="list-empty">
          <h3>List empty</h3>
        </div>
      )}
    </>
  );

  return (
    <div className="main-container">
      <h2 className="main-heading">Todo List</h2>
      <div>{todoElement}</div>
    </div>
  );
};

export default TodoList;
