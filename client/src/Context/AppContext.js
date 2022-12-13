import { createContext, useReducer, useContext } from "react";
import reducer from "./reducer";
import axios from "axios";

import {
  LOGIN_USER_BEGIN,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_ERROR,
  UPDATE_USER_BEGIN,
  UPDATE_USER_ERROR,
  UPDATE_USER_SUCCESS,
  SET_OPEN_NAVBAR,
  GET_PROJECT_BEGIN,
  GET_PROJECT_ERROR,
  GET_PROJECT_SUCCESS,
} from "./actions";

const token = localStorage.getItem("token");
const user = localStorage.getItem("user");

const initialState = {
  user: user ? JSON.parse(user) : null,
  token,
  open: false,
};

const AppContext = createContext();

const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const addUserToLocalStorage = ({ user, token }) => {
    localStorage.setItem("user", JSON.stringify(user));
    localStorage.setItem("token", token);
  };
  const removeUserFromLocalStorage = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("data");
  };

  const setOpen = () => {
    dispatch({
      type: SET_OPEN_NAVBAR,
      payload: !state.open,
    });
  };

  const loginUser = async (currentUser) => {
    dispatch({ type: LOGIN_USER_BEGIN });
    try {
      const { data } = await axios.post(`/api/v1/auth/login`, currentUser);
      const { user, token } = data;
      dispatch({
        type: LOGIN_USER_SUCCESS,
        payload: { user, token },
      });
      addUserToLocalStorage({ user, token });
    } catch (error) {
      dispatch({
        type: LOGIN_USER_ERROR,
        payload: { msg: error.response.data.msg },
      });
    }
  };

  const updateUser = async ({ currentUser, id }) => {
    dispatch({ type: UPDATE_USER_BEGIN });
    try {
      const { data } = await axios.patch(
        `/api/v1/auth/updateUser/${id}`,
        currentUser
      );
      const { user, token } = data;
      dispatch({
        type: UPDATE_USER_SUCCESS,
        payload: { user, token },
      });
      addUserToLocalStorage({ user, token });
    } catch (error) {
      dispatch({
        type: UPDATE_USER_ERROR,
        payload: { msg: error.response.data.msg },
      });
    }
  };

  // should get project at landing page (login)
  const getProject = async (projectId) => {
    dispatch({ type: GET_PROJECT_BEGIN });
    try {
      const { data } = await axios.get(`/api/v1/projects/${projectId}`);
      const { project } = data;
      dispatch({
        type: GET_PROJECT_SUCCESS,
        payload: project,
      });
      localStorage.setItem("data", JSON.stringify(project));
    } catch (error) {
      dispatch({
        type: GET_PROJECT_ERROR,
        payload: { msg: error.response.data.msg },
      });
    }
  };

  return (
    <AppContext.Provider
      value={{
        ...state,
        loginUser,
        setOpen,
        updateUser,
        getProject,
        removeUserFromLocalStorage,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

const useAppContext = () => {
  return useContext(AppContext);
};

export { AppProvider, useAppContext, AppContext, initialState };
