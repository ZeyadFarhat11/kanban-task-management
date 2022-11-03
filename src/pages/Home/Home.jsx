import React from "react";
import { FaEye } from "react-icons/fa";
import AddNewBoard from "../../components/AddNewBoard/AddNewBoard";
import AddTask from "../../components/AddTask/AddTask";
import Board from "../../components/Board/Board";
import EditBoard from "../../components/EditBoard/EditBoard";
import Navbar from "../../components/Navbar/Navbar";
import NoBoards from "../../components/NoBoards/NoBoards";
import Sidebar from "../../components/Sidebar/Sidebar";
import Task from "../../components/Task/Task";
import { useGlobalContext } from "../../context";
import DeleteConfirm from "../../components/DeleteConfirm/DeleteConfirm";
import "./style.scss";
import EditTask from "../../components/EditTask/EditTask";

function Home() {
  const {
    overlay,
    closeAll,
    addNewBoard,
    addNewTask,
    editBoard,
    sidebarOpen,
    setSidebarOpen,
    showTask,
    app,
    deleteConfirm,
    editTask,
  } = useGlobalContext();

  if (!app) return;

  return (
    <>
      {app.boards.length !== 0 ? <Navbar /> : null}
      <main
        id="home"
        style={{ gridTemplateColumns: sidebarOpen ? "270px 1fr" : "0 1fr" }}
      >
        {overlay ? <div className="overlay" onClick={closeAll}></div> : null}
        {addNewBoard ? <AddNewBoard /> : null}
        {addNewTask ? <AddTask /> : null}
        {editBoard ? <EditBoard /> : null}
        {showTask ? <Task /> : null}
        {editTask ? <EditTask /> : null}
        {!sidebarOpen ? (
          <button
            className="open-sidebar"
            type="button"
            onClick={() => {
              console.log(`true`);
              setSidebarOpen(true);
            }}
          >
            <FaEye />
          </button>
        ) : null}
        {deleteConfirm ? <DeleteConfirm /> : null}
        {app.boards.length === 0 ? (
          <NoBoards />
        ) : (
          <>
            <Sidebar />
            <Board />
          </>
        )}
      </main>
    </>
  );
}

export default Home;
