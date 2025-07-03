// src/utils/localStorage.js

const SAMPLE_TASKS = [
  {
    id: 1,
    title: "Complete React assignment",
    description: "Build a task tracker application",
    isCompleted: false,
    createdAt: "2024-01-15T10:00:00Z",
  },
  {
    id: 2,
    title: "Review JavaScript concepts",
    description: "Go through ES6+ features",
    isCompleted: true,
    createdAt: "2024-01-14T15:30:00Z",
  },
];

// Save tasks for a user
export const saveTasksToStorage = (username, tasks) => {
  localStorage.setItem(`tasks_${username}`, JSON.stringify(tasks));
};

// Load tasks for a user
export const loadTasksFromStorage = (username) => {
  const data = localStorage.getItem(`tasks_${username}`);
  return data ? JSON.parse(data) : [];
};

// ✅ Initialize sample tasks if not present
export const initializeSampleTasksForUser = (username) => {
  const existing = localStorage.getItem(`tasks_${username}`);
  if (!existing) {
    saveTasksToStorage(username, SAMPLE_TASKS);
  }
};
