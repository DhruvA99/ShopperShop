import * as actionTypes from "../actions/actionTypes";

const initialState = {
  items: [],
  authenticated: false,
  totalPrice: 0,
  finalItemList: [],
  discount: 0,
  finalTotalPrice: 0,
};

const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ADD_CART:
      return {
        ...state,
        totalPrice: state.totalPrice + action.payload,
        items: [...action.ls],
      };
    case actionTypes.DELETE_CART:
      return {
        ...state,
        totalPrice: state.totalPrice - action.price,
        items: action.payload,
      };
    case actionTypes.CHECKOUT_PAYMENT_START:
      return {
        ...state,
        finalItemList: [...state.items],
        discount: state.totalPrice > 1000 ? 200 : 0,
        finalTotalPrice:
          state.totalPrice > 1000 ? state.totalPrice - 200 : state.totalPrice,
      };
    default:
      return {
        ...state,
      };
  }
};

export default cartReducer;
