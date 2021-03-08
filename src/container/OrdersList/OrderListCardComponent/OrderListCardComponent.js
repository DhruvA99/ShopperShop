// @ts-nocheck
import React, { useState } from "react";
import classes from "./OrderListCardComponent.module.css";
import Modal from "../../../components/Modal/Modal";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

const OrderListCardComponent = (props) => {
  // const [productdata,setproductdata]=useState(props.productData);
  const [returnModal, setReturnModal] = useState(false);
  const [returnReasonValue, setReturnReasonValue] = useState({
    reason: "size is too small",
    additionalDetails: "",
  });
  const [modalData, setModalData] = useState({ id: null, status: null });
  const [reviewModal, setReviewModal] = useState(false);
  const [reviewData, setReviewData] = useState({ id: null, productName: null });
  const [reviewFormData, setReviewFormData] = useState({
    rating: 1,
    review: "",
  });
  const [reviewErrors, setReviewErrors] = useState({ review: "" });
  const [isValid, setIsValid] = useState(false);

  const onChangeHandler2 = (e) => {
    setReturnReasonValue((returnReasonValue) => ({
      ...returnReasonValue,
      [e.target.name]: e.target.value,
    }));
  };

  const onChangeHandler1 = (e) => {
    setReviewFormData((reviewFormData) => ({
      ...reviewFormData,
      [e.target.name]: e.target.value,
    }));
    let Valid = false;
    let error = { ...reviewErrors };
    switch (e.target.name) {
      case "review":
        error.review = e.target.value < 1 ? "Review cannot be left empty" : "";
        break;
      default:
        break;
    }
    if (error.review === "" && reviewFormData.review !== "") {
      Valid = true;
    }
    setReviewErrors(error);
    setIsValid(Valid);
  };

  const returnModalOpenHandler = () => {
    setReturnModal((returnModal) => !returnModal);
  };

  const reviewModalOpenHandler = () => {
    setReviewModal((reviewModal) => !reviewModal);
  };

  const reviewDeleteHandler = (id, productName) => {
    props.handleReviewDelete(
      props.list,
      id,
      props.postId,
      productName,
      props.email
    );
  };

  const returnSubmitHandler = (data) => {
    props.returnHandler(
      props.list,
      props.postId,
      data.id,
      data.status,
      returnReasonValue
    );
    returnModalOpenHandler();
  };
  const reviewSubmitHandler = (data) => {
    const userReview = {
      name: props.email,
      rating: reviewFormData.rating,
      review: reviewFormData.review,
    };
    // props.productData[key.productName]
    props.reviewHandler(
      props.list,
      reviewData.id,
      props.postId,
      reviewData.productName,
      userReview
    );
    reviewModalOpenHandler();
  };

  const ReturnHandler = (id, status) => {
    returnModalOpenHandler();
    const data = { id: id, status: status };
    setModalData({ ...data });
  };

  const ReviewHandler = (id, productName) => {
    reviewModalOpenHandler();
    setReviewData({
      id: id,
      productName: productName,
    });
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

  //  for(item in props.productData[key.productName]){

  //   }

  let page = <p>Loading...</p>;
  if (!props.loading) {
    page = (
      <div className={classes.container}>
        {props.list.map((key) => {
          return (
            <div key={key.id} className={classes.itemContainer}>
              <Link
                style={{ textDecoration: "none" }}
                to={{
                  pathname: `/item/${key.id.slice(0, -3)}`,
                  state: {
                    data: props.productData[key.productName],
                    productName: key.productName,
                  },
                }}
              >
                <img className={classes.itemImage} src={key.url} alt="img" />
              </Link>
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
                    </div>
                  </div>
                )}

                {key.orderStatus > 2 ? (
                  !key.reviewCheck ? (
                    !Object.values(
                      props.productData[key.productName].reviews
                    ).find((item) => item.name === props.email) ? (
                      <button
                        onClick={() => ReviewHandler(key.id, key.productName)}
                      >
                        Add a Review
                      </button>
                    ) : (
                      <p>Review already added from other purchase</p>
                    )
                  ) : (
                    <div>
                      <p>Review Already Added</p>
                      <button
                        onClick={() =>
                          reviewDeleteHandler(key.id, key.productName)
                        }
                      >
                        Remove Review
                      </button>
                    </div>
                  )
                ) : null}

                <div className={classes.buttonDiv}>
                  {key.orderStatus <= 2 && key.status !== "CANCEL" ? (
                    <button onClick={() => CancelHandler(key.id, "CANCEL")}>
                      CANCEL ORDER
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
          isOpen={reviewModal}
          openHandler={reviewModalOpenHandler}
          submitHandler={reviewSubmitHandler}
          submitButton={true}
          submitText="Add Review"
          modalData={{}}
          isValid={isValid}
        >
          <div className={classes.Form}>
            <span className={classes.FormSpan}>Rating</span>
            <select
              className={classes.formInput}
              name="rating"
              value={reviewFormData.rating}
              onChange={onChangeHandler1}
            >
              <option value={1}>1</option>
              <option value={2}>2</option>
              <option value={3}>3</option>
              <option value={4}>4</option>
              <option value={5}>5</option>
            </select>
            <span className={classes.FormSpan}>Review</span>
            <input
              name="review"
              className={classes.formInput}
              onChange={onChangeHandler1}
              value={reviewFormData.review}
              type="text"
            />{" "}
            <p>
              <small>{reviewErrors.review}</small>
            </p>
          </div>
        </Modal>
        <Modal
          isOpen={returnModal}
          openHandler={returnModalOpenHandler}
          submitHandler={returnSubmitHandler}
          submitButton={true}
          submitText="Return"
          modalData={modalData}
          isValid={true}
        >
          <div className={classes.Form}>
            <span className={classes.FormSpan}>
              Why do you want to return the item?
            </span>
            <select
              className={classes.formInput}
              name="reason"
              onChange={onChangeHandler2}
              value={returnReasonValue.reason}
            >
              <option value="size is too small">SIZE IS TOO SMALL</option>
              <option value="size is too large">SIZE IS TOO LARGE</option>
              <option value="the product is not as described">
                THE PRODUCT IS NOT AS DESCRIBED
              </option>
              <option value="product is defective">PRODUCT IS DEFECTIVE</option>
            </select>
            <span className={classes.FormSpan}>Other Details</span>
            <input
              className={classes.formInput}
              name="additionalDetails"
              onChange={onChangeHandler2}
              value={returnReasonValue.additionalDetails}
              type="text"
            />{" "}
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

const mapStateToProps = (state) => ({});

export default connect(mapStateToProps)(OrderListCardComponent);
