import { createContext, useReducer, useContext } from "react";
import reducer from "./reducer";
import axios from "axios";

import {
  SET_THEME,
  LOGIN_USER_BEGIN,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_ERROR,
  UPDATE_USER_BEGIN,
  UPDATE_USER_ERROR,
  UPDATE_USER_SUCCESS,
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
  DELETE_PROJECT_ERROR,
  EDIT_PROJECT_BEGIN,
  EDIT_PROJECT_SUCCESS,
  EDIT_PROJECT_ERROR,
  SUBMIT_FORM_DATA,
  PUBLISH_PROJECT_BEGIN,
  PUBLISH_PROJECT_SUCCESS,
  NEXT_SECTION,
  PREV_SECTION,
  UPLOAD_FILES_BEGIN,
  UPLOAD_FILES_SUCCESS,
  UPLOAD_FILES_ERROR,
  UPDATE_PROJECT_BEGIN,
  UPDATE_PROJECT_SUCCESS,
  UPDATE_PROJECT_ERROR,
  SET_ACTIVE_PROJECT,
  SET_CREATE_PROJECT,
  SET_SECTION_NO,
  SET_ORIGINAL_STATE,
  READ_CSV_BEGIN,
  READ_CSV_SUCCESS,
  READ_CSV_ERROR,
} from "./actions";

const token = localStorage.getItem("token");
const user = localStorage.getItem("user");

const initialState = {
  user: user ? JSON.parse(user) : null,
  token,
  theme: "green",
  projects: [],
  isEditing: false,
  editProjectId: "",
  isLoading: false,
  projDetails: { email: [], roles: [], graphic: null },
  formData: [],
  data: [],
  sections: [],
  activeProjectId: "",
  sectionNum: 0,
  fileLink: "",
  createdProjectId: "",
  errorMsg: "",
  emailList: "",
  participants: [],
  activeProjectData:[],
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

  const setTheme = (theme) => {
    dispatch({
      type: SET_THEME,
      payload: theme,
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
  };

  const createProject = async () => {
    dispatch({ type: CREATE_PROJECT_BEGIN });
    try {
      const { data } = await authFetch.post("projects");
      await authFetch.post(`/projects/folder/${data.project._id}`);
      dispatch({
        type: CREATE_PROJECT_SUCCESS,
        payload: data.project._id,
      });
    } catch (error) {
      if (error.response.status === 401) return;
      dispatch({
        type: CREATE_PROJECT_ERROR,
        payload: { msg: error.response.data.msg },
      });
    }
  };

  const updateProject = async (projectId, projType, projData) => {
    dispatch({ type: UPDATE_PROJECT_BEGIN });
    try {
      if (projType === "projDetails") {
        const { data } = await authFetch.patch(`/projects/${projectId}`, {
          projDetails: projData,
        });
        dispatch({
          type: UPDATE_PROJECT_SUCCESS,
          payload: { data, projType },
        });
      } else if (projType === "projData") {
        const { data } = await authFetch.patch(`/projects/${projectId}`, {
          data: projData,
        });
        dispatch({
          type: UPDATE_PROJECT_SUCCESS,
          payload: { data, projType },
        });
      } else if (projType === "sections") {
        const { data } = await authFetch.patch(`/projects/${projectId}`, {
          sections: projData,
        });
        dispatch({
          type: UPDATE_PROJECT_SUCCESS,
          payload: { data, projType },
        });
      } else if (projType === "emailList") {
        const { data } = await authFetch.patch(`/projects/${projectId}`, {
          emailList: projData,
        });
        dispatch({
          type: UPDATE_PROJECT_SUCCESS,
          payload: { data, projType },
        });
      }
    } catch (error) {
      if (error.response.status !== 401) {
        dispatch({
          type: UPDATE_PROJECT_ERROR,
          payload: { msg: error.response.data.msg },
        });
      }
    }
  };

  const updateSection = async (projectId, sections) => {
    dispatch({ type: UPDATE_PROJECT_BEGIN });
    try {
      const { data } = await authFetch.patch(`/projects/${projectId}`, {
        sections,
      });
      dispatch({
        type: UPDATE_PROJECT_SUCCESS,
        payload: data,
      });
    } catch (error) {
      if (error.response.status !== 401) {
        dispatch({
          type: UPDATE_PROJECT_ERROR,
          payload: { msg: error.response.data.msg },
        });
      }
    }
  };

  const publishProject = async (id) => {
    dispatch({ type: PUBLISH_PROJECT_BEGIN });
    const { data } = await axios.get(`/api/v1/projects`);
    const { projects } = data;
    const { _id: activeProjId } = projects.find((proj) => proj.isActive);
    console.log(activeProjId);
    try {
      await authFetch.patch(`/projects/${activeProjId}`, {
        isActive: false,
        isPublish: false,
      });
      await authFetch.patch(`/projects/${id}`, {
        isActive: true,
        isPublish: true,
      });
      getAllProjects();
      dispatch({
        type: PUBLISH_PROJECT_SUCCESS,
        payload: id,
      });
    } catch (error) {
      console.log(error.response);
    }
  };

  const uploadFiles = async (filename, resource) => {
    dispatch({ type: UPLOAD_FILES_BEGIN });
    try {
      const {
        data: {
          resource: { src },
        },
      } = await authFetch.post(
        `/projects/uploads/${filename}`,
        {
          resource,
        },
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      let imageValue = src;
      dispatch({
        type: UPLOAD_FILES_SUCCESS,
        payload: imageValue,
      });
      return imageValue;
    } catch (error) {
      dispatch({
        type: UPLOAD_FILES_ERROR,
        payload: { msg: error.response.data.msg },
      });
    }
  };

  const setEditProject = (id) => {
    dispatch({ type: SET_EDIT_PROJECT, payload: { id } });
  };

  const setSectionNum = (sectionNum) => {
    dispatch({ type: SET_SECTION_NO, payload: { sectionNum } });
  };

  const setActiveProject = async () => {
    const { data } = await axios.get(`/api/v1/projects`);
    const { projects } = data;
    const { _id: activeProjId } = projects.find((proj) => proj.isActive);
    dispatch({ type: SET_ACTIVE_PROJECT, payload: { activeProjId } });
  };

  const setCreateProject = async (id) => {
    dispatch({ type: SET_CREATE_PROJECT, payload: { id } });
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
      await authFetch.delete(`/projects/uploads/${id}`);
      await authFetch.delete(`/projects/folder/${id}`);
      getAllProjects();
    } catch (error) {
      console.log(error.response);
      dispatch({
        type: DELETE_PROJECT_ERROR,
        payload: { msg: error.response.data.msg },
      });
    }
  };

  const nextSection = () => {
    dispatch({ type: NEXT_SECTION });
  };

  const prevSection = () => {
    dispatch({ type: PREV_SECTION });
  };

  const setOriginalState = () => {
    dispatch({ type: SET_ORIGINAL_STATE });
  };

  const readCSV = async (id) => {
    dispatch({ type: READ_CSV_BEGIN });
    try {
      const {data} = await authFetch.get(`/projects/participants/${id}`);
      dispatch({
        type: READ_CSV_SUCCESS,
        payload: data.results,
      });
    } catch (error) {
      if (error.response.status !== 401) {
        dispatch({
          type: READ_CSV_ERROR,
          payload: { msg: error.response.data.msg },
        });
      }
    }
  };

  return (
    <AppContext.Provider
      value={{
        ...state,
        setTheme,
        loginUser,
        updateUser,
        getProject,
        removeUserFromLocalStorage,
        getAllProjects,
        createProject,
        setEditProject,
        deleteProject,
        editProject,
        submitFormData,
        publishProject,
        nextSection,
        uploadFiles,
        updateProject,
        updateSection,
        setActiveProject,
        setSectionNum,
        prevSection,
        setOriginalState,
        setCreateProject,
        readCSV,
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
