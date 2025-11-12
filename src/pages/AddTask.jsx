import React, { useState } from "react";
import "./AddTask.scss";
import FormButton from "../components/FormButtons";
import Input from "../components/Input";
import TextArea from "../components/TextArea";

function AddTask({
  currentTask,
  setCurrentTask,
  addTask,
  updateTask,
  editingId,
  cancelEdit,
}) {
  const [errors, setErrors] = useState({});
  const today = new Date().toISOString().split("T")[0];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCurrentTask((prev) => ({ ...prev, [name]: value }));
  };

  const validate = () => {
    const newErrors = {};
    const nameRegex = /^[A-Za-z0-9][A-Za-z0-9 _-]*$/;
    let valid = true;

    if (!currentTask.title.trim()) {
      newErrors.title = "Title is required";
      valid = false;
    } else if (!nameRegex.test(currentTask.title)) {
      newErrors.title = "Title can only contain letters, numbers, spaces, _ or -";
      valid = false;
    }

    if (currentTask.desc && !nameRegex.test(currentTask.desc)) {
      newErrors.desc = "Description can only contain letters, numbers, spaces, _ or -";
      valid = false;
    }

    if (!currentTask.date) {
      newErrors.date = "Date is required";
      valid = false;
    } else if (currentTask.date < today) {
      newErrors.date = "Date cannot be in the past";
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleSubmit = () => {
    if (!validate()) return;
    editingId !== null ? updateTask() : addTask();
    setErrors({});
  };

  return (
    <form>
      <div className="form-container">
        <Input
          type="text"
          name="title"
          placeholder="Enter a task title"
          value={currentTask.title}
          onChange={handleChange}
        />
        {errors.title && <div className="error-message">{errors.title}</div>}

        <TextArea
          name="desc"
          placeholder="Enter the description"
          value={currentTask.desc}
          onChange={handleChange}
        />
        {errors.desc && <div className="error-message">{errors.desc}</div>}

        <Input
          type="date"
          name="date"
          value={currentTask.date}
          min={today}
          onChange={handleChange}
        />
        {errors.date && <div className="error-message">{errors.date}</div>}

        {editingId !== null ? (
          <div className="formBtnGroup">
            <FormButton type="button" onClick={cancelEdit} btnText="Cancel"/>
            <FormButton type="button" onClick={handleSubmit} btnText="Save"/>
          </div>
        ) : (
          <FormButton type="button" onClick={handleSubmit} btnText="Add"/>
        )}
      </div>
    </form>
  );
}

export default AddTask;