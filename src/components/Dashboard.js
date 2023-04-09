import React from "react";

const Dashboard = ({ todos }) => {
  const totalTasks = todos.length;
  const completedTasks = todos.filter((task) => task.completed).length;
  const pendingTasks = todos.filter(
    (task) => !task.completed && new Date(task.dueDate) >= new Date()
  ).length;
  const today = new Date();
  const overdueTasks = todos.filter(
    (task) => new Date(task.dueDate) < today && !task.completed
  ).length;

  return (
    <div className="dashboard">
      <p>Total Tasks: {totalTasks}</p>
      <p>Completed Tasks: {completedTasks}</p>
      <p>Pending Tasks: {pendingTasks}</p>
      <p>Overdued Tasks: {overdueTasks}</p>
      {/* {overdueTasks > 0 && <p>Overdue tasks: {overdueTasks}</p>} */}

    </div>
  );
};

export default Dashboard;
