import classes from "./Login.module.css";
import React from "react";
import { connect } from "react-redux";
import Navbar from "../../../components/Navigation/Navbar";
import {
  authGetStarted,
  errorClear,
} from "../../../redux/actions/actionCreator";

const validEmailRegex = RegExp(
  /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i
);

class Login extends React.Component {
  state = {
    email: null,
    password: null,
    loading: false,
    token: null,
    error: {
      email: "",
      password: "",
    },
    isValid: false,
  };

  componentDidMount() {
    this.props.errorClear();
  }

  onChangeHandler = (e) => {
    const { name, value } = e.target;
    let Valid = false;
    this.setState({ [name]: value });
    let errors = { ...this.state.error };
    switch (name) {
      case "email":
        errors.email = validEmailRegex.test(value) ? "" : "Email is not valid!";
        break;
      case "password":
        errors.password =
          value.length < 8 ? "Password must be 8 characters long" : "";
        break;
      default:
        break;
    }
    if (
      errors.password === "" &&
      errors.email === "" &&
      this.state.email !== null &&
      this.state.password !== null
    ) {
      Valid = true;
    }
    this.setState({ error: errors, isValid: Valid });
  };

  submitHandler = (e) => {
    e.preventDefault();
    this.props.authGetStarted(this.state.email, this.state.password, false);
  };

  render() {
    if (this.props.isAuthenticated) {
      this.props.history.push("/");
    }
    let page = <p>Loading...</p>;
    if (!this.props.loading) {
      page = (
        <div className={classes.main}>
          <div className={classes.card}>
            <form
              className={classes.form}
              onSubmit={(event) => this.submitHandler(event)}
            >
              <span className={classes.titleText}>LOGIN</span>
              <div className={classes.inputDiv}>
                <input
                  className={classes.input}
                  name="email"
                  type="email"
                  placeholder="Email"
                  onChange={(event) => this.onChangeHandler(event)}
                />
                <span>{this.state.error.email}</span>
              </div>
              <div className={classes.inputDiv}>
                <input
                  className={classes.input}
                  name="password"
                  type="password"
                  placeholder="Password"
                  onChange={(event) => this.onChangeHandler(event)}
                />
                <span>{this.state.error.password}</span>
              </div>
              <div className={classes.buttonDiv}>
                <button
                  disabled={!this.state.isValid}
                  type="submit"
                  className={classes.button}
                >
                  LOGIN
                </button>
              </div>
              <span style={{ margin: "auto", padding: "10px", color: "red" }}>
                <strong>{this.props.error}</strong>
              </span>
            </form>
          </div>
        </div>
      );
    }
    return (
      <div>
        <Navbar />
        {page}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  loading: state.auth.loading,
  authToken: state.auth.authToken,
  error: state.auth.error,
  isAuthenticated: state.auth.authToken !== null,
});

const mapDispatchToProps = (dispatch) => ({
  authGetStarted: (email, password, isSignUp) => {
    dispatch(authGetStarted(email, password, isSignUp));
  },
  errorClear: () => {
    dispatch(errorClear());
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);
