import { useState, useEffect } from "react";
import TodoList from "./components/TodoList";
import NewEntry from "./components/NewEntry";
import { v4 as uuid } from "uuid";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Dashboard from "./components/Dashboard";
import { HelmetProvider, Helmet } from "react-helmet-async";

const App = () => {
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

  const article = {
    title: "A Step-by-Step Guide",
    description:
      "A dummies guide to getting up and running with selenium-webdriver",
    image: "https://miro.medium.com/max/812/1*1xhuVp8f2WFUGUByHS8VTg.png",
  };

  return (
    <HelmetProvider>
      <Helmet>
        <title>{article.title}</title>
        <meta name="description" content={article.description} />
        <meta property="og:title" content={article.title} />
        <meta property="og:description" content={article.description} />
        <meta property="og:image" content={article.image} />
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
    </HelmetProvider>
  );
};

export default App;
