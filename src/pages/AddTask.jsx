import React, { useEffect, useState } from "react";
import "./AddTask.scss";

function AddTask({
  addTask,
  editingIndex,
  currentTask,
  updateTask,
  cancelEdit,
}) {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [date, setDate] = useState("");
  const [errors, setError] = useState("");

  useEffect(() => {
    if (editingIndex !== null) {
      setTitle(currentTask.title);
      setDesc(currentTask.desc);
      setDate(currentTask.date);
    } else {
      setTitle("");
      setDate("");
      setDesc("");
    }
  }, [editingIndex, currentTask]);

  const today = new Date().toISOString().split("T")[0];

  const validate = () => {
    let isValid = true;
    const newError = {};
    const nameRegex = /^[A-Za-z][A-Za-z0-9 _-]*[A-Za-z0-9]$/

    if (!title.trim()) {
      newError.title = "Title is required";
      isValid = false;
    } else if (!nameRegex.test(title)) {
      newError.title =
        "Title can only contain letters, numbers, spaces, _ or -";
      isValid = false;
    }

    if (desc && !nameRegex.test(desc)) {
      newError.desc =
        "Description can only contain letters, numbers, spaces, _ or -";
      isValid = false;
    }

    if (!date) {
      newError.date = "Date is required";
      isValid = false;
    } else if (date < today) {
      newError.date = "Date cannot be in the past";
      isValid = false;
    }

    setError(newError);
    return isValid;
  };

  const handleAddTask = () => {
    if (validate()) {
      const taskData = { title, desc, date };
      if (editingIndex !== null) {
        updateTask(taskData);
      } else {
        addTask(taskData);
      }

      setTitle("");
      setDate("");
      setDesc("");
      setError({});
    }
  };

  return (
    <form>
      <div className="form-container">
        <input
          type="text"
          placeholder="Enter a task title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        {errors.title ? (
          <div className="error-message">{errors.title}</div>
        ) : null}

        <input
          type="text"
          placeholder="Enter the description"
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
        />
        {errors.desc ? (
          <div className="error-message">{errors.desc}</div>
        ) : null}
        <input
          type="date"
          value={date}
          min={today}
          onChange={(e) => setDate(e.target.value)}
        />
        {errors.date ? (
          <div className="error-message">{errors.date}</div>
        ) : null}
        {editingIndex !== null ? (
          <>
          <div className="formBtnGroup">
            <button type="button" onClick={cancelEdit}>
              Cancel
            </button>
            <button type="button" onClick={handleAddTask}>
              Save
            </button>
          </div>
            
          </>
        ) : (
          <button type="button" onClick={handleAddTask}>
            Add
          </button>
        )}
      </div>
    </form>
  );
}

export default AddTask;
