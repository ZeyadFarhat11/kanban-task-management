import React, { useState } from "react";
import logo from "../../imgs/logo.svg";
import { FaAngleDown, FaPlus } from "react-icons/fa";
import { BsThreeDots } from "react-icons/bs";
import { useGlobalContext } from "../../context";
import "./style.scss";

function Navbar() {
  const {
    setSidebarOpen,
    setOverlay,
    setAddNewTask,
    setEditBoard,
    setApp,
    currentBoard,
    setDeleteConfirm,
    closeAll,
  } = useGlobalContext();
  const [submenu, setSubmenu] = useState(false);

  if (!currentBoard) return;

  const deleteBoard = () => {
    setSubmenu(false);
    setOverlay(true);

    const onclick = () => {
      setApp((app) => {
        const appCopy = { ...app };
        console.log(appCopy);
        appCopy.boards =
          appCopy.boards.filter((e) => e.id !== currentBoard.id) || [];
        return appCopy;
      });
      closeAll();
    };

    const cancel = () => {
      setDeleteConfirm(null);
      setOverlay(false);
    };
    setDeleteConfirm({
      cancel,
      onClick: onclick,
      title: "Delete this board?",
      message: `Are you sure you want to delete the "${currentBoard.title}" board? This action will remove all columns and tasks and cannot be reversed.`,
    });
  };

  return (
    <nav id="navbar">
      <div className="logo">
        <img src={logo} alt="" />
        <h2>kanban</h2>
      </div>
      <h2 className="current-board">
        {currentBoard.title}
        <button
          className="toggle-sidebar"
          type="button"
          onClick={() => {
            setSidebarOpen((s) => {
              setOverlay(!s);
              return !s;
            });
          }}
        >
          <FaAngleDown />
        </button>
      </h2>{" "}
      <button
        className="btn"
        type="button"
        onClick={() => {
          setAddNewTask(true);
          setOverlay(true);
        }}
      >
        <FaPlus />
        <span>add new task</span>
      </button>
      <button
        className="toggle-menu"
        type="button"
        onClick={() => setSubmenu((e) => !e)}
      >
        <BsThreeDots />
      </button>
      <div className={`submenu${submenu ? " active" : ""}`}>
        <button
          type="button"
          onClick={() => {
            setOverlay(true);
            setEditBoard(true);
            setSubmenu(false);
          }}
        >
          Edit board
        </button>
        <button type="button" className="delete" onClick={deleteBoard}>
          Delete board
        </button>
      </div>
    </nav>
  );
}

export default Navbar;
