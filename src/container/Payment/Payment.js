import React from "react";
import classes from "./Payment.module.css";
import { CountryDropdown, RegionDropdown } from "react-country-region-selector";
import Navbar from "../../components/Navigation/Navbar";
import { connect } from "react-redux";
import { orderStart } from "../../redux/actions/actionCreator";
import "font-awesome/css/font-awesome.min.css";
import Modal from "../../components/Modal/Modal";

var reg = /^\d+$/;

class Payment extends React.Component {
  state = {
    finalPurchaseModal: false,
    cashOnDelivery: false,
    addLine1: "",
    addLine2: "",
    addLine3: "",
    zipcode: "",
    country: "",
    region: "",
    mobileNo: "",
    cardName: "",
    cardNo: "",
    expMonth: "",
    expYear: "",
    cvv: "",
    isValid: false,
    error: {
      addLine1: "",
      zipcode: "",
      mobileNo: "",
      cardName: "",
      cardNo: "",
      expMonth: "",
      expYear: "",
      cvv: "",
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
      case "cardName":
        errors.cardName = value.length < 1 ? "Name cannot be empty! " : "";
        break;
      case "cardNo":
        errors.cardNo =
          value.toString().length < 1
            ? "cardNo must not be empty!"
            : reg.test(value.toString())
            ? value.toString().length === 12
              ? ""
              : "cardNo not valid"
            : "CardNo can only be numeric";
        break;
      case "expMonth":
        errors.expMonth =
          value.toString().length < 1
            ? "expMonth must not be empty!"
            : reg.test(value.toString())
            ? parseInt(value.toString()) <= 12 && value.toString().length === 2
              ? ""
              : "expMonth not valid"
            : "expMonth can only be numeric";
        break;
      case "expYear":
        errors.expYear =
          value.toString().length < 1
            ? "expYear must not be empty!"
            : reg.test(value.toString())
            ? parseInt(value.toString()) <= 2050 &&
              value.toString().length === 4
              ? ""
              : "expYear not valid"
            : "expYear can only be numeric";
        break;
      case "cvv":
        errors.cvv =
          value.toString().length < 1
            ? "CVV must not be empty"
            : reg.test(value.toString())
            ? value.toString().length === 3
              ? ""
              : "CVV not valid"
            : "CVV can only be numeric";
        break;
      default:
        break;
    }
    if (
      errors.zipcode === "" &&
      errors.addLine1 === "" &&
      errors.mobileNo === "" &&
      errors.cardNo === "" &&
      errors.cardName === "" &&
      errors.expMonth === "" &&
      errors.expYear === "" &&
      errors.cvv === "" &&
      this.state.addLine1 !== null &&
      this.state.zipcode !== "" &&
      this.state.country !== null &&
      this.state.region !== null &&
      this.state.mobileNo !== "" &&
      this.state.cardNo !== null &&
      this.state.cardName !== null &&
      this.state.expMonth !== null &&
      this.state.expYear !== null &&
      this.state.cvv !== null
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

  onPaymentHandler = () => {
    let finalCost =
      this.props.finalTotalPrice > 0
        ? this.props.finalTotalPrice + 100
        : this.props.finalTotalPrice;
    let month = new Date().getMonth() + 1;
    let data = {
      list: this.props.finalList.map((key) => {
        return {
          ...key,
          orderStatus: 0,
          reviewCheck: false,
        };
      }),
      cardDetails: {
        cardName: this.state.cardName,
        cardNo: this.state.cardNo,
        expMonth: this.state.expMonth,
        expYear: this.state.expYear,
        cvv: this.state.cvv,
      },
      time: new Date().getTime(),
      date: new Date().getDate() + "-" + month + "-" + new Date().getFullYear(),
      discount: this.props.discount,
      totalPrice: finalCost,
    };
    this.props.orderStart(data, this.props.userId, this.props.authToken);
    this.onFinalPaymenModalHandler();
  };

  onFinalPaymenModalHandler = () => {
    this.setState(
      (prevState) => ({
        finalPurchaseModal: !prevState.finalPurchaseModal,
      }),
      () => {
        if (!this.state.finalPurchaseModal) {
          this.props.history.push("/");
        }
      }
    );
  };

  render() {
    let List = this.props.finalList.map((item) => {
      return (
        <div key={item.id} className={classes.priceList_items}>
          <div style={{ flex: "80%", justifyContent: "center" }}>
            {item.name} ({item.size}) X {item.quantity}
          </div>
          <div style={{ flex: "20%", justifyContent: "center" }}>
            &#8377; {item.price} X {item.quantity}
          </div>
        </div>
      );
    });
    return (
      <>
        <Navbar />
        <div className={classes.main}>
          <div className={classes.mainFlexContainer}>
            <div className={classes.addressMain}>
              <span className={classes.heading}>BILLING ADDRESS</span>
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

            <div className={classes.paymentContainer}>
              <span className={classes.heading}>PAYMENT</span>
              <p>Opt for Cash On Delivery</p>
              <input
                className={classes.checkBox}
                type="checkbox"
                value={this.state.cashOnDelivery}
                onChange={() =>
                  this.setState((prevState) => ({
                    cashOnDelivery: !prevState.cashOnDelivery,
                  }))
                }
              />
              <div
                className={
                  !this.state.cashOnDelivery
                    ? classes.paymentContainer
                    : classes.paymentContainerDisable
                }
              >
                <span className={classes.sideText}>
                  <b>Accepted Cards</b>
                </span>
                <div className={classes.cardsIconContainer}>
                  <i
                    className="fa fa-cc-visa fa-2x"
                    style={{ color: "#243891" }}
                    aria-hidden="true"
                  ></i>
                  <i
                    className="fa fa-cc-amex fa-2x"
                    style={{ color: "#0000ff" }}
                    aria-hidden="true"
                  ></i>
                  <i
                    className="fa fa-cc-mastercard fa-2x"
                    aria-hidden="true"
                    style={{ color: "#e5041b" }}
                  ></i>

                  <i
                    className="fa fa-cc-discover fa-2x"
                    style={{ color: "#fdbb7d" }}
                    aria-hidden="true"
                  ></i>
                </div>
                <div className={classes.inputDiv}>
                  <span className={classes.sideText}>Name on Card</span>
                  <div className={classes.insideInputDiv}>
                    <input
                      className={classes.input}
                      name="cardName"
                      value={this.state.cardName}
                      type="text"
                      placeholder="John Snow"
                      onChange={(e) => this.onChangeHandler(e)}
                    />
                    <span
                      style={{
                        marginBottom: "5px",
                        textAlign: "center",
                        color: "red",
                      }}
                    >
                      {this.state.error.cardName}
                    </span>
                  </div>
                </div>

                <div className={classes.inputDiv}>
                  <span className={classes.sideText}>Credit Card number</span>
                  <div className={classes.insideInputDiv}>
                    {" "}
                    <input
                      className={classes.input}
                      type="text"
                      name="cardNo"
                      value={this.state.cardNo}
                      placeholder="1111-2222-3333-4444"
                      maxLength="12"
                      onChange={(e) => this.onChangeHandler(e)}
                    />{" "}
                    <span
                      style={{
                        marginBottom: "5px",
                        color: "red",
                        textAlign: "center",
                      }}
                    >
                      {this.state.error.cardNo}
                    </span>
                  </div>
                </div>

                <div className={classes.inputDiv}>
                  <span className={classes.sideText}>Expiry Month</span>
                  <div className={classes.insideInputDiv}>
                    <input
                      className={classes.input}
                      type="text"
                      name="expMonth"
                      value={this.state.expMonth}
                      maxLength="2"
                      placeholder="03"
                      onChange={(e) => this.onChangeHandler(e)}
                    />{" "}
                    <span
                      style={{
                        marginBottom: "5px",
                        color: "red",
                        textAlign: "center",
                      }}
                    >
                      {this.state.error.expMonth}
                    </span>
                  </div>
                </div>

                <div className={classes.cardDetailsContainer}>
                  <div className={classes.inputDiv}>
                    <span className={classes.sideText}>Expiry Year</span>
                    <div className={classes.insideInputDiv}>
                      {" "}
                      <input
                        className={classes.input}
                        type="text"
                        placeholder="2017"
                        value={this.state.expYear}
                        maxLength="4"
                        name="expYear"
                        onChange={(e) => this.onChangeHandler(e)}
                      />
                      <span
                        style={{
                          marginBottom: "5px",
                          textAlign: "center",
                          color: "red",
                        }}
                      >
                        {this.state.error.expYear}
                      </span>
                    </div>
                  </div>

                  <div className={classes.inputDiv}>
                    <span className={classes.sideText}>CVV</span>
                    <div className={classes.insideInputDiv}>
                      {" "}
                      <input
                        className={classes.input}
                        type="password"
                        placeholder="***"
                        maxLength="3"
                        name="cvv"
                        value={this.state.cvv}
                        onChange={(e) => this.onChangeHandler(e)}
                      />
                      <span
                        style={{
                          marginBottom: "5px",
                          textAlign: "center",
                          color: "red",
                        }}
                      >
                        {this.state.error.cvv}
                      </span>
                    </div>
                  </div>

                  <div></div>
                </div>
              </div>
            </div>
          </div>

          <div className={classes.main}>
            <h1>CART</h1>
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
              onClick={this.onPaymentHandler}
            >
              Place Order
            </button>
          </div>
          <Modal
            isOpen={this.state.finalPurchaseModal}
            openHandler={this.onFinalPaymenModalHandler}
          >
            <p>Thankyou for purchasing from us!Your order has been placed.</p>
          </Modal>
        </div>
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  finalList: state.cart.finalItemList,
  discount: state.cart.discount,
  finalTotalPrice: state.cart.finalTotalPrice,
  userId: state.auth.userId,
  authToken: state.auth.authToken,
});

const mapDispatchToProps = (dispatch) => ({
  orderStart: (data, userId, authToken) => {
    dispatch(orderStart(data, userId, authToken));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Payment);
