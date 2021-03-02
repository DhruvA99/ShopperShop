// @ts-nocheck
import React, { useEffect, useState } from "react";
import classes from "./OrderListCardComponent.module.css";
import Modal from "../../../components/Modal/Modal";

const OrderListCardComponent = (props) => {
  const [returnModal, setReturnModal] = useState(false);
  const [returnReasonValue, setReturnReasonValue] = useState(
    "size is too small"
  );
  const [modalData, setModalData] = useState({ id: null, status: null });

  const returnModalOpenHandler = () => {
    setReturnModal((returnModal) => !returnModal);
  };

  const returnSubmitHandler = (id, status) => {
    props.returnHandler(props.list, props.postId, id, status);
  };

  const ReturnHandler = (id, status) => {
    returnModalOpenHandler();
    const data = { id: id, status: status };
    setModalData({ ...data });
  };

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

  const CancelHandler = (id, status) => {
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
                <p>Quantity: {key.quantity}</p>
                {key.status === "CANCEL" ? null : <h4>{getTime()}</h4>}
                {key.status === "CANCEL" ? (
                  "CANCELLATION IS IN PROGRESS.DETAILS WILL BE SHARED SHORTLY WITH YOU"
                ) : (
                  <div className={classes.orderStatus}>
                    <div className={classes.orderStatusItem}>
                      <i
                        className={`fa fa-check-circle fa-2x ${
                          key.orderStatus > 0 ? classes.green : classes.red
                        }`}
                        aria-hidden="true"
                      ></i>
                      <p>Order Started</p>
                    </div>
                    <div className={classes.orderStatusItem}>
                      <i
                        className={`fa fa-check-circle fa-2x ${
                          key.orderStatus > 1 ? classes.green : classes.red
                        }`}
                        aria-hidden="true"
                      ></i>
                      <p>Order Shipped</p>
                    </div>
                    <div className={classes.orderStatusItem}>
                      <i
                        className={`fa fa-check-circle fa-2x ${
                          key.orderStatus > 2 ? classes.green : classes.red
                        }`}
                        aria-hidden="true"
                      ></i>
                      <p>Order Recieved</p>
                      {key.orderStatus > 2 && !key.ReviewCheck ? (
                        <button>Add a Review</button>
                      ) : null}
                    </div>
                  </div>
                )}

                <div className={classes.buttonDiv}>
                  {key.orderStatus <= 2 && key.status !== "CANCEL" ? (
                    <button onClick={() => CancelHandler(key.id, "CANCEL")}>
                      CANCEL
                    </button>
                  ) : null}
                  {key.orderStatus > 2 ? (
                    key.status === "NORMAL" ? (
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
                        <button
                          onClick={() =>
                            props.returnHandler(
                              props.list,
                              props.postId,
                              key.id,
                              "NORMAL"
                            )
                          }
                        >
                          CANCEL RETURN
                        </button>
                      </div>
                    )
                  ) : null}
                </div>
              </div>
            </div>
          );
        })}
        <p>Discount: {props.discount}</p>
        <p>Total Price: {props.totalPrice}</p>
        <Modal
          isOpen={returnModal}
          openHandler={returnModalOpenHandler}
          submitHandler={returnSubmitHandler}
          submitButton={true}
          submitText="Return"
          modalData={modalData}
        >
          <div className={classes.Form}>
            <span className={classes.FormSpan}>
              Why do you want to return the item?
            </span>
            <select
              className={classes.formInput}
              value={returnReasonValue}
              defaultValue={"size is too small"}
            >
              <option value="size is too small">SIZE IS TOO SMALL</option>
              <option value="size is too large">SIZE IS TOO LARGE</option>
              <option value="the product is not as described">
                THE PRODUCT IS NOT AS DESCRIBED
              </option>
              <option value="product is defective">PRODUCT IS DEFECTIVE</option>
            </select>
            <span className={classes.FormSpan}>Other Details</span>
            <input className={classes.formInput} type="text" />{" "}
          </div>
        </Modal>
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
