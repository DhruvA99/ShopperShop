import React from "react";
import classes from "./Footer.module.css";

const Footer = (props) => {
  return (
    <div className={classes.main}>
      <div className={classes.container}>
        <div className={classes.item1}>
          <h1>
            <span className={classes.colorChange}>Shopper</span>
            <span className={classes.colorChange2}>Shop</span>
          </h1>
          <p className={classes.paragraphText}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
            culpa qui officia deserunt mollit anim id est laborum.
          </p>
          <div className={classes.socialBar}></div>
        </div>
        <div className={classes.item2}>
          <h1 className={classes.colorChange}>Our Details</h1>
          <p>
            <b>Address:</b>123-block,d road,bangalore-000000
          </p>
          <p>
            <b>Email:</b>customerShoppperShop@da.com
          </p>
          <p>
            <b>Mobile:</b>180091928493
          </p>
        </div>
      </div>
    </div>
  );
};

export default Footer;
