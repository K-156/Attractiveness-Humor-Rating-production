import {
  LOGIN_USER_BEGIN,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_ERROR,
  UPDATE_USER_BEGIN,
  UPDATE_USER_ERROR,
  UPDATE_USER_SUCCESS,
  GET_PROJECT_SUCCESS,
  GET_PROJECT_BEGIN,
  GET_PROJECT_ERROR,
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
  if (action.type === UPDATE_USER_BEGIN) {
    return { ...state };
  }
  if (action.type === UPDATE_USER_SUCCESS) {
    return {
      ...state,
      token: action.payload.token,
      user: action.payload.user,
    };
  }
  if (action.type === UPDATE_USER_ERROR) {
    return {
      ...state,
      isValid:false,
    };
  }
  if (action.type === GET_PROJECT_BEGIN) {
    return { ...state };
  }
  if (action.type === GET_PROJECT_SUCCESS) {
    return {
      ...state,
      data: action.payload.data,
    };
  }
  if (action.type === GET_PROJECT_ERROR) {
    return {
      ...state,
    };
  }
  throw new Error(`no such action: ${action.type}`);
};

export default reducer;
