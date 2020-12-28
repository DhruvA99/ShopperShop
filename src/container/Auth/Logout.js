import React, { useEffect } from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { logout } from "../../redux/actions/actionCreator";

const Login = (props) => {
  useEffect(() => {
    props.logout();
  }, [props]);
  return (
    <div>
      <Redirect to="/" />
    </div>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    logout: () => {
      dispatch(logout());
    },
  };
};

export default connect(null, mapDispatchToProps)(Login);
