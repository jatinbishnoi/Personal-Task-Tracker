import React from "react";

function TaskItem({ task, onToggle, onEdit, onDelete }) {
  const formattedDate = new Date(task.createdAt).toLocaleString();

  return (
    <div className={`task-item ${task.isCompleted ? "completed" : "pending"}`}>
      <div>
        <h3>{task.title}</h3>
        {task.description && <p>{task.description}</p>}
        <small>Created: {formattedDate}</small>

        {task.dueDate && (
          <div>
            <small>📅 Due: {new Date(task.dueDate).toLocaleDateString()}</small>
          </div>
        )}

        <div style={{ marginTop: "6px" }}>
          <span className={`status-badge ${task.isCompleted ? "done" : "pending"}`}>
            {task.isCompleted ? "✅ Completed" : "⏳ Pending"}
          </span>
        </div>

        {task.priority && (
          <div className={`priority-label ${task.priority.toLowerCase()}`}>
            {task.priority}
          </div>
        )}
      </div>

      <div className="task-actions">
        <button onClick={() => onToggle(task.id)}>
          {task.isCompleted ? "Mark Pending" : "Mark Done"}
        </button>
        <button onClick={() => onEdit(task)}>Edit</button>
        <button
          onClick={() => {
            if (window.confirm("Delete this task?")) {
              onDelete(task.id);
            }
          }}
        >
          Delete
        </button>
      </div>
    </div>
  );
}

export default TaskItem;
