import React, { useState } from "react";
import AddTask from "./AddTask";
import TaskList from "./TaskList";

function TaskManager() {
  const [todoList, setTodoList] = useState([]);
  const [editId, setEditId] = useState(null);
  const [currentTask, setCurrentTask] = useState({
    id: "",
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
    updatedList[editId] = { ...task, status: "pending" };
    setTodoList(updatedList);
    setEditId(null);
    setCurrentTask({ id: "", title: "", desc: "", date: "" });
  };

  const deleteTask = (id) => {
    const updatedList = [...todoList];
    updatedList.splice(id, 1);
    setTodoList(updatedList);
  };

  const startEdit = (task, id) => {
    setEditId(id);
    setCurrentTask(task);
  };

  const cancelEdit = () => {
    setEditId(null);
    setCurrentTask({ id: "", title: "", desc: "", date: "" });
  };

  const markCompleted = (task, id) => {
    const updatedList = [...todoList];
    updatedList[id] = { ...task, status: "completed" };
    setTodoList(updatedList);
  };

  const markAllCompleted = () => {
    const updatedList = [...todoList];
    updatedList.forEach((task) => {
      task.status = "Completed";
    });
    setTodoList(updatedList);
  };

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
      {console.log(todoList)}
      <AddTask
        addTask={addTask}
        updateTask={updateTask}
        cancelEdit={cancelEdit}
        editingId={editId}
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
