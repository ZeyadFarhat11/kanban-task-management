import React, { useState } from "react";
import { BsThreeDots } from "react-icons/bs";
import { useGlobalContext } from "../../context";
import "./style.scss";

function Task() {
  const {
    currentTask,
    currentBoard: { columns, id: boardId },
    setApp,
    setCurrentTask,
    setDeleteConfirm,
    closeAll,
    setShowTask,
    setEditTask,
  } = useGlobalContext();

  const [submenu, setSubmenu] = useState(false);

  const updateSubtask = (subtaskId, done) => {
    setApp((app) => {
      const appCopy = { ...app };
      const currentBoard = appCopy.boards.find((e) => e.id === boardId);
      const currentColumn = currentBoard.columns.find((e) =>
        e.tasks.find((s) => s.id === currentTask.id)
      );
      const currentTaskCopy = currentColumn.tasks.find(
        (e) => e.id === currentTask.id
      );
      const currentSubtask = currentTaskCopy.subtasks.find(
        (e) => e.id === subtaskId
      );
      currentSubtask.done = done;
      return appCopy;
    });
  };

  const changeColumn = (e) => {
    const newColumnId = e.target.value;
    const oldColumnId = currentTask.columnId;
    setApp((app) => {
      const appCopy = { ...app };
      const currentBoard = app.boards?.find((e) => e.id === boardId);
      const oldColumn = currentBoard.columns?.find(
        (col) => col.id === oldColumnId
      );
      const newColumn = currentBoard.columns?.find(
        (col) => col.id === newColumnId
      );
      oldColumn.tasks = oldColumn.tasks.filter((e) => e.id !== currentTask.id);
      const newCurrentTask = {
        ...currentTask,
        columnId: newColumn.id,
        columnTitle: newColumn.title,
      };
      newColumn.tasks.push(newCurrentTask);
      setCurrentTask(newCurrentTask);
      return appCopy;
    });
  };

  const deleteTask = () => {
    const onclick = () =>
      setApp((app) => {
        const appCopy = { ...app };
        const currentBoard = appCopy.boards?.find((e) => e.id === boardId);
        const currentColumn = currentBoard?.columns?.find(
          (e) => e.id === currentTask.columnId
        );
        currentColumn.tasks = currentColumn.tasks?.filter(
          (e) => e.id !== currentTask.id
        );
        closeAll();
        return appCopy;
      });

    const cancel = () => {
      setDeleteConfirm(null);
      setShowTask(true);
    };
    setShowTask(false);
    setDeleteConfirm({
      cancel,
      onClick: onclick,
      title: "Delete this task?",
      message: `Are you sure you want to delete the "${currentTask.title}" task and its subtasks? This action cannot be reversed.`,
    });
  };

  return (
    <div className="main-form task-info">
      <header>
        <h3>{currentTask.title}</h3>
        <button type="button" onClick={() => setSubmenu((e) => !e)}>
          <BsThreeDots />
        </button>
        <div className={`submenu${submenu ? " active" : ""}`}>
          <button
            onClick={() => {
              setEditTask(true);
              setShowTask(false);
            }}
          >
            edit task
          </button>
          <button className="delete" onClick={deleteTask}>
            delete task
          </button>
        </div>
      </header>
      {currentTask.description ? (
        <p className="description">{currentTask.description}</p>
      ) : null}
      <div className="input-group">
        <span className="label">
          Subtasks ({currentTask.subtasks.filter((e) => e.done).length} of{" "}
          {currentTask.subtasks.length})
        </span>
        {currentTask.subtasks.map(({ id, title, done }) => {
          return (
            <div className="subtask" key={id}>
              <input
                type="checkbox"
                defaultChecked={done}
                onChange={(e) => updateSubtask(id, e.target.checked)}
              />
              <p className={done ? "done" : ""}>{title}</p>
            </div>
          );
        })}
      </div>
      <div className="input-group">
        <span className="label">Current Status</span>
        <select onChange={changeColumn} defaultValue={currentTask.columnId}>
          {columns.map((column) => (
            <option value={column.id} key={column.id}>
              {column.title}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}

export default Task;
