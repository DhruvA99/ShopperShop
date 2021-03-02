import React from "react";
import Navbar from "../../components/Navigation/Navbar";
import classes from "./OrdersList.module.css";
import { connect } from "react-redux";
import {
  orderFetchStart,
  returnStart,
  AddReview,
} from "../../redux/actions/actionCreator";
import OrderListCardComponent from "./OrderListCardComponent/OrderListCardComponent";

class OrderList extends React.Component {
  componentDidMount() {
    this.props.orderFetchStart(this.props.userId, this.props.authToken);
  }

  returnHandler = (lists, postId, id, status) => {
    this.props.returnStart(
      lists,
      this.props.userId,
      this.props.authToken,
      postId,
      id,
      status
    );
  };

  reviewHandler = (lists, id, postId, productName, userReview) => {
    this.props.AddReview(
      lists,
      id,
      postId,
      userReview,
      productName,
      this.props.authToken,
      this.props.userId
    );
  };

  render() {
    const { orders } = this.props;
    let page = <p>No Items in the List</p>;
    if (!this.props.loading && orders !== null) {
      page = Object.keys(orders).map((key) => {
        let item = orders[key];
        console.log(item.list);
        return (
          <div key={key}>
            <OrderListCardComponent
              loading={this.props.loading}
              list={orders[key].list}
              totalPrice={item.totalPrice}
              discount={item.discount}
              date={item.date}
              time={item.time}
              postId={key}
              returnHandler={this.returnHandler}
              email={this.props.email}
              reviewHandler={this.reviewHandler}
            />
          </div>
        );
      });
    }
    return (
      <div>
        <Navbar />
        <h1>Welcome {this.props.email}!</h1>
        <span className={classes.mainHeading}>YOUR ORDERS</span>
        <div className={classes.main}>{page}</div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  loading: state.orders.loading,
  authToken: state.auth.authToken,
  userId: state.auth.userId,
  orders: state.orders.orders,
  email: state.auth.email,
  data: state.item.data,
});

const mapDispatchToProps = (dispatch) => ({
  orderFetchStart: (userId, authToken) => {
    dispatch(orderFetchStart(userId, authToken));
  },
  returnStart: (lists, userId, authToken, postId, id, status) => {
    dispatch(returnStart(lists, userId, authToken, postId, id, status));
  },
  AddReview: (
    lists,
    id,
    postId,
    userReview,
    productName,
    authToken,
    userId
  ) => {
    dispatch(
      AddReview(lists, id, postId, userReview, productName, authToken, userId)
    );
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(OrderList);
