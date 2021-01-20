import * as actionTypes from "./actionTypes";
import axios from "axios";

export const adStart = () => ({
  type: actionTypes.AD_START,
});

export const adSuccess = (data) => ({
  type: actionTypes.AD_SUCCESS,
  payload: data,
});

export const adFail = (error) => ({
  type: actionTypes.AD_FAIL,
  payload: error,
});

export const adGetStarted = () => (dispatch) => {
  dispatch(adStart());
  axios
    .get("https://shoppershop-bcc2c.firebaseio.com/advertisement.json")
    .then((res) => {
      dispatch(adSuccess(res.data.ad1));
    })
    .catch((error) => {
      dispatch(adFail(error.message));
    });
};

export const itemStart = () => ({
  type: actionTypes.ITEM_START,
});

export const itemSuccess = (data) => ({
  type: actionTypes.ITEM_SUCCESS,
  payload: data,
});

export const itemFail = (error) => ({
  type: actionTypes.ITEM_FAIL,
  payload: error,
});

export const itemGetStarted = () => (dispatch) => {
  dispatch(itemStart());
  axios
    .get("https://shoppershop-bcc2c.firebaseio.com/products.json")
    .then((res) => {
      dispatch(itemSuccess(res.data));
    })
    .catch((err) => {
      console.log(err);
      dispatch(itemFail(err.message));
    });
};

//cart

export const CartItemCheck = () => (dispatch) => {
  if (
    !localStorage.getItem("CartItems") &&
    !localStorage.getItem("TotalPrice")
  ) {
    console.log("cartitemcheckStart");
    localStorage.setItem("CartItems", JSON.stringify([]));
    localStorage.setItem("TotalPrice", JSON.stringify(0));
  } else {
    console.log("cartitemcheckalreadypresent");
    let ls = JSON.parse(localStorage.getItem("CartItems"));
    let tp = parseInt(JSON.parse(localStorage.getItem("TotalPrice")));
    dispatch({ type: actionTypes.ADD_CART, payload: tp, ls: ls });
  }
};

export const addItemCart = (data) => (dispatch) => {
  let ls = JSON.parse(localStorage.getItem("CartItems"));
  let tp = parseInt(JSON.parse(localStorage.getItem("TotalPrice")));
  ls = [...ls, data];
  localStorage.setItem("CartItems", JSON.stringify(ls));
  localStorage.setItem("TotalPrice", tp + data.price);
  ls = JSON.parse(localStorage.getItem("CartItems"));
  dispatch({
    type: actionTypes.ADD_CART,
    payload: data.price,
    ls: ls,
  });
};

export const deleteItemCart = (id, price) => (dispatch) => {
  let ls = JSON.parse(localStorage.getItem("CartItems"));
  let tp = parseInt(JSON.parse(localStorage.getItem("TotalPrice")));
  ls = ls.filter((key) => key.id !== id);
  localStorage.setItem("CartItems", JSON.stringify(ls));
  localStorage.setItem("TotalPrice", tp - price);
  ls = JSON.parse(localStorage.getItem("CartItems"));
  dispatch({
    type: actionTypes.DELETE_CART,
    payload: ls,
    price: price,
  });
};

//authorization

export const authStart = () => ({
  type: actionTypes.AUTH_START,
});

export const authSuccess = (authData, userId) => ({
  type: actionTypes.AUTH_SUCCESS,
  payload: authData,
  userId: userId,
});
export const authFail = (error) => ({
  type: actionTypes.AUTH_FAIL,
  payload: error,
});

export const authGetStarted = (email, password, isSignUp) => (dispatch) => {
  dispatch(authStart());
  const authData = {
    email: email,
    password: password,
    returnSecureToken: true,
  };
  let url =
    "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBKVVs1gFhVnVAXd_wZShOQfJ4o9To2h4Q";
  if (!isSignUp) {
    url =
      "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBKVVs1gFhVnVAXd_wZShOQfJ4o9To2h4Q";
  }
  axios
    .post(url, authData)
    .then((res) => {
      const expirationDate = new Date(
        new Date().getTime() + res.data.expiresIn * 1000
      );
      localStorage.setItem("token", res.data.idToken);
      localStorage.setItem("expirationDate", expirationDate);
      localStorage.setItem("userId", res.data.localId);
      dispatch(authSuccess(res.data.idToken, res.data.localId));
    })
    .catch((err) => {
      dispatch(authFail(err.response.data.error.message));
    });
};

export const errorClear = () => ({
  type: actionTypes.ERROR_CLEAR,
});

export const logout = () => (dispatch) => {
  localStorage.removeItem("token");
  localStorage.removeItem("userId");
  localStorage.removeItem("expirationDate");
  dispatch({ type: actionTypes.AUTH_LOGOUT });
};

export const checkAuthTimeout = (expiryTime) => (dispatch) => {
  setTimeout(() => {
    dispatch(logout());
  }, expiryTime * 1000);
};

export const checkAuthState = () => (dispatch) => {
  const token = localStorage.getItem("token");
  if (!token) {
    dispatch(logout());
  } else {
    const ExpDate = new Date(localStorage.getItem("expirationDate"));
    if (ExpDate <= new Date()) {
      dispatch(logout());
    } else {
      const id = localStorage.getItem("userId");
      dispatch(authSuccess(token, id));
      dispatch(
        checkAuthTimeout((ExpDate.getTime() - new Date().getTime()) / 1000)
      );
    }
  }
};

export const checkoutPaymentStart = () => ({
  type: actionTypes.CHECKOUT_PAYMENT_START,
});

//Wish List

export const wishListSendData = (data) => (dispatch) => {
  dispatch({ type: actionTypes.WISHLIST_SEND_START });
  axios
    .post(
      `https://shoppershop-bcc2c.firebaseio.com/wishlist/${data.userId}/${data.id}`,
      data
    )
    .then((res) => {
      console.log(res.data);
      dispatch({ type: actionTypes.WISHLIST_SEND_START });
    })
    .catch((err) => {
      console.log(err.message);
      dispatch({ type: actionTypes.WISHLIST_SEND_FAIL });
    });
};

export const wishlistSendSuccess = () => ({
  type: actionTypes.WISHLIST_SEND_SUCCESS,
});
export const wishlistSendFail = () => ({
  type: actionTypes.WISHLIST_SEND_FAIL,
});

export const wishlistSuccess = (data) => ({
  type: actionTypes.WISHLIST_SUCCESS,
  payload: data,
});

export const wishlistFail = (err) => ({
  type: actionTypes.WISHLIST_FAIL,
  payload: err.message,
});
