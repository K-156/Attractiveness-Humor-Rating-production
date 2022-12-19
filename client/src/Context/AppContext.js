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
  CREATE_PROJECT_BEGIN,
  CREATE_PROJECT_SUCCESS,
  CREATE_PROJECT_ERROR,
  LOGOUT_USER,
  SET_EDIT_PROJECT,
  DELETE_PROJECT_BEGIN,
  EDIT_PROJECT_BEGIN,
  EDIT_PROJECT_SUCCESS,
  EDIT_PROJECT_ERROR,
  SUBMIT_FORM_DATA,
} from "./actions";

const token = localStorage.getItem("token");
const user = localStorage.getItem("user");

const initialState = {
  user: user ? JSON.parse(user) : null,
  token,
  open: false,
  projects: [],
  isEditing: false,
  editProjectId: "6396bf3fc38fcbbab983f563", // need change to empty string
  isLoading: true,
  projDetails:{},
  data:{},
  sections:[],
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
      console.log(error.response.status);
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
      if (error.response.status !== 401) {
        dispatch({
          type: UPDATE_USER_ERROR,
          payload: { msg: error.response.data.msg },
        });
      }
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
      const { data } = await authFetch.get(`/projects`);
      const { projects } = data;
      dispatch({
        type: GET_ALL_PROJECTS_SUCCESS,
        payload: projects,
      });
    } catch (error) {
      console.log(error.response);
    }
  };

  const submitFormData = (formData) => {
    dispatch({ type: SUBMIT_FORM_DATA, payload: { formData } });
  }

  const createProject = async () => {
    dispatch({ type: CREATE_PROJECT_BEGIN });
    try {
      const {
        projDetails,
        sections,
        data,
        isActive,
        isPublish,
      } = state;
      await authFetch.post("projects", {
        projDetails,
        sections,
        data,
        isActive,
        isPublish,
      });
      dispatch({
        type: CREATE_PROJECT_SUCCESS,
      });
    } catch (error) {
      if (error.response.status === 401) return;
      dispatch({
        type: CREATE_PROJECT_ERROR,
        payload: { msg: error.response.data.msg },
      });
    }
  };

  const setEditProject = (id) => {
    dispatch({ type: SET_EDIT_PROJECT, payload: { id } });
  };

  const editProject = async () => {
    dispatch({ type: EDIT_PROJECT_BEGIN });
    try {
      const { name } = state;
      await authFetch.patch(`/projects/${state.editProjectId}`, name);
      dispatch({ type: EDIT_PROJECT_SUCCESS });
    } catch (error) {
      if (error.response.status === 401) return;
      dispatch({
        type: EDIT_PROJECT_ERROR,
        payload: { msg: error.response.data.msg },
      });
    }
  };

  const deleteProject = async (id) => {
    dispatch({ type: DELETE_PROJECT_BEGIN });
    try {
      await authFetch.delete(`/projects/${id}`);
      getAllProjects();
    } catch (error) {
      console.log(error.response);
      //logoutUser()
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
        createProject,
        setEditProject,
        deleteProject,
        editProject,
        submitFormData
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
