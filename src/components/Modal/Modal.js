import React from "react";
import classes from "./Modal.module.css";

const Modal = (props) => {
  return (
    <div className={props.isOpen ? classes.modal : classes.modalClose}>
      <div className={classes.modalContent}>
        <span className={classes.close} onClick={props.openHandler}>
          &times;
        </span>
        <div>{props.children}</div>
        {props.submitButton ? (
          <button onClick={() => props.submitHandler(props.modalData)}>
            {props.submitText}
          </button>
        ) : null}
      </div>
    </div>
  );
};

export default Modal;
