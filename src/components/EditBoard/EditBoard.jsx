import React, { useRef, useState } from "react";
import { FaPlus, FaAngleUp, FaAngleDown } from "react-icons/fa";
import { MdOutlineClose } from "react-icons/md";
import { useGlobalContext } from "../../context";
import { randomId } from "../../utils";

function EditBoard() {
  const { currentBoard, closeAll, setApp } = useGlobalContext();

  const boardNameRef = useRef();

  const initialColumns = currentBoard.columns.map((e) => ({
    title: e.title,
    error: false,
    id: e.id,
  }));

  const [columns, setColumns] = useState(initialColumns);

  const addColumn = () => {
    setColumns((columns) => [
      ...columns,
      { title: "", error: false, id: randomId() },
    ]);
  };

  const saveChanges = (boardName) => {
    const currentBoardCopy = { ...currentBoard };
    currentBoardCopy.title = boardName;
    currentBoardCopy.columns = columns.map((column) => {
      const oldColumn = currentBoard.columns.find((e) => e.id === column.id);

      if (oldColumn) {
        console.log(`old column`);
        return { ...oldColumn, title: column.title };
      }
      console.log(`new column`, {
        title: column.title,
        tasks: [],
        id: randomId(),
      });
      return { title: column.title, tasks: [], id: randomId() };
    });
    setApp((app) => {
      const appCopy = { ...app };
      const boardIndex = appCopy.boards.findIndex(
        (e) => e.id === currentBoard.id
      );
      appCopy.boards[boardIndex] = currentBoardCopy;
      return appCopy;
    });
    closeAll();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const boardName = boardNameRef.current.value;
    if (boardName?.trim()) {
      // Valid Board Name
      boardNameRef.current.style.borderColor = null;

      if (columns.every((e) => e.title.trim())) {
        // Valid Columns Name
        saveChanges(boardName);
      } else {
        // Unvalid Columns Name
        setColumns((columns) => {
          return columns.map((column) => {
            if (column.title.trim()) {
              return { ...column, error: false };
            }
            return { ...column, error: true };
          });
        });
      }
    } else {
      // Unvalid Board Name
      boardNameRef.current.style.borderColor = "#dc3545";
    }
  };

  return (
    <form className="main-form" onSubmit={handleSubmit}>
      <h3>Edit board</h3>
      <div className="input-group">
        <label htmlFor="board-name" className="label">
          board name
        </label>
        <input
          type="text"
          id="board-name"
          ref={boardNameRef}
          defaultValue={currentBoard.title}
        />
      </div>
      <div className="input-group">
        <span className="label">board columns</span>
        {columns.map(({ title, id, error }, idx) => (
          <div className="input-control" key={id}>
            <input
              type="text"
              className={error ? "error" : ""}
              onChange={(e) =>
                setColumns((columns) => {
                  return columns.map((column) => {
                    if (column.id === id) {
                      return { ...column, title: e.target.value };
                    }
                    return column;
                  });
                })
              }
              value={title}
            />
            <div className="tools">
              <button
                type="button"
                onClick={() =>
                  setColumns((columns) => columns.filter((e) => e.id !== id))
                }
              >
                <MdOutlineClose />
              </button>
              <button
                type="button"
                onClick={() => {
                  if (idx <= 0) return;
                  setColumns((s) => {
                    const columns = [...s];
                    [columns[idx], columns[idx - 1]] = [
                      columns[idx - 1],
                      columns[idx],
                    ];
                    return columns;
                  });
                }}
              >
                <FaAngleUp />
              </button>
              <button
                type="button"
                onClick={() => {
                  if (idx >= columns.length - 1) return;
                  setColumns((c) => {
                    const columns = [...c];
                    [columns[idx], columns[idx + 1]] = [
                      columns[idx + 1],
                      columns[idx],
                    ];
                    return columns;
                  });
                }}
              >
                <FaAngleDown />
              </button>
            </div>
          </div>
        ))}
      </div>
      <button className="btn dark-white" type="button" onClick={addColumn}>
        <FaPlus /> add new column
      </button>
      <button className="btn" type="submit">
        save changes
      </button>
    </form>
  );
}

export default EditBoard;
