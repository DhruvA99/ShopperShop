import classes from "./CartPage.module.css";
import React from "react";
import { connect } from "react-redux";
import Navbar from "../../components/Navigation/Navbar";
import {
  deleteItemCart,
  checkoutPaymentStart,
} from "../../redux/actions/actionCreator";
import Modal from "components/Modal/Modal";

class CartPage extends React.Component {
  state = {
    items: [],
    deleteModalOpen: false,
    totalPrice: 0,
    deleteModalData: { id: null, price: null },
  };

  componentDidMount() {
    this.setState({ items: this.props.items });
  }

  handleDeleteModalOpen = () => {
    this.setState((prevState) => ({
      deleteModalOpen: !prevState.deleteModalOpen,
    }));
  };

  handleDeleteButton = (id, price) => {
    this.handleDeleteModalOpen();
    this.setState({ deleteModalData: { id, price } }); //id:id,price:price
  };
  handleDeleteConfirm = (data) => {
    this.props.deleteItemCart(data.id, data.price);
    this.handleDeleteModalOpen();
  };

  paymentHandler = () => {
    if (this.props.isAuthenticated && this.props.totalPrice === 0) {
      alert("Cart Empty!");
    } else if (this.props.isAuthenticated) {
      this.props.checkoutPaymentStart();
      this.props.history.push("/payment");
    } else {
      alert("Please Login/Signup first!");
      this.props.history.push("/login");
    }
  };

  render() {
    let list = <p>Your cart is empty</p>;
    if (this.props.items !== []) {
      list = this.props.items.map((item) => {
        return (
          <div key={item.id} className={classes.card}>
            <img className={classes.img} src={item.url} alt="Avatar" />

            <div key={item.id} className={classes.container}>
              <h4>
                <b>{item.name}</b>
              </h4>
              <p>{item.size}</p>
              <p>{item.productName}</p>
              <button
                className={classes.buttonDelete}
                onClick={() => this.handleDeleteButton(item.id, item.price)}
              >
                Delete
              </button>
            </div>
            <Modal
              isOpen={this.state.deleteModalOpen}
              openHandler={this.handleDeleteModalOpen}
              submitButton={true}
              isValid={true}
              submitHandler={this.handleDeleteConfirm}
              modalData={this.state.deleteModalData}
              submitText="Confirm"
            >
              <div>
                <h3>Do you want to delete the item from the cart?</h3>
              </div>
            </Modal>
          </div>
        );
      });
    }

    let totalList = <p>Your cart is empty</p>;
    if (this.props.items.length !== 0) {
      totalList = this.props.items.map((item) => {
        return (
          <div key={item.id} className={classes.priceList_items}>
            <div style={{ flex: "70%", justifyContent: "center" }}>
              {item.name} ({item.size})
            </div>
            <div style={{ flex: "30%", justifyContent: "center" }}>
              {item.price}
            </div>
            <p>Quantity: {item.quantity}</p>
          </div>
        );
      });
    }

    return (
      <div>
        <Navbar />
        <div className={classes.mainContent}>
          <div className={classes.cartList}>
            <h1>Your Cart</h1>
            {list}
          </div>
          <div className={classes.priceList}>
            <h1>SubTotal</h1>
            {totalList}
            <hr />
            <div className={classes.total}>
              <p>
                <strong>Total:</strong>
              </p>
              <p>{this.props.totalPrice}</p>
            </div>
            <div>
              <button
                className={classes.buttonPayment}
                onClick={this.paymentHandler}
              >
                Move To Payement
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  items: state.cart.items,
  totalPrice: state.cart.totalPrice,
  isAuthenticated: state.auth.authToken !== null,
});

const mapDispatchToProps = (dispatch) => ({
  deleteItemCart: (id, items, price) => {
    dispatch(deleteItemCart(id, items, price));
  },
  checkoutPaymentStart: () => {
    dispatch(checkoutPaymentStart());
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(CartPage);
