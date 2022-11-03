import React, { useRef, useState } from "react";
import { FaAngleDown, FaAngleUp, FaPlus } from "react-icons/fa";
import { MdOutlineClose } from "react-icons/md";
import { useGlobalContext } from "../../context";
import { randomId } from "../../utils";

const initialSubtasks = [
  { text: "", error: false, id: randomId() },
  { text: "", error: false, id: randomId() },
];

function AddTask() {
  const { currentBoard, setApp, closeAll } = useGlobalContext();
  const taskNameRef = useRef();
  const currentStatusRef = useRef();
  const descriptionRef = useRef();
  const [subtasks, setSubtasks] = useState(initialSubtasks);

  const createTask = (taskName, description, columnId) => {
    console.log(`creating task...`);
    const taskObject = {
      title: taskName,
      description,
      id: randomId(12),
      columnId,
      columnTitle: currentBoard.columns.find((e) => e.id === columnId)?.title,
      subtasks: subtasks.map((subtask) => ({
        title: subtask.text,
        done: false,
        id: randomId(14),
      })),
    };

    console.log("new task =>", taskObject);

    setApp((app) => {
      return {
        ...app,
        boards: app.boards.map((board) => {
          if (board.id === currentBoard.id) {
            return {
              ...board,
              columns: board.columns.map((column) => {
                if (column.id === columnId) {
                  return { ...column, tasks: [...column.tasks, taskObject] };
                }
                return column;
              }),
            };
          }
          return board;
        }),
      };
    });

    closeAll();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const taskName = taskNameRef.current.value;
    const description = descriptionRef.current.value;
    const columnId = currentStatusRef.current.value;

    if (taskName.trim()) {
      // Valid Board Name
      taskNameRef.current.style.borderColor = null;
      if (subtasks.every((e) => e.text.trim())) {
        // Valid To Create New Task
        createTask(taskName, description, columnId);
      } else {
        // Some Subtasks Empty
        setSubtasks((subtasks) => {
          return subtasks.map((subtask) => {
            if (subtask.text.trim()) {
              return { ...subtask, error: false };
            }
            return { ...subtask, error: true };
          });
        });
      }
    } else {
      // Unvalid Task Name
      taskNameRef.current.style.borderColor = "#dc3545";
    }
  };

  return (
    <form className="main-form" onSubmit={handleSubmit}>
      <h3>Add new task</h3>
      <div className="input-group">
        <label htmlFor="task-name" className="label">
          task name
        </label>
        <input
          type="text"
          placeholder="e.g. Task coffee break"
          id="task-name"
          ref={taskNameRef}
        />
      </div>
      <div className="input-group">
        <label htmlFor="description" className="label">
          description (optional)
        </label>
        <textarea
          id="description"
          placeholder="e.g. It's always good to take a break. This  15 minute break will  recharge the batteries  a little."
          ref={descriptionRef}
        ></textarea>
      </div>
      <div className="input-group subtasks">
        <span className="label">subtasks</span>
        {subtasks.map(({ id, error, text }, idx) => (
          <div className="input-control" key={id}>
            <input
              type="text"
              value={text}
              className={error ? "error" : ""}
              onChange={(e) =>
                setSubtasks((subtasks) => {
                  return subtasks.map((subtask) => {
                    if (subtask.id === id) {
                      return { ...subtask, text: e.target.value };
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
        onClick={() => {
          setSubtasks((sbutasks) => [
            ...subtasks,
            { text: "", error: false, id: randomId() },
          ]);
        }}
      >
        <FaPlus /> add new subtask
      </button>
      <div className="input-group">
        <span className="label">current status</span>
        <select ref={currentStatusRef}>
          {currentBoard.columns.map((column) => (
            <option value={column.id} key={column.id}>
              {column.title}
            </option>
          ))}
        </select>
      </div>
      <button className="btn" type="submit">
        create task
      </button>
    </form>
  );
}

export default AddTask;
