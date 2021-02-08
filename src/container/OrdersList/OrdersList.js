import React from "react";
import Navbar from "../../components/Navigation/Navbar";
import classes from "./OrdersList.module.css";
import { connect } from "react-redux";
import {
  orderFetchStart,
  returnStart,
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

  render() {
    const { orders } = this.props;
    let page = <p>Loading...</p>;
    if (!this.props.loading) {
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
            />
          </div>
        );
      });
    }
    return (
      <div>
        <Navbar />
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
});

const mapDispatchToProps = (dispatch) => ({
  orderFetchStart: (userId, authToken) => {
    dispatch(orderFetchStart(userId, authToken));
  },
  returnStart: (lists, userId, authToken, postId, id, status) => {
    dispatch(returnStart(lists, userId, authToken, postId, id, status));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(OrderList);
