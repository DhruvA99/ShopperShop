import * as actionTypes from "../actions/actionTypes";

const initialState = {
  loading: true,
  data: null,
  error: null,
};

const itemReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ITEM_START:
      return {
        ...state,
        loading: true,
      };
    case actionTypes.ITEM_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.payload,
      };
    case actionTypes.ITEM_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return {
        ...state,
      };
  }
};

export default itemReducer;
