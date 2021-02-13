import React from "react";
import NavBar from "../../components/Navigation/Navbar";
import classes from "./ItemPage.module.css";
import Reviews from "../../components/Reviews/Reviews";
import {
  addItemCart,
  wishListSendData,
  wishlistData,
} from "../../redux/actions/actionCreator";
import { connect } from "react-redux";
import Footer from "../../components/Footer/Footer";
import AddReview from "../AddReview/AddReview";

class ItemPage extends React.Component {
  state = {
    size: null,
    firstImage: this.props.location.state.url,
    wishlistButtonDisable: false,
    firstRender: true,
    wishlistDisableHandlerCheck: false,
  };
  // componentDidMount() {
  //   if (this.props.authToken !== null) {
  //     this.props.wishlistData(this.props.userId, this.props.authToken);
  //   }
  // }

  imageViewer = (url, id) => {
    this.setState({ firstImage: url });
  };

  wishListDataCallHandler = () => {
    if (this.props.authToken !== null) {
      this.props.wishlistData(this.props.userId, this.props.authToken);
      this.setState({ firstRender: false });
    }
  };

  wishListDisableHandler = () => {
    if (
      this.props.authToken !== null &&
      !this.state.wishlistDisableHandlerCheck &&
      this.props.items !== null
    ) {
      let wishlistButtonDisable = Object.keys(this.props.items).find(
        (key) => this.props.items[key].id === this.props.location.state.id
      )
        ? true
        : false;
      this.setState({
        wishlistButtonDisable,
        wishlistDisableHandlerCheck: true,
      });
    }
  };

  onCartClickHandler = () => {
    //checking if the user has selected a size
    if (this.state.size !== null) {
      const data = {
        id:
          this.props.location.state.id +
          this.state.size +
          ("0" + new Date().getSeconds()).slice(-2),
        name: this.props.location.state.name,
        status: "NORMAL",
        quantity: 1,
        url: this.props.location.state.url,
        size: this.state.size,
        price: this.props.location.state.price,
      };
      this.props.addItemCart(data, data.id);
      // this.props.history.push("/checkout");
    } else {
      alert("please select a size!");
    }
  };

  onWishListClickHandler = () => {
    if (this.props.authToken) {
      const data = {
        id: this.props.location.state.id,
        userId: this.props.userId,
        name: this.props.location.state.name,
        url: this.props.location.state.url,
        price: this.props.location.state.price,
      };
      this.props.wishListSendData(data, this.props.authToken);
      this.setState({ wishlistButtonDisable: true });
    } else {
      alert("Please login first!");
    }
  };

  handleSelectChange = (e) => {
    this.setState({ size: e.target.value });
  };

  render() {
    const {
      id,
      color,
      name,
      brand,
      reviews,
      description,
      price,
      images,
      size,
    } = this.props.location.state;
    if (this.props.wishlistLoading && this.state.firstRender) {
      //this will only be executed once when loading is true and firstRender is set to true
      this.wishListDataCallHandler();
      console.log("wishlist data call handler inside render ");
    }
    if (
      !this.props.wishlistLoading &&
      !this.state.wishlistDisableHandlerCheck
    ) {
      //this will only be executed once(till wishlistdisablehandlercheck is set to true) for componentDidMount
      this.wishListDisableHandler();
    }
    return (
      <>
        {" "}
        <div>
          <NavBar />
          <div className={classes.main}>
            <div className={classes.container}>
              <div className={classes.itemImage}>
                <img
                  className={classes.image}
                  src={this.state.firstImage}
                  alt="img"
                />
                <div className={classes.smallImageBoxDiv}>
                  {images.map((item) => {
                    return (
                      <div
                        className={classes.smallImageBox}
                        onClick={() => this.imageViewer(item.url, item.id)}
                      >
                        <img
                          className={classes.smallImage}
                          src={item.url}
                          alt="img"
                        />
                      </div>
                    );
                  })}
                </div>
              </div>
              <div className={classes.Iteminfo}>
                <h2
                  style={{
                    fontSize: "2em",
                    letterSpacing: "0.2em",
                    paddingLeft: "20px",
                  }}
                >
                  <strong>{name}</strong>
                </h2>
                <hr className={classes.Hr} />
                <br />
                <div style={{ display: "flex" }}>
                  <span style={{ paddingLeft: "20px" }}>COLOR:</span>
                  <div
                    style={{ backgroundColor: color }}
                    className={classes.smallBox}
                  ></div>
                  <br />
                </div>
                <p style={{ paddingLeft: "20px" }}>BRAND: {brand}</p>
                <br />
                <div className={classes.selectSize}>
                  <p style={{ marginRight: "12px" }}>size</p>
                  <select
                    onClick={this.handleSelectChange}
                    defaultValue="-- select an option --"
                  >
                    <option disabled> -- select an option -- </option>
                    {Object.keys(size).map((item) => {
                      if (size[item]) {
                        return (
                          <option key={id + item} value={item}>
                            {item}
                          </option>
                        );
                      } else {
                        return null;
                      }
                    })}
                  </select>
                </div>
                <br />
                <h3 className={classes.price}>PRICE: &#8377;{price}</h3>

                <div className={classes.buttonGroup}>
                  <button
                    onClick={this.onCartClickHandler}
                    className={classes.button}
                  >
                    ADD TO CART
                  </button>
                  <button
                    onClick={this.onWishListClickHandler}
                    disabled={this.state.wishlistButtonDisable}
                    className={`${classes.button} $`}
                  >
                    ( ADD TO WISHLIST
                    {this.state.wishlistButtonDisable ? (
                      <span className={classes.tooltip}>
                        Item already in Wishlist!
                      </span>
                    ) : null}
                    )
                  </button>
                </div>
              </div>

              <div className={classes.ItemDescription}>
                <h3 style={{ textAlign: "center" }}>Description</h3>

                <p style={{ paddingLeft: "20px" }}>{description}</p>
              </div>
            </div>
            <hr className={classes.Hr} />
            <br />
            <h2 style={{ textAlign: "center" }}>Reviews</h2>
            <AddReview />
            <Reviews className={classes.review} reviews={reviews} />
          </div>
          <br />
          <br />
          <Footer />
        </div>
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  userId: state.auth.userId,
  authToken: state.auth.authToken,
  items: state.wishlist.items,
  wishlistLoading: state.wishlist.loading,
  check: state.wishlist.check,
});

const mapDispatchToProps = (dispatch) => ({
  addItemCart: (data, id) => {
    dispatch(addItemCart(data, id));
  },
  wishListSendData: (data, token) => {
    dispatch(wishListSendData(data, token));
  },
  wishlistData: (userId, authToken) => {
    dispatch(wishlistData(userId, authToken));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(ItemPage);
