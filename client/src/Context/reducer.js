import {
  LOGIN_USER_BEGIN,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_ERROR,
} from "./actions";

const reducer = (state, action) => {
  if (action.type === LOGIN_USER_BEGIN) {
    return { ...state };
  }
  if (action.type === LOGIN_USER_SUCCESS) {
    return {
      ...state,
      token: action.payload.token,
      user: action.payload.user,
    };
  }
  if (action.type === LOGIN_USER_ERROR) {
    return {
      ...state,
      isValid:false,
    };
  }
  throw new Error(`no such action: ${action.type}`);
};

export default reducer;
