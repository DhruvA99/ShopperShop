import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import classes from "./Navbar.module.css";
import { connect } from "react-redux";
import LogoImage from "../../util/images/LogoImage.svg";

const Navbar = (props) => {
  const [drawer, setDrawer] = useState(false);
  let page = (
    <div>
      <nav className={classes.mainNav}>
        <div className={classes.logo}>
          <img src={LogoImage} alt="Logo" onClick={() => setDrawer(!drawer)} />
        </div>
        <ul className={`${classes.navList}  ${drawer ? null : classes.remove}`}>
          <NavLink className={classes.item} to="/">
            HOME
          </NavLink>
          <NavLink className={classes.item} to="/checkout">
            CHECKOUT
          </NavLink>
          <NavLink className={classes.item} to="/login">
            LOGIN
          </NavLink>
          <NavLink className={classes.item} to="/signup">
            SIGNUP
          </NavLink>
        </ul>
      </nav>
    </div>
  );
  if (props.isAuthenticated) {
    page = (
      <div>
        <nav className={classes.mainNav}>
          <div className={classes.logo}>
            <img
              src={LogoImage}
              alt="Logo"
              onClick={() => setDrawer(!drawer)}
            />
          </div>
          <ul
            className={`${classes.navList}  ${drawer ? null : classes.remove}`}
          >
            <NavLink className={classes.item} to="/">
              HOME
            </NavLink>
            <NavLink className={classes.item} to="/checkout">
              CHECKOUT
            </NavLink>
            <NavLink className={classes.item} to="/logout">
              LOGOUT
            </NavLink>
          </ul>
        </nav>
      </div>
    );
  }
  return <div>{page}</div>;
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.authToken !== null,
});

export default connect(mapStateToProps, null)(Navbar);
