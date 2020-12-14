import * as actionTypes from "../actions/actionTypes";

const initialState = {
  authToken: null,
  loading: false,
  error: null,
  userId: null,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.AUTH_START:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case actionTypes.AUTH_SUCCESS:
      return {
        ...state,
        loading: false,
        authToken: action.payload,
        userId: action.userId,
      };
    case actionTypes.AUTH_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case actionTypes.AUTH_LOGOUT:
      return {
        ...state,
        authToken: null,
        userId: null,
      };
    case actionTypes.ERROR_CLEAR:
      return {
        ...state,
        error: null,
      };
    default:
      return {
        ...state,
      };
  }
};

export default authReducer;
