import React, { useState, useEffect } from "react";

function TaskForm({ onSubmit, editTask }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("Medium");
  const [dueDate, setDueDate] = useState("");

  useEffect(() => {
    if (editTask) {
      setTitle(editTask.title);
      setDescription(editTask.description);
      setPriority(editTask.priority || "Medium");
      setDueDate(editTask.dueDate || "");
    }
  }, [editTask]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) {
      alert("Title is required!");
      return;
    }

    const task = {
      id: editTask ? editTask.id : Date.now(),
      title,
      description,
      isCompleted: editTask ? editTask.isCompleted : false,
      createdAt: editTask ? editTask.createdAt : new Date().toISOString(),
      priority,
      dueDate,
    };

    onSubmit(task);
    setTitle("");
    setDescription("");
    setPriority("Medium");
    setDueDate("");
  };

  return (
    <form onSubmit={handleSubmit} className="task-form">
      <input
        type="text"
        placeholder="Task title *"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
      <textarea
        placeholder="Task description (optional)"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />

      <label>Priority</label>
      <select
        value={priority}
        onChange={(e) => setPriority(e.target.value)}
        required
      >
        <option value="">Select Priority</option>
        <option value="High">🔴 High</option>
        <option value="Medium">🟠 Medium</option>
        <option value="Low">🟢 Low</option>
      </select>

      <label>Due Date</label>
      <input
        type="date"
        value={dueDate}
        onChange={(e) => setDueDate(e.target.value)}
      />

      <button type="submit">{editTask ? "Update Task" : "Add Task"}</button>
    </form>
  );
}

export default TaskForm;