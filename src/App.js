import { useState, useEffect } from "react";
import TodoList from "./components/TodoList";
import NewEntry from "./components/NewEntry";
import { v4 as uuid } from "uuid";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Dashboard from "./components/Dashboard";
import { Helmet } from "react-helmet";

const App = () => {
  const pageTitle = "React-todo-list App";
  const pageDescription =
    "This is a simple todo app built using ReactJS. It allows users to create new todos, mark them as complete, and delete them. All todos are saved to local storage and accessed from there every time the app is started, and any changes made to the todos are also saved to local storage o that they are accessible even after the user closes the app.";
  const pageImage = "todo.jpg";

  const [todos, setTodos] = useState([]);
  const [newItem, setNewItem] = useState({
    id: "",
    todo: "",
    detail: "",
    dueDate: "",
    completed: false,
    important: false,
  });

  useEffect(() => {
    document.title = "React Todo";
    const storedItems = localStorage.getItem("todolist");
    if (storedItems) {
      // console.log(JSON.parse(storedItems));
      setTodos(JSON.parse(storedItems));
    }
  }, []);

  const setAndSave = (newTodos) => {
    setTodos(newTodos);
    localStorage.setItem("todolist", JSON.stringify(newTodos));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewItem({ ...newItem, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!newItem) return;
    const newTodos = [...todos, { ...newItem, id: uuid() }];
    setAndSave(newTodos);
    setNewItem({
      id: "",
      todo: "",
      detail: "",
      dueDate: "",
      completed: false,
      important: false,
    });
  };

  const handleToggle = (id) => {
    const newTodos = todos.map((todo) =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    );
    setAndSave(newTodos);
  };

  const handleDelete = (id) => {
    const filteredTodo = todos.filter((todo) => todo.id !== id);
    setAndSave(filteredTodo);
  };

  return (
    <>
      <Helmet>
        <title>{pageTitle}</title>
        <meta name="description" content={pageDescription} />
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={pageDescription} />
        <meta property="og:image" content={require(`./images/${pageImage}`)} />
      </Helmet>

      <div className="app">
        <Header />
        <div className="container">
          <main>
            <TodoList
              todos={todos}
              handleToggle={handleToggle}
              handleDelete={handleDelete}
            />
          </main>
          <aside>
            <NewEntry
              handleInputChange={handleInputChange}
              newItem={newItem}
              handleSubmit={handleSubmit}
            />
            <Dashboard todos={todos} />
          </aside>
        </div>
        <Footer />
      </div>
    </>
  );
};

export default App;
