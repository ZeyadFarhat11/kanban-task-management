import { createContext, useState, useContext, useEffect } from "react";
import { app as initialApp } from "./data";

const Context = createContext();

function AppProvider({ children }) {
  const [app, setApp] = useState();
  const [sidebarOpen, setSidebarOpen] = useState(
    !window.matchMedia("(max-width: 768px)").matches
  );
  const [overlay, setOverlay] = useState(false);
  const [currentBoard, setCurrentBoard] = useState();
  const [addNewBoard, setAddNewBoard] = useState(false);
  const [addNewTask, setAddNewTask] = useState(false);
  const [editBoard, setEditBoard] = useState(false);
  const [currentTask, setCurrentTask] = useState();
  const [showTask, setShowTask] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState(false);
  const [editTask, setEditTask] = useState(false);

  const closeAll = () => {
    if (deleteConfirm) return;
    if (editTask) {
      setEditTask(false);
      setShowTask(true);
      return;
    }
    setOverlay(false);
    if (window.innerWidth <= 768) {
      setSidebarOpen(false);
    }
    setAddNewBoard(false);
    setAddNewTask(false);
    setEditBoard(false);
    setShowTask(false);
    setDeleteConfirm(false);
  };

  useEffect(() => {
    setApp(() => {
      const app = localStorage.kanban
        ? JSON.parse(localStorage.kanban)
        : initialApp;
      setCurrentBoard(app.boards[0]);
      return app;
    });
  }, []);

  useEffect(() => {
    if (app) {
      localStorage.setItem("kanban", JSON.stringify(app));

      setCurrentBoard(
        app.boards.find((board) => board?.id === currentBoard?.id) ||
          app.boards[0]
      );
    }
  }, [JSON.stringify(app)]);

  return (
    <Context.Provider
      value={{
        app,
        setApp,
        sidebarOpen,
        setSidebarOpen,
        overlay,
        setOverlay,
        closeAll,
        currentBoard,
        setCurrentBoard,
        addNewBoard,
        setAddNewBoard,
        addNewTask,
        setAddNewTask,
        editBoard,
        setEditBoard,
        currentTask,
        setCurrentTask,
        showTask,
        setShowTask,
        deleteConfirm,
        setDeleteConfirm,
        editTask,
        setEditTask,
      }}
    >
      {children}
    </Context.Provider>
  );
}

export const useGlobalContext = () => useContext(Context);

export default AppProvider;
