import React from "react";
import classes from "./OrderListCardComponent.module.css";

const OrderListCardComponent = (props) => {
  const getTime = () => {
    let time = Math.floor(
      (new Date().getTime() - props.time) / (60 * 60 * 24 * 1000)
    );
    if (time > 7) {
      return "Return not possible";
    } else {
      return 7 - time + " days left for return";
    }
  };

  const ReturnHandler = (id, status) => {
    props.returnHandler(props.list, props.postId, id, status);
  };
  let page = <p>Loading...</p>;
  if (!props.loading) {
    page = (
      <div className={classes.container}>
        {props.list.map((key) => {
          return (
            <div key={key.id} className={classes.itemContainer}>
              <img className={classes.itemImage} src={key.url} alt="img" />
              <div className={classes.itemsFlexBox}>
                <h2>{key.name}</h2>
                <p>Size: {key.size}</p>
                <p>Item Price: {key.price}</p>
                <h4>{getTime()}</h4>
                <div className={classes.buttonDiv}>
                  {key.status === "NORMAL" ? (
                    props.time + 604800000 > new Date().getTime() ? (
                      <button onClick={() => ReturnHandler(key.id, "RETURN")}>
                        RETURN
                      </button>
                    ) : (
                      <button>RETURN NOT POSSIBLE</button>
                    )
                  ) : (
                    <div>
                      <h3 style={{ color: "green" }}>
                        This Item is already requested for return
                      </h3>
                      <button onClick={() => ReturnHandler(key.id, "NORMAL")}>
                        CANCEL RETURN
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
        <p>Discount: {props.discount}</p>
        <p>Total Price: {props.totalPrice}</p>
      </div>
    );
  }

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
