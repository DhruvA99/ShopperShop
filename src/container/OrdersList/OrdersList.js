import React from "react";
import Navbar from "../../components/Navigation/Navbar";
import classes from "./OrdersList.module.css";
import { connect } from "react-redux";
import { orderFetchStart } from "../../redux/actions/actionCreator";
import OrderListCardComponent from "./OrderListCardComponent/OrderListCardComponent";

class OrderList extends React.Component {
  componentDidMount() {
    this.props.orderFetchStart(this.props.userId, this.props.authToken);
  }

  render() {
    const { orders } = this.props;
    let page = <p>Loading...</p>;
    if (!this.props.loading) {
      page = Object.keys(orders).map((key) => {
        let item = orders[key];
        return (
          <div key={key}>
            <OrderListCardComponent
              list={item.list}
              totalPrice={item.totalPrice}
              discount={item.discount}
              date={item.date}
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
});

export default connect(mapStateToProps, mapDispatchToProps)(OrderList);
