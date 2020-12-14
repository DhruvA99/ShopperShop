import React from "react";
import classes from "./Payment.module.css";
import { CountryDropdown, RegionDropdown } from "react-country-region-selector";
import Navbar from "../../components/Navigation/Navbar";
import { connect } from "react-redux";

class Payment extends React.Component {
  state = {
    addLine1: "",
    addLine2: "",
    addLine3: "",
    zipcode: null,
    country: "",
    region: "",
    mobileNo: null,
    isValid: false,
    error: {
      addLine1: "",
      zipcode: "",
      mobileNo: "",
    },
  };

  onChangeHandler = (e) => {
    const { name, value } = e.target;
    let Valid = false;
    this.setState({ [name]: value });
    let errors = { ...this.state.error };
    switch (name) {
      case "addLine1":
        errors.addLine1 = value.length < 1 ? "address must not be empty!" : "";
        break;
      case "mobileNo":
        errors.mobileNo =
          value.toString().length < 1 ? "mobileNo must not be empty!" : "";
        break;
      case "zipcode":
        console.log(value.toString().length > 6);
        errors.zipcode =
          value.toString().length > 1 && value.toString().length < 7
            ? ""
            : "zipcode must not be empty or incorrect!";
        break;
      default:
        break;
    }
    if (
      errors.zipcode === "" &&
      errors.addLine1 === "" &&
      errors.mobileNo === "" &&
      this.state.addLine1 !== null &&
      this.state.zipcode !== null &&
      this.state.country !== null &&
      this.state.region !== null &&
      this.state.mobileNo !== null
    ) {
      Valid = true;
    }
    this.setState({ error: errors, isValid: Valid });
  };

  selectCountry(val) {
    this.setState({ country: val });
  }

  selectRegion(val) {
    this.setState({ region: val });
  }

  render() {
    let List = this.props.finalList.map((item) => {
      return (
        <div key={item.id} className={classes.priceList_items}>
          <div style={{ flex: "80%", justifyContent: "center" }}>
            {item.name} ({item.size})
          </div>
          <div style={{ flex: "20%", justifyContent: "center" }}>
            &#8377; {item.price}
          </div>
        </div>
      );
    });
    return (
      <>
        <Navbar />
        <div className={classes.main}>
          <h1>YOUR DETAILS</h1>
          <div className={classes.addressMain}>
            <div className={classes.inputDiv}>
              <span className={classes.sideText}>Address Line 1 *</span>
              <input
                className={classes.input}
                type="text"
                name="addLine1"
                value={this.state.addLine1}
                onChange={(e) => this.onChangeHandler(e)}
              />
            </div>
            <span style={{ marginBottom: "5px", color: "red" }}>
              {this.state.error.addLine1}
            </span>
            <div className={classes.inputDiv}>
              <span className={classes.sideText}>Address Line 2(opt.)</span>
              <input
                className={classes.input}
                type="text"
                name="addLine2"
                value={this.state.addLine2}
                onChange={(e) => this.onChangeHandler(e)}
              />
            </div>
            <div className={classes.inputDiv}>
              <span className={classes.sideText}>Address Line 3(opt.)</span>
              <input
                className={classes.input}
                type="text"
                name="addLine3"
                value={this.state.addLine3}
                onChange={(e) => this.onChangeHandler(e)}
              />
            </div>

            <div className={classes.inputDiv}>
              <span className={classes.sideText}>Country *</span>
              <CountryDropdown
                className={classes.input}
                value={this.state.country}
                name="country"
                onChange={(val) => this.selectCountry(val)}
              />
            </div>
            <div className={classes.inputDiv}>
              <span className={classes.sideText}>Region *</span>
              <RegionDropdown
                className={classes.input}
                value={this.state.region}
                country={this.state.country}
                name="region"
                onChange={(val) => this.selectRegion(val)}
              />
            </div>
            <div className={classes.inputDiv}>
              <span className={classes.sideText}>zip code *</span>
              <input
                className={classes.input}
                type="number"
                name="zipcode"
                value={this.state.zipcode}
                onChange={(e) => this.onChangeHandler(e)}
              />
            </div>
            <span style={{ marginBottom: "5px", color: "red" }}>
              {this.state.error.zipcode}
            </span>
            <div className={classes.inputDiv}>
              <span className={classes.sideText}>Mobile No(with Std) *</span>
              <input
                className={classes.input}
                type="number"
                name="mobileNo"
                value={this.state.mobileNo}
                onChange={(e) => this.onChangeHandler(e)}
              />
            </div>
            <span style={{ marginBottom: "5px", color: "red" }}>
              {this.state.error.mobileNo}
            </span>
          </div>
          <div>
            <h1>YOUR ORDER</h1>
            <div className={classes.paymentList}>{List}</div>
            <hr style={{ borderTop: "1px dashed" }} />
            <div className={classes.priceList_items}>
              <p style={{ flex: "80%", justifyContent: "center" }}>Discount:</p>
              <p style={{ flex: "20%", justifyContent: "center" }}>
                &#8377; {this.props.discount}
              </p>
            </div>
            <div className={classes.priceList_items}>
              <p style={{ flex: "80%", justifyContent: "center" }}>Shipping</p>
              <p style={{ flex: "20%", justifyContent: "center" }}>
                &#8377; {this.props.finalTotalPrice > 0 ? 100 : 0}
              </p>
            </div>
            <hr />
            <div className={classes.priceList_items}>
              <p style={{ flex: "80%", justifyContent: "center" }}>Total: </p>
              <b style={{ flex: "20%", justifyContent: "center" }}>
                <p>
                  &#8377;{" "}
                  {this.props.finalTotalPrice > 0
                    ? this.props.finalTotalPrice + 100
                    : this.props.finalTotalPrice}
                </p>
              </b>
            </div>
          </div>
          <div className={classes.buttonContainer}>
            <button
              disabled={!this.state.isValid}
              className={classes.submitButton}
            >
              PaymentDetails
            </button>
          </div>
        </div>
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  finalList: state.cart.finalItemList,
  discount: state.cart.discount,
  finalTotalPrice: state.cart.finalTotalPrice,
});

export default connect(mapStateToProps, null)(Payment);
