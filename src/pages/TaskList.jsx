import "./TaskList.scss";
import Search from "../components/Search";
import ListButtons from "../components/ListButtons";

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
      <Search
        className="search-input"
        type="search"
        placeholder="Search tasks..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      {todoList.length === 0 ? (
        <div>No tasks</div>
      ) : (
        <>
          {todoList.some((task) => task.status === "pending") ? (
            <ListButtons
              type="button"
              onClick={markAllCompleted}
              btnText="Mark all as completed"
              additionalClass="completeBtn"
            />
          ) : (
            <p>All tasks completed</p>
          )}

          {todoList.map((task) => (
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

              <div className="btn-group">
                {task.status === "pending" ? (
                  <>
                    <ListButtons
                      type="button"
                      onClick={() => startEdit(task)}
                      btnText="Edit"
                      additionalClass="editBtn"
                    />
                    <ListButtons
                      type="button"
                      onClick={() => deleteTask(task.id)}
                      btnText="Delete"
                      additionalClass="deleteBtn"
                    />
                    <ListButtons
                      type="button"
                      onClick={() => markCompleted(task.id)}
                      btnText="Mark as completed"
                      additionalClass="completeBtn"
                    />
                  </>
                ) : (
                  <ListButtons
                    type="button"
                    onClick={() => deleteTask(task.id)}
                    btnText="Delete"
                    additionalClass="deleteBtn"
                  />
                )}
              </div>
            </section>
          ))}
        </>
      )}
    </section>
  );
}

export default TaskList;
