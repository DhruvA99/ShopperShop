import React from "react";
import Navbar from "../../components/Navigation/Navbar";
import classes from "./Wishlist.module.css";
import { connect } from "react-redux";
import {
  wishlistData,
  wishlistDeleteData,
} from "../../redux/actions/actionCreator";
import { Link } from "react-router-dom";

class WishList extends React.Component {
  state = {};

  componentDidMount() {
    console.log("cdm");
    this.props.wishlistData(this.props.userId, this.props.authToken);
  }

  // componentDidUpdate(prevProps) {
  //   if (JSON.stringify(this.props.items) !== JSON.stringify(prevProps.items)) {
  //     console.log("cdm wishlist " + prevProps.items + " " + this.props.items);
  //     this.props.wishlistData(this.props.userId, this.props.authToken);
  //   }
  // }

  handleDeleteButton = (postId) => {
    this.props.wishlistDeleteData(
      this.props.userId,
      postId,
      this.props.authToken
    );
  };

  render() {
    const { loading, authToken, items } = this.props;
    let page = <p>No items in your list</p>;
    if (loading !== null && authToken !== null && items !== null) {
      console.log("yes!!");
      page = Object.keys(items).map((key) => {
        let item = items[key];
        console.log(item.productName);
        return (
          <>
            <div key={item.id} className={classes.card}>
              <Link
                style={{ textDecoration: "none", color: "black" }}
                to={{
                  pathname: `/item/${item.id}`,
                  state: {
                    data: this.props.productData[item.productName],
                    productName: item.productName,
                  },
                }}
              >
                <img className={classes.img} src={item.url} alt="Avatar" />
              </Link>
              <div key={item.id} className={classes.container}>
                <h4>
                  <b>{item.name}</b>
                </h4>
                <h4>Price: &#8377;{item.price}</h4>
                <button
                  className={classes.buttonDelete}
                  onClick={() => this.handleDeleteButton(key)}
                >
                  Delete
                </button>
              </div>
            </div>
          </>
        );
      });
    }
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

const mapStateToProps = (state) => ({
  authToken: state.auth.authToken,
  items: state.wishlist.items,
  userId: state.auth.userId,
  productData: state.item.data,
  loading: state.wishlist.loading,
});

const mapDispatchToProps = (dispatch) => ({
  wishlistData: (userId, authToken) => {
    dispatch(wishlistData(userId, authToken));
  },
  wishlistDeleteData: (userId, postId, authToken) => {
    dispatch(wishlistDeleteData(userId, postId, authToken));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(WishList);
