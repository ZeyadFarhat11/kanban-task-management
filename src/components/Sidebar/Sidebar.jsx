import React from "react";
import { BsFillMoonStarsFill, BsSunFill } from "react-icons/bs";
import { FaPlus } from "react-icons/fa";
import { FiEyeOff } from "react-icons/fi";
import "./style.scss";
import BoardIcon from "../Icons/BoardIcon";
import { useGlobalContext } from "../../context";

function Sidebar() {
  const {
    sidebarOpen,
    app,
    currentBoard,
    setCurrentBoard,
    setAddNewBoard,
    setOverlay,
    setSidebarOpen,
  } = useGlobalContext();
  return (
    <div className={`sidebar`}>
      <div className={`dropdown-container${sidebarOpen ? " active" : ""}`}>
        <div className="wrapper">
          <h3 className="boards-count">
            all boards ({app?.boards?.length || 0})
          </h3>
          {app?.boards?.map((board) => (
            <button
              className={`sidebar-board${
                board?.id === currentBoard?.id ? " active" : ""
              }`}
              key={board.id}
              onClick={() => {
                setCurrentBoard(board);
              }}
            >
              <BoardIcon />
              {board.title}
            </button>
          ))}
          <button
            className="create"
            onClick={() => {
              setAddNewBoard(true);
              setOverlay(true);
            }}
          >
            <BoardIcon />
            <FaPlus />
            create new board
          </button>
        </div>
        <div className="switch-mode">
          <BsSunFill />
          <label htmlFor="mode"></label>
          <input
            type="checkbox"
            style={{ display: "none" }}
            onChange={(e) => window.document.body.classList.toggle("dark")}
            id="mode"
          />
          <BsFillMoonStarsFill />
        </div>
      </div>
      <button className="hide-sidebar" onClick={() => setSidebarOpen(false)}>
        <FiEyeOff />
        hide sidebar
      </button>
    </div>
  );
}

export default Sidebar;
