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
  GET_ALL_PROJECTS_BEGIN,
  GET_ALL_PROJECTS_SUCCESS,
  LOGOUT_USER
} from "./actions";

const token = localStorage.getItem("token");
const user = localStorage.getItem("user");

const initialState = {
  user: user ? JSON.parse(user) : null,
  token,
  open: false,
  projects: [],
};

const AppContext = createContext();

const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const authFetch = axios.create({
    baseURL: `/api/v1/`,
  });

  // request
  authFetch.interceptors.request.use(
    (config) => {
      config.headers["Authorization"] = `Bearer ${state.token}`;
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  // response
  authFetch.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {

      console.log(error.response.status)
      if (error.response.status === 401) {
        logoutUser();
      }
      return Promise.reject(error);
    }
  );

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
      const { data } = await authFetch.patch(
        `/auth/updateUser/${id}`,
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

  const logoutUser = () => {
    dispatch({ type: LOGOUT_USER });
    removeUserFromLocalStorage();
  };

  const getProject = async (projectId) => {
    dispatch({ type: GET_PROJECT_BEGIN });
    try {
      const { data } = await authFetch.get(`/projects/${projectId}`);
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

  const getAllProjects = async () => {
    dispatch({ type: GET_ALL_PROJECTS_BEGIN });
    try {
      const { data } = await axios.get(`/api/v1/projects`);
      const { projects } = data;
      dispatch({
        type: GET_ALL_PROJECTS_SUCCESS,
        payload: projects,
      });
    } catch (error) {
      console.log(error.response);
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
        getAllProjects,
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
