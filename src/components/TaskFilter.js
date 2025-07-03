import React from "react";

function TaskFilter({ currentFilter, onChangeFilter, taskCounts }) {
  const filters = ["All", "Completed", "Pending"];

  return (
    <div className="task-filter">
      {filters.map((filter) => (
        <button
          key={filter}
          className={`filter-btn ${currentFilter === filter ? "active" : ""}`}
          onClick={() => onChangeFilter(filter)}
        >
          {filter} ({taskCounts[filter.toLowerCase()]})
        </button>
      ))}
    </div>
  );
}

export default TaskFilter;
