import * as actionTypes from "../actions/actionTypes";

const initialState = {
  loading: true,
  data: null,
};

const adReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.AD_START:
      return {
        ...state,
        loading: true,
      };
    case actionTypes.AD_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.payload,
      };
    case actionTypes.AD_FAIL:
      return {
        ...state,
        loading: false,
        data: action.payload,
      };
    default:
      return {
        ...state,
      };
  }
};

export default adReducer;
