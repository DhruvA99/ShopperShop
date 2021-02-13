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

export const addItemCart = (data, id) => (dispatch) => {
  let check = false; //for checking if the item is a repeat or not
  let ls = JSON.parse(localStorage.getItem("CartItems"));
  let tp = parseInt(JSON.parse(localStorage.getItem("TotalPrice")));
  let checkLs = ls.map((item) => {
    console.log(item.id.slice(0, -3) + "-----" + id.slice(0, -3));
    if (item.id.slice(0, -2) === id.slice(0, -2)) {
      // slice to remove the last random string attached to the id for keeping it unique
      check = true;
      let prevQ = item.quantity;
      return { ...item, quantity: item.quantity + 1 };
    } else {
      return item;
    }
  });
  console.log(checkLs);
  console.log(check);
  if (check === true) {
    ls = [...checkLs];
  } else {
    ls = [...ls, data];
  }
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
  let quantity = 0;
  ls.forEach((element) => {
    if (element.id === id) {
      quantity = element.quantity;
    }
  });
  console.log(quantity);
  ls = ls.filter((key) => key.id !== id);
  localStorage.setItem("CartItems", JSON.stringify(ls));
  localStorage.setItem("TotalPrice", tp - price * quantity);
  ls = JSON.parse(localStorage.getItem("CartItems"));
  dispatch({
    type: actionTypes.DELETE_CART,
    payload: ls,
    price: price * quantity,
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

export const wishListSendData = (data, token) => (dispatch) => {
  dispatch({ type: actionTypes.WISHLIST_SEND_START });
  axios
    .post(
      `https://shoppershop-bcc2c.firebaseio.com/wishlist/${data.userId}.json?auth=${token}`,
      data
    )
    .then((res) => {
      console.log(res.data);
      dispatch(wishlistSendSuccess());
    })
    .catch((err) => {
      console.log(err);
      dispatch(wishlistSendFail());
    });
};

export const wishlistSendSuccess = () => ({
  type: actionTypes.WISHLIST_SEND_SUCCESS,
});
export const wishlistSendFail = () => ({
  type: actionTypes.WISHLIST_SEND_FAIL,
});

export const wishlistData = (userId, authToken) => (dispatch) => {
  dispatch({ type: actionTypes.WISHLIST_START });
  axios
    .get(
      `https://shoppershop-bcc2c.firebaseio.com/wishlist/${userId}.json?auth=${authToken}`
    )
    .then((res) => {
      console.log("wishlistdata action called ");
      dispatch(wishlistSuccess(res.data));
    })
    .catch((err) => {
      console.log(err);
      dispatch(wishlistFail(err.message));
    });
};

export const wishlistSuccess = (data) => ({
  type: actionTypes.WISHLIST_SUCCESS,
  payload: data,
});

export const wishlistFail = (err) => ({
  type: actionTypes.WISHLIST_FAIL,
  payload: err.message,
});

export const wishlistDeleteData = (userId, postId, authToken) => (dispatch) => {
  axios
    .delete(
      `https://shoppershop-bcc2c.firebaseio.com/wishlist/${userId}/${postId}.json?auth=${authToken}`
    )
    .then((res) => {
      console.log(res.data);
      dispatch(wishlistData(userId, authToken));
    })
    .catch((err) => {
      console.log(err.message);
    });
};

export const orderStart = (data, userId, authToken) => (dispatch) => {
  dispatch({ type: actionTypes.ORDER_START });
  axios
    .post(
      `https://shoppershop-bcc2c.firebaseio.com/orders/${userId}.json?auth=${authToken}`,
      data
    )
    .then((res) => {
      dispatch(orderSuccess(data));
    })
    .catch((err) => {
      dispatch(orderFail(err.message));
    });
};

export const orderSuccess = (data) => ({
  type: actionTypes.ORDER_SUCCESS,
  payload: data,
});

export const orderFail = (err) => ({
  type: actionTypes.ORDER_FAIL,
  payload: err,
});

export const orderFetchStart = (userId, authToken) => (dispatch) => {
  dispatch({ type: actionTypes.ORDER_FETCH_START });
  axios
    .get(
      `https://shoppershop-bcc2c.firebaseio.com/orders/${userId}.json?auth=${authToken}`
    )
    .then((res) => {
      dispatch(orderFetchSuccess(res.data));
      console.log("orderFetchStart called ", res.data);
    })
    .catch((err) => {
      dispatch(orderFetchFail(err.message));
      console.log("orderFetchStartFail");
    });
};

export const orderFetchSuccess = (data) => ({
  type: actionTypes.ORDER_FETCH_SUCCESS,
  payload: data,
});

export const orderFetchFail = (error) => ({
  type: actionTypes.ORDER_FETCH_FAIL,
  payload: error,
});

export const returnStart = (list, userId, authToken, postId, id, Status) => (
  dispatch
) => {
  let updatedOrders = list.map((item) => {
    if (item.id === id) {
      return {
        ...item,
        status: Status,
      };
    }
    return item;
  });
  axios
    .put(
      `https://shoppershop-bcc2c.firebaseio.com/orders/${userId}/${postId}/list.json?auth=${authToken}`,
      updatedOrders
    )
    .then((res) => {
      console.log("returnStartSuccess");
      dispatch(orderFetchStart(userId, authToken));
    })
    .catch((error) => {
      console.log("returnStartError");
    });
};
