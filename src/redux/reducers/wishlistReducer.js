import * as actionTypes from "../actions/actionTypes";

const initialState = {
  items: [],
  loading: false,
  errors: null,
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
      };
    case actionTypes.WISHLIST_FAIL:
      return {
        ...state,
      };
    default:
      return state;
  }
};

export default wishlistReducer;
