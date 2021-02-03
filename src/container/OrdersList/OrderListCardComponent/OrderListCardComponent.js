import React from "react";
import classes from "./OrderListCardComponent.module.css";

const OrderListCardComponent = (props) => {
  let page = (
    <div className={classes.container}>
      {props.list.map((key) => {
        return (
          <div key={key.id} className={classes.itemContainer}>
            <p>{key.name}</p>
            <p>{key.size}</p>
            <p>{key.price}</p>
          </div>
        );
      })}
      <p>Discount: {props.discount}</p>
      <p>Total Price: {props.totalPrice}</p>
    </div>
  );
  // Object.keys(props.data).map((key) => {

  // });
  return (
    <div className={classes.main}>
      <div className={classes.mainHeadingDiv}>
        <span className={classes.heading}>{props.date}</span>
        {page}
      </div>
    </div>
  );
};

export default OrderListCardComponent;
