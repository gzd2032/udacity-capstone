import React from "react";
import ReactDOM from "react-dom";
import "./Modal.css";
import ModelContent from "./ModelContent";

export default function Modal({
  open,
  onClose,
  itemDetails,
  deleteItem,
  updateItem,
}) {
  if (!open) return null;

  return ReactDOM.createPortal(
    <>
      <div onClick={onClose} className="overlay"></div>
      <div className="modalStyle">
        <button className="closeBtn" onClick={onClose}>X</button>
        <ModelContent
          itemDetails={itemDetails}
          deleteItem={deleteItem}
          updateItem={updateItem}
        />
      </div>
    </>,
    document.getElementById("portal")
  );
}
