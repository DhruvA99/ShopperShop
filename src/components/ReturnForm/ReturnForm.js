import Modal from "components/Modal/Modal";
import React from "react";
import Modal from "../Modal/Modal";
import classes from "./ReturnForm.module.css";

const ReturnForm = (props) => {
  return (
    <Modal isOpen={props.isOpen} openHandler={props.openHandler}>
      <div>
        <p>Why do you want to return the item?</p>
        <select>
          <option>SIZE IS TOO SMALL</option>
          <option>SIZE IS TOO LARGE</option>
          <option>THE PRODUCT IS NOT AS DESCRIBED</option>
          <option>PRODUCT IS DEFECTIVE</option>
        </select>
        <span>Other Details</span>
        <input type="text" />{" "}
      </div>
    </Modal>
  );
};

export default ReturnForm;
