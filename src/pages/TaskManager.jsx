import { useState } from "react";
import AddTask from "./AddTask";
import TaskList from "./TaskList";

function TaskManager() {
  const [todoList, setTodoList] = useState([]);
  const [currentTask, setCurrentTask] = useState({
    id: "",
    title: "",
    desc: "",
    date: "",
    status:"pending",
  });
  const [editId, setEditId] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  const addTask = () => {
    setTodoList((prev) => [
      ...prev,
      { ...currentTask, id: Date.now(), status: "pending" },
    ]);
    resetTask();
  };

  const updateTask = () => {
  setTodoList((prev) => {
    const updatedList = prev.map((task) =>
      task.id === currentTask.id
        ? { ...currentTask, status: "pending" }
        : task
    );
    return updatedList;
  });
  setEditId(null);
  resetTask();
};

  const deleteTask = (id) => {
    setTodoList((prev) => prev.filter((task) => task.id !== id));
  };

  const startEdit = (task) => {
    setEditId(task.id);
    setCurrentTask(task);
  };

  const cancelEdit = () => {
    setEditId(null);
    resetTask();
  };

  const markCompleted = (id) => {
    setTodoList((prev) =>
      prev.map((task) =>
        task.id === id ? { ...task, status: "completed" } : task
      )
    );
  };

  const markAllCompleted = () => {
    setTodoList((prev) =>
      prev.map((task) => ({ ...task, status: "completed" }))
    );
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

  const resetTask = () =>
    setCurrentTask({
      id: "",
      title: "",
      desc: "",
      date: ""
    });

  return (
    <div className="todo-content">
      <AddTask
        currentTask={currentTask}
        setCurrentTask={setCurrentTask}
        addTask={addTask}
        updateTask={updateTask}
        editingId={editId}
        cancelEdit={cancelEdit}
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
