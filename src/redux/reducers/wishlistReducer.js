import * as actionTypes from "../actions/actionTypes";

const initialState = {
  items: null,
  loading: true,
  errors: null,
  check: false,
};

const wishlistReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.WISHLIST_START:
      return {
        ...state,
        loading: true,
        errors: null,
      };

    case actionTypes.WISHLIST_SUCCESS:
      return {
        ...state,
        items: action.payload,
        loading: false,
        errors: null,
        check: true,
      };
    case actionTypes.WISHLIST_FAIL:
      return {
        ...state,
        loading: false,
        errors: action.payload,
        check: true,
      };
    case actionTypes.WISHLIST_SEND_START:
      return {
        ...state,
        loading: true,
      };
    case actionTypes.WISHLIST_SEND_SUCCESS:
      return {
        ...state,
        loading: false,
      };
    case actionTypes.WISHLIST_SEND_FAIL:
      return {
        ...state,
        loading: false,
      };
    default:
      return state;
  }
};

export default wishlistReducer;
