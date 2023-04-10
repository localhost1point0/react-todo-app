import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt, faStar } from "@fortawesome/free-solid-svg-icons";

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
          const takeClass = isOverdue ? "overdued" : "";

          // style={(item.checked) ? { textDecoration: 'line-through' } : null}

          return (
            <div className={`item-card ${takeClass}`} key={item.id}>
              <div
                className="todo-info"
                style={
                  item.completed ? { textDecoration: "line-through" } : null
                }
              >
                <h3>{item.todo} </h3>
                <p>{item.detail}</p>
                <p className="date">
                  Scheduled date: {item.dueDate}{" "}
                  <span style={{ color: "green" }}>
                    {isOverdue && "(overdued)"}
                  </span>
                </p>
                <div className="important-todo">
                  {item.important ? <FontAwesomeIcon icon={faStar} /> : ""}
                </div>
              </div>
              <div className="todo-btns">
                <input
                  type="checkbox"
                  checked={item.completed}
                  onChange={() => (isOverdue ? null : handleToggle(item.id))}
                  disabled={isOverdue}
                />
                <span className="card-complete-label">Complete</span>
                <button
                  className="del-btn"
                  onClick={() => handleDelete(item.id)}
                >
                  <FontAwesomeIcon icon={faTrashAlt} />
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
