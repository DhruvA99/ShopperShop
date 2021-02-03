import * as actionTypes from "../actions/actionTypes";

const initialState = {
  loading: true,
  orders: null,
  errors: null,
  fetchErrors: null,
};

const orderReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ORDER_START:
      return {
        ...state,
        loading: true,
        errors: null,
      };
    case actionTypes.ORDER_SUCCESS:
      return {
        ...state,
        loading: false,
      };
    case actionTypes.ORDER_FAIL:
      return {
        ...state,
        loading: false,
      };
    case actionTypes.ORDER_FETCH_START:
      return {
        ...state,
        loading: true,
        errors: null,
      };
    case actionTypes.ORDER_FETCH_SUCCESS:
      return {
        ...state,
        loading: false,
        orders: action.payload,
      };
    case actionTypes.ORDER_FETCH_FAIL:
      return {
        ...state,
        loading: false,
        errors: action.payload,
      };
    default: {
      return state;
    }
  }
};

export default orderReducer;
