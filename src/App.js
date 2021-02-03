import { Redirect, Route, Switch } from "react-router-dom";
import Home from "./container/Home/Home";
import ItemPage from "./container/ItemPage/ItemPage";
import CartPage from "./container/CartPage/CartPage";
import Login from "./container/Auth/Login/Login";
import Logout from "./container/Auth/Logout";
import SignUp from "./container/Auth/SignUp/SignUp";
import { useEffect } from "react";
import { connect } from "react-redux";
import { checkAuthState, CartItemCheck } from "./redux/actions/actionCreator";
import Payment from "./container/Payment/Payment";
import WishList from "./container/WishList/WishList";
import OrderList from "./container/OrdersList/OrdersList";

function App(props) {
  useEffect(() => {
    props.authGetStarted();
    props.cartItemCheck();
  }, []);
  let routes = (
    <Switch>
      <Route path="/" exact component={Home} />
      <Route path="/login" exact component={Login} />
      <Route path="/signup" exact component={SignUp} />
      <Route path="/item/:id" exact component={ItemPage} />
      <Route path="/checkout" exact component={CartPage} />
      <Redirect to="/" />
    </Switch>
  );
  if (props.isAuthenticated) {
    routes = (
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/logout" exact component={Logout} />
        <Route path="/item/:id" exact component={ItemPage} />
        <Route path="/checkout" exact component={CartPage} />
        <Route path="/payment" exact component={Payment} />
        <Route path="/orders" exact component={OrderList} />
        <Route path="/wishlist" exact component={WishList} />
        <Redirect to="/" />
      </Switch>
    );
  }
  return <div className="App">{routes}</div>;
}

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.authToken !== null,
});

const mapDispatchToProps = (dispatch) => ({
  authGetStarted: () => {
    dispatch(checkAuthState());
  },
  cartItemCheck: () => {
    dispatch(CartItemCheck());
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
