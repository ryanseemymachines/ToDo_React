import React from "react";
import "./TaskList.scss";

function TaskList({
  todoList,
  deleteTask,
  startEdit,
  markCompleted,
  searchTerm,
  setSearchTerm,
  markAllCompleted,
}) {
  return (
    <section className="task-display">
      <div className="search-bar">
        <i className="fas fa-search search-icon"></i>
        <input
          className="search-input"
          type="text"
          placeholder="Search tasks..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      {todoList.length === 0 ? (
        <div>No tasks yet</div>
      ) : (
        <>
          {todoList.some((task) => task.status === "pending") ? (
            <button
              id="allCompleteBtn"
              type="button"
              onClick={markAllCompleted}
            >
              Mark all as completed
            </button>
          ) : (
            <p>All tasks completed</p>
          )}
          {todoList.map((task, id) => (
            <section className="task-group" key={task.id}>
              <div className="detailDisplay">
                <span>Title : </span>
                {task.title}
              </div>

              {task.desc ? (
                <div className="detailDisplay">
                  <span>Description : </span>
                  {task.desc}
                </div>
              ) : (
                <div className="detailDisplay">No description found</div>
              )}

              <div className="detailDisplay">
                <span>Date : </span>
                {new Date(task.date).toLocaleDateString("en-GB")}
              </div>

              <div className="detailDisplay">
                <span>Status : </span>
                {task.status}
              </div>

              {task.status === "pending" ? (
                <div className="btn-group">
                  <button
                    id="editBtn"
                    type="button"
                    onClick={() => startEdit(task, id)}
                  >
                    Edit
                  </button>
                  <button
                    id="deleteBtn"
                    type="button"
                    onClick={() => deleteTask(id)}
                  >
                    Delete
                  </button>
                  <button
                    id="completeBtn"
                    type="button"
                    onClick={() => markCompleted(task, id)}
                  >
                    Mark as completed
                  </button>
                </div>
              ) : (
                <div className="btn-group">
                  <button
                    id="deleteBtn"
                    type="button"
                    onClick={() => deleteTask(id)}
                  >
                    Delete
                  </button>
                </div>
              )}
            </section>
          ))}
        </>
      )}
    </section>
  );
}

export default TaskList;
