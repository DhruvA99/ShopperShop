import React from "react";
import Navbar from "../../components/Navigation/Navbar";
import classes from "./Wishlist.module.css";

class WishList extends React.Component {
  render() {
    let page = <p>No items in your list</p>;
    return (
      <div>
        <Navbar />
        <div className={classes.headingDiv}>
          <span className={classes.heading}>Your WishList</span>
        </div>
        <hr />
        <div className={classes.wishlistItemDiv}>{page}</div>
      </div>
    );
  }
}

export default WishList;
