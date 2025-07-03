import React, { useState, useEffect } from "react";
import Login from "./components/Login";
import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";
import TaskFilter from "./components/TaskFilter";
import SearchBar from "./components/SearchBar";
import {
  saveTasksToStorage,
  loadTasksFromStorage,
  initializeSampleTasksForUser
} from "./utils/localStorage";

import "./styles/App.css";

function App() {
  const [user, setUser] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [editTask, setEditTask] = useState(null);
  const [filter, setFilter] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  // Load user and their tasks on mount
  useEffect(() => {
    const savedUser = JSON.parse(localStorage.getItem("user"));
    if (savedUser) {
      setUser(savedUser);
      initializeSampleTasksForUser(savedUser.username);
      const savedTasks = loadTasksFromStorage(savedUser.username);
      setTasks(savedTasks);
    }
  }, []);

  // Save tasks on update
  useEffect(() => {
    if (user) {
      saveTasksToStorage(user.username, tasks);
    }
  }, [tasks, user]);

  const handleLogin = (userData) => {
    localStorage.setItem("user", JSON.stringify(userData));
    setUser(userData);

    initializeSampleTasksForUser(userData.username);
    const userTasks = loadTasksFromStorage(userData.username);
    setTasks(userTasks);
  };

  const handleAddOrUpdateTask = (task) => {
    setTasks((prev) => {
      const exists = prev.find((t) => t.id === task.id);
      return exists
        ? prev.map((t) => (t.id === task.id ? task : t))
        : [...prev, task];
    });
    setEditTask(null);
  };

  const handleToggle = (id) => {
    setTasks((prev) =>
      prev.map((t) =>
        t.id === id ? { ...t, isCompleted: !t.isCompleted } : t
      )
    );
  };

  const handleDelete = (id) => {
    const confirmDelete = window.confirm("Delete this task?");
    if (confirmDelete) {
      setTasks((prev) => prev.filter((t) => t.id !== id));
    }
  };

  const handleEdit = (task) => {
    setEditTask(task);
  };

  const filteredTasks = tasks
    .filter((t) => {
      if (filter === "Completed") return t.isCompleted;
      if (filter === "Pending") return !t.isCompleted;
      return true;
    })
    .filter((t) =>
      t.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (t.description &&
        t.description.toLowerCase().includes(searchQuery.toLowerCase()))
    );

  const taskCounts = {
    all: tasks.length,
    completed: tasks.filter((t) => t.isCompleted).length,
    pending: tasks.filter((t) => !t.isCompleted).length,
  };

  return (
    <div className="App">
      {user ? (
        <div className="dashboard">
          <h2>Welcome, {user.fullName}!</h2>
          <p><strong>Username:</strong> {user.username}</p>
          <p><strong>Email:</strong> {user.email}</p>
          {user.profilePic && (
            <img src={user.profilePic} alt="Profile" className="profile-img" />
          )}

          <SearchBar
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
          />

          <TaskFilter
            currentFilter={filter}
            onChangeFilter={setFilter}
            taskCounts={taskCounts}
          />

          <TaskForm onSubmit={handleAddOrUpdateTask} editTask={editTask} />

          <TaskList
            tasks={filteredTasks}
            onToggle={handleToggle}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />

          <button
            className="logout-btn"
            onClick={() => {
              localStorage.clear();
              setUser(null);
              setTasks([]);
              setSearchQuery("");
            }}
          >
            Logout & Clear
          </button>
        </div>
      ) : (
        <Login onLogin={handleLogin} />
      )}
    </div>
  );
}

export default App;
