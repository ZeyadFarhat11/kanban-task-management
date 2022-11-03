import React, { useRef, useState } from "react";
import { FaAngleDown, FaAngleUp, FaPlus } from "react-icons/fa";
import { MdOutlineClose } from "react-icons/md";
import "./style.scss";
import { randomId } from "../../utils";
import { useGlobalContext } from "../../context";

const initialColumns = [
  { title: "Todo", id: randomId(), error: false },
  { title: "Doing", id: randomId(), error: false },
];

function AddNewBoard() {
  const { setApp, closeAll } = useGlobalContext();
  const boardNameRef = useRef();
  const [columns, setColumns] = useState(initialColumns);

  const createBoard = (boardName, columns) => {
    console.log("creating board");
    setApp((app) => {
      return {
        boards: [
          ...app.boards,
          {
            title: boardName,
            id: randomId(),
            columns: columns.map((col) => ({
              title: col.title,
              tasks: [],
              id: randomId(),
            })),
          },
        ],
      };
    });
    closeAll();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const boardName = boardNameRef.current?.value;
    if (boardName.trim()) {
      // Valid Board Name
      boardNameRef.current.style.borderColor = null;
      if (columns.every((e) => e.title.trim())) {
        // Valid To Create Board
        createBoard(boardName, columns);
      } else {
        // Some Inputs Empty
        setColumns((columns) => {
          return columns.map((col) => {
            if (col.title.trim()) {
              return { ...col, error: false };
            }
            return { ...col, error: true };
          });
        });
      }
    } else {
      // Unvalid Board Name
      boardNameRef.current.style.borderColor = "#dc3545";
    }
  };

  const addColumn = () => {
    setColumns((columns) => [
      ...columns,
      { title: "", id: randomId(), error: false },
    ]);
  };

  return (
    <form className="main-form" onSubmit={handleSubmit}>
      <h3>Add new board</h3>
      <div className="input-group">
        <label htmlFor="board-name" className="label">
          board name
        </label>
        <input
          type="text"
          id="board-name"
          placeholder="e.g. Web Design"
          ref={boardNameRef}
        />
      </div>
      <div className="input-group">
        <span className="label">board columns</span>
        {columns.map(({ id, title, error }, idx) => (
          <div className="input-control" key={id}>
            <input
              type="text"
              className={error ? " error" : ""}
              value={title}
              onChange={(e) => {
                setColumns((columns) => {
                  return columns.map((column) => {
                    if (column.id === id) {
                      return { ...column, title: e.target.value };
                    }
                    return column;
                  });
                });
              }}
            />
            <div className="tools">
              <button
                type="button"
                onClick={() => {
                  setColumns((columns) => columns.filter((e) => e.id !== id));
                }}
              >
                <MdOutlineClose />
              </button>
              <button
                type="button"
                onClick={() => {
                  if (idx <= 0) return;
                  setColumns((c) => {
                    const columns = [...c];
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
        create new board
      </button>
    </form>
  );
}

export default AddNewBoard;
