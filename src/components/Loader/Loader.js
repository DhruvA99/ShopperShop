import React from "react";
import classes from "./Loader.module.css";

const loader = (props) => {
  return (
    <div className={classes.loading}>
      <div className={classes.dotcolor}></div>
      <div className={classes.dotcolor}></div>
      <div className={classes.dotcolor}></div>
      <div className={classes.dotcolor}></div>
    </div>
  );
};

export default loader;
