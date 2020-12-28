import React from "react";
import NavBar from "../../components/Navigation/Navbar";
import classes from "./ItemPage.module.css";
import Reviews from "../../components/Reviews/Reviews";
import { addItemCart } from "../../redux/actions/actionCreator";
import { connect } from "react-redux";
import Footer from "../../components/Footer/Footer";

class ItemPage extends React.Component {
  state = {
    size: null,
  };

  onClickHandler = () => {
    if (this.state.size !== null) {
      const data = {
        id: this.props.location.state.id + this.state.size,
        name: this.props.location.state.name,
        url: this.props.location.state.url,
        size: this.state.size,
        price: this.props.location.state.price,
      };
      this.props.addItemCart(data);
      this.props.history.push("/checkout");
    } else {
      alert("please select a size!");
    }
  };

  handleSelectChange = (e) => {
    this.setState({ size: e.target.value });
  };

  render() {
    const {
      url,
      id,
      color,
      name,
      brand,
      reviews,
      description,
      price,
      size,
    } = this.props.location.state;
    return (
      <div>
        <NavBar />
        {console.log(this.props.location.state)}
        <div className={classes.main}>
          <div className={classes.container}>
            <div className={classes.itemImage}>
              <img src={url} />
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
                <select onClick={this.handleSelectChange}>
                  <option hidden disabled selected value>
                    {" "}
                    -- select an option --{" "}
                  </option>
                  {Object.keys(size).map((item) => {
                    if (size[item]) {
                      return (
                        <option key={id + item} value={item}>
                          {item}
                        </option>
                      );
                    }
                  })}
                </select>
              </div>
              <br />
              <div className={classes.buttonGroup}>
                <button
                  onClick={this.onClickHandler}
                  className={classes.button}
                >
                  ADD TO CART
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
          <Reviews className={classes.review} reviews={reviews} />
        </div>
        <br />
        <br />
        <Footer />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({});

const mapDispatchToProps = (dispatch) => ({
  addItemCart: (data) => {
    dispatch(addItemCart(data));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(ItemPage);