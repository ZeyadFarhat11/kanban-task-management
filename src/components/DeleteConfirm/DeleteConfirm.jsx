import React from "react";
import { useGlobalContext } from "../../context";
import "./style.scss";

function DeleteConfirm() {
  const {
    deleteConfirm: { title, onClick, message, cancel },
  } = useGlobalContext();
  return (
    <div className="main-form confirm">
      <h3 className="title">{title}</h3>
      <p className="msg">{message}</p>
      <div className="btn-container">
        <button className="delete" type="button" onClick={onClick}>
          delete
        </button>
        <button className="cancel" type="button" onClick={cancel}>
          cancel
        </button>
      </div>
    </div>
  );
}

export default DeleteConfirm;
