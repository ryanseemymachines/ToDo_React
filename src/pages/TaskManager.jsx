import React, { useState } from "react";
import AddTask from "./AddTask";
import TaskList from "./TaskList";

function TaskManager() {
  const [todoList, setTodoList] = useState([]);
  const [editIndex, setEditIndex] = useState(null);
  const [currentTask, setCurrentTask] = useState({
    title: "",
    desc: "",
    date: "",
  });

  const [searchTerm, setSearchTerm] = useState("");

  const addTask = (task) => {
    setTodoList([...todoList, { ...task, status: "pending" }]);
  };

  const updateTask = (task) => {
    const updatedList = [...todoList];
    updatedList[editIndex] = { ...task, status: "pending" };
    setTodoList(updatedList);
    setEditIndex(null);
    setCurrentTask({ title: "", desc: "", date: "" });
  };

  const deleteTask = (index) => {
    const updatedList = [...todoList];
    updatedList.splice(index, 1);
    setTodoList(updatedList);
  };

  const startEdit = (task, index) => {
    setEditIndex(index);
    setCurrentTask(task);
  };

  const cancelEdit = () => {
    setEditIndex(null);
    setCurrentTask({ title: "", desc: "", date: "" });
  };

  const markCompleted = (task, index) => {
    const updatedList = [...todoList];
    updatedList[index] = { ...task, status: "completed" };
    setTodoList(updatedList);
  };

  const markAllCompleted = () =>{
    const updatedList = [...todoList];
    updatedList.forEach((task) => {
      task.status = "Completed";
    })
    setTodoList(updatedList);
  }

  const filteredTasks =
    searchTerm.trim() === ""
      ? todoList
      : todoList.filter((task) => {
          const term = searchTerm.toLowerCase();
          return (
            task.title.toLowerCase().includes(term) ||
            task.desc.toLowerCase().includes(term)
          );
        });

  return (
    <div className="todo-content">
      <AddTask
        addTask={addTask}
        updateTask={updateTask}
        cancelEdit={cancelEdit}
        editingIndex={editIndex}
        currentTask={currentTask}
      />
      <TaskList
        todoList={filteredTasks}
        deleteTask={deleteTask}
        startEdit={startEdit}
        markCompleted={markCompleted}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        markAllCompleted={markAllCompleted}
      />
    </div>
  );
}

export default TaskManager;
