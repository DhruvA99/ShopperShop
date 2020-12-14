import React from "react";
import "./Reviews.module.css";
import classes from "./Reviews.module.css";

const Reviews = (props) => {
  let data = [];
  if (props.reviews !== undefined) {
    data = Object.keys(props.reviews).map((key) => {
      let card = [];
      card = [...Array(props.reviews[key].rating)].map((e) => (
        <span key={props.reviews[key].name}>&#9733;</span>
      ));
      return (
        <div className={classes.main}>
          <h3>{props.reviews[key].name}</h3>
          {card}
          <p>{props.reviews[key].review}</p>
        </div>
      );
    });
  } else {
    data = <p>No reviews till now</p>;
  }
  return (
    <div className={classes.main}>
      <div>{data}</div>
    </div>
  );
};

export default Reviews;
