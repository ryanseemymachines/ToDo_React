import React, { useState } from "react";
import AddTaskForm from "./AddTaskForm";
import TaskList from "./TaskList";

function TaskManager() {
  const [todoList, setTodoList] = useState([]);
  const [editingIndex, setEditingIndex] = useState(null);
  const [currentTask, setCurrentTask] = useState({
    title: "",
    desc: "",
    date: "",
  });

  const addTask = (task) => {
    setTodoList([...todoList, { ...task, status: "pending" }]);
  };

  const updateTask = (updatedTask) => {
    const updatedList = [...todoList];
    updatedList[editingIndex] = { ...updatedTask, status: "pending" };
    setTodoList(updatedList);
    setEditingIndex(null);
    setCurrentTask({ title: "", desc: "", date: "" });
  };

  const deleteTask = (index) => {
    const updatedList = [...todoList];
    updatedList.splice(index, 1);
    setTodoList(updatedList);
  };

  const startEdit = (task, index) => {
    setEditingIndex(index);
    setCurrentTask(task);
  };

  const cancelEdit = () => {
    setEditingIndex(null);
    setCurrentTask({ title: "", desc: "", date: "" });
  };

  return (
    <div>
      <AddTaskForm
        onAdd={addTask}
        onUpdate={updateTask}
        onCancelEdit={cancelEdit}
        editingIndex={editingIndex}
        currentTask={currentTask}
      />

      <TaskList
        todoList={todoList}
        onEdit={startEdit}
        onDelete={deleteTask}
      />
    </div>
  );
}

export default TaskManager;



import React, { useEffect, useState } from "react";

function AddTaskForm({
  onAdd,
  onUpdate,
  onCancelEdit,
  editingIndex,
  currentTask,
}) {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [date, setDate] = useState("");
  const [errors, setErrors] = useState({});

  const today = new Date().toISOString().split("T")[0];

  useEffect(() => {
    if (editingIndex !== null && currentTask) {
      setTitle(currentTask.title);
      setDesc(currentTask.desc);
      setDate(currentTask.date);
    } else {
      setTitle("");
      setDesc("");
      setDate("");
    }
  }, [editingIndex, currentTask]);

  const validate = () => {
    const newErrors = {};
    const textRegex = /^[A-Za-z0-9 _-]+$/;

    if (!title.trim()) {
      newErrors.title = "Title is required";
    } else if (!textRegex.test(title)) {
      newErrors.title = "Title can only contain letters, numbers, spaces, _ or -";
    }

    if (desc && !textRegex.test(desc)) {
      newErrors.desc = "Description can only contain letters, numbers, spaces, _ or -";
    }

    if (!date) {
      newErrors.date = "Date is required";
    } else if (date < today) {
      newErrors.date = "Date cannot be in the past";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleAddOrUpdate = () => {
    if (validate()) {
      const taskData = { title, desc, date };
      if (editingIndex !== null) {
        onUpdate(taskData);
      } else {
        onAdd(taskData);
      }
      setTitle("");
      setDesc("");
      setDate("");
      setErrors({});
    }
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Enter task title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      {errors.title && <div>{errors.title}</div>}

      <input
        type="text"
        placeholder="Enter task description"
        value={desc}
        onChange={(e) => setDesc(e.target.value)}
      />
      {errors.desc && <div>{errors.desc}</div>}

      <input
        type="date"
        value={date}
        min={today}
        onChange={(e) => setDate(e.target.value)}
      />
      {errors.date && <div>{errors.date}</div>}

      {editingIndex !== null ? (
        <>
          <button onClick={handleAddOrUpdate}>Save</button>
          <button onClick={onCancelEdit}>Cancel</button>
        </>
      ) : (
        <button onClick={handleAddOrUpdate}>Add Task</button>
      )}
    </div>
  );
}

export default AddTaskForm;


import React from "react";

function TaskList({ todoList, onEdit, onDelete }) {
  return (
    <ul>
      {todoList.length === 0 ? (
        <li>No tasks yet</li>
      ) : (
        todoList.map((task, index) => (
          <li key={index}>
            <div>{task.title}</div>
            <div>{task.desc}</div>
            <div>{task.date}</div>
            <button onClick={() => onEdit(task, index)}>Edit</button>
            <button onClick={() => onDelete(index)}>Delete</button>
          </li>
        ))
      )}
    </ul>
  );
}

export default TaskList;


import React from "react";
import TaskManager from "./components/TaskManager";

function App() {
  return (
    <div>
      <h1>Todo List</h1>
      <TaskManager />
    </div>
  );
}

export default App;
