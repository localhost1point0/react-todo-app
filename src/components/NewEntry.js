import React from "react";

const NewEntry = ({ newItem, handleSubmit, handleInputChange }) => {
  return (
    <div className="new-entry">
      <h2 className="side-heading">Schedule New Tasks</h2>
      <form className="form" onSubmit={handleSubmit}>
        <div className="input">
          <label htmlFor="todo">Task:</label>
          <input
            type="text"
            id="todo"
            name="todo"
            value={newItem.todo}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="input">
          <label htmlFor="detail">Detail:</label>
          <textarea
            id="detail"
            type="text"
            name="detail"
            value={newItem.detail}
            onChange={handleInputChange}
          ></textarea>
        </div>

        <div className="input">
          <label htmlFor="dueDate">Date:</label>
          <input
            id="dueDate"
            type="date"
            name="dueDate"
            value={newItem.dueDate}
            onChange={handleInputChange}
          />
        </div>
        <div className="important">
          <label htmlFor="important">Important:</label>
          <input
            type="checkbox"
            name="important"
            id="important"
            checked={newItem.important}
            onChange={handleInputChange}
          />
        </div>
        <button type="submit">Add Task</button>
      </form>
    </div>
  );
};

export default NewEntry;
