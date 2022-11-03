import React, { useRef, useState } from "react";
import { FaPlus, FaAngleUp, FaAngleDown } from "react-icons/fa";
import { MdOutlineClose } from "react-icons/md";
import { useGlobalContext } from "../../context";
import { randomId } from "../../utils";

const mapSubtasks = (subtasks) => {
  return subtasks.map((subtask) => ({
    title: subtask.title,
    error: false,
    id: subtask.id,
  }));
};

function EditTask() {
  const { currentTask, currentBoard, setApp, closeAll } = useGlobalContext();

  const [taskName, setTaskName] = useState(currentTask.title);
  const [desc, setDesc] = useState(currentTask.description);
  const [subtasks, setSubtasks] = useState(mapSubtasks(currentTask.subtasks));
  const taskNameRef = useRef();

  console.log(currentTask);

  const editTask = () => {
    setApp((app) => {
      const appClone = { ...app };
      const currentBoardClone = app?.boards?.find(
        (e) => e.id === currentBoard.id
      );
      const currentColumn = currentBoardClone?.columns?.find(
        (e) => e.id === currentTask.columnId
      );
      const currentTaskClone = currentColumn?.tasks?.find(
        (e) => e.id === currentTask.id
      );
      currentTaskClone.title = taskName;
      currentTaskClone.description = desc;
      currentTaskClone.subtasks = subtasks.map((subtask) => {
        const oldSubtask = currentTask?.subtasks?.find(
          (e) => e.id === subtask.id
        );
        if (oldSubtask) {
          return { ...oldSubtask, title: subtask.title };
        }
        return { title: subtask.title, id: randomId(), done: false };
      });
      return appClone;
    });
    closeAll();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (taskName.trim()) {
      taskNameRef.current.style.borderColor = null;
      if (subtasks.every((e) => e.title.trim())) {
        editTask();
      } else {
        setSubtasks((subtasks) =>
          subtasks.map((subtask) =>
            subtask.title.trim()
              ? { ...subtask, error: false }
              : { ...subtask, error: true }
          )
        );
      }
    } else {
      taskNameRef.current.style.borderColor = "#dc3545";
    }
  };

  return (
    <form className="main-form edit-task" onSubmit={handleSubmit}>
      <h3>Edit task</h3>
      <div className="input-group">
        <label htmlFor="task-name" className="label">
          task name
        </label>
        <input
          type="text"
          id="task-name"
          value={taskName}
          onChange={(e) => setTaskName(e.target.value)}
          ref={taskNameRef}
        />
      </div>
      <div className="input-group">
        <label htmlFor="description" className="label">
          description
        </label>
        <textarea
          id="description"
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
        ></textarea>
      </div>
      <div className="input-group">
        <span className="label">subtasks</span>
        {subtasks.map(({ title, error, id }, idx) => (
          <div className="input-control" key={id}>
            <input
              type="text"
              value={title}
              className={error ? "error" : ""}
              onChange={(e) =>
                setSubtasks((subtasks) => {
                  return subtasks.map((subtask) => {
                    if (subtask.id === id) {
                      return { ...subtask, title: e.target.value };
                    }
                    return subtask;
                  });
                })
              }
            />
            <div className="tools">
              <button
                type="button"
                onClick={() =>
                  setSubtasks((subtasks) => subtasks.filter((e) => e.id !== id))
                }
              >
                <MdOutlineClose />
              </button>
              <button
                type="button"
                onClick={() => {
                  if (idx <= 0) return;
                  setSubtasks((s) => {
                    const subtasks = [...s];
                    [subtasks[idx], subtasks[idx - 1]] = [
                      subtasks[idx - 1],
                      subtasks[idx],
                    ];
                    return subtasks;
                  });
                }}
              >
                <FaAngleUp />
              </button>
              <button
                type="button"
                onClick={() => {
                  if (idx >= subtasks.length - 1) return;
                  setSubtasks((c) => {
                    const subtasks = [...c];
                    [subtasks[idx], subtasks[idx + 1]] = [
                      subtasks[idx + 1],
                      subtasks[idx],
                    ];
                    return subtasks;
                  });
                }}
              >
                <FaAngleDown />
              </button>
            </div>
          </div>
        ))}
      </div>
      <button
        className="btn dark-white"
        type="button"
        onClick={() =>
          setSubtasks((s) => [
            ...s,
            { title: "", error: false, id: randomId() },
          ])
        }
      >
        <FaPlus /> add new subtask
      </button>
      <button type="submit" className="btn">
        edit task
      </button>
    </form>
  );
}

export default EditTask;
