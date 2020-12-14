import React from "react";
import classes from "./CardComponent.module.css";

const cardComponent = (props) => {
  return (
    <div className={classes.main}>
      <div className={classes.card}>
        <img className={classes.Image} src={props.data.url} alt="Avatar" />
        <div className={classes.container}>
          <h4>
            <b>Rs. {props.data.price}</b>
          </h4>
          <p>{props.data.name}</p>
        </div>
      </div>
    </div>
  );
};

export default cardComponent;
