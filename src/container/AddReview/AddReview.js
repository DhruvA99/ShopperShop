import react from "react";
import React from "react";
import classes from "./AddReview.module.css";
import { connect } from "react-redux";

class AddReview extends React.Component {
  state = {
    review: "",
  };

  onChangeHandler = (e) => {
    this.setState({ review: e.target.value });
  };
  render() {
    return (
      <div className={classes.main}>
        <div className={classes.inputContainer}>
          <textarea
            className={classes.input}
            type="text"
            maxLength="200"
            minLength="5"
            value={this.state.review}
            onChange={this.onChangeHandler}
          ></textarea>
          <button className={classes.button}>Add</button>
        </div>
        <hr className={classes.hr} />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({});

const mapDispatchToProps = (dispatch) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(AddReview);
