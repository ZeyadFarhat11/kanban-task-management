import React from "react";
import "./style.scss";
import { FaPlus } from "react-icons/fa";
import { useGlobalContext } from "../../context";

function Column({ title, tasks }) {
  const { setCurrentTask, setOverlay, setShowTask } = useGlobalContext();
  // console.log("tasks", tasks);
  return (
    <div className="column">
      <h3 className="column-title">
        {title} ({tasks.length})
      </h3>
      {tasks.map((task) => (
        <div
          className="task"
          key={task.title}
          onClick={() => {
            setOverlay(true);
            setShowTask(true);
            setCurrentTask(task);
          }}
        >
          <h3>{task.title}</h3>
          <span>
            {task.subtasks.filter((e) => e.done).length} of{" "}
            {task.subtasks.length} subtasks
          </span>
        </div>
      ))}
    </div>
  );
}

function Board() {
  const { currentBoard, setEditBoard, setOverlay } = useGlobalContext();

  return (
    <div className="board">
      {!!currentBoard &&
        currentBoard.columns.map((col) => <Column key={col.title} {...col} />)}
      <div
        className="column add-new"
        onClick={() => {
          setEditBoard(true);
          setOverlay(true);
        }}
      >
        <span>
          <FaPlus />
          new column
        </span>
      </div>
    </div>
  );
}

export default Board;
