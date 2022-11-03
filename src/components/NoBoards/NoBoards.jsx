import React from "react";
import { FaPlus } from "react-icons/fa";
import { useGlobalContext } from "../../context";
import "./style.scss";

function NoBoards() {
  const { setAddNewBoard, setOverlay } = useGlobalContext();
  return (
    <div className="no-boards">
      <h2>There are no boards available. Create a new board to get started</h2>
      <button
        className="btn"
        onClick={() => {
          setOverlay(true);
          setAddNewBoard(true);
        }}
      >
        <FaPlus /> add new board
      </button>
    </div>
  );
}

export default NoBoards;
