import {
  SET_THEME,
  LOGIN_USER_BEGIN,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_ERROR,
  UPDATE_USER_BEGIN,
  UPDATE_USER_ERROR,
  UPDATE_USER_SUCCESS,
  GET_PROJECT_SUCCESS,
  GET_PROJECT_BEGIN,
  GET_PROJECT_ERROR,
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
  PUBLISH_PROJECT_BEGIN,
  PUBLISH_PROJECT_SUCCESS,
  NEXT_SECTION,
  UPLOAD_FILES_BEGIN,
  UPLOAD_FILES_SUCCESS,
  UPLOAD_FILES_ERROR,
  UPDATE_PROJECT_BEGIN,
  UPDATE_PROJECT_SUCCESS,
  UPDATE_PROJECT_ERROR,
} from "./actions";

import { initialState } from "./AppContext";

const reducer = (state, action) => {
  if (action.type === SET_THEME) {
    return action.payload;
  }
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
      isValid: false,
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
      isValid: false,
    };
  }
  if (action.type === GET_PROJECT_BEGIN) {
    return { ...state, isLoading: true };
  }
  if (action.type === GET_PROJECT_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      data: action.payload.data,
      projDetails:action.payload.projDetails,
      sections:action.payload.sections,
    };
  }
  if (action.type === GET_PROJECT_ERROR) {
    return {
      ...state,
      isLoading: false,
    };
  }

  if (action.type === GET_ALL_PROJECTS_BEGIN) {
    return { ...state, isLoading: true };
  }
  if (action.type === GET_ALL_PROJECTS_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      projects: action.payload,
    };
  }

  if (action.type === LOGOUT_USER) {
    return {
      ...initialState,
      user: null,
      token: null,
    };
  }
  if (action.type === CREATE_PROJECT_BEGIN) {
    return { ...state, isLoading: true, isEditing: false };
  }

  if (action.type === CREATE_PROJECT_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      createdProjectId: action.payload,
    };
  }
  if (action.type === CREATE_PROJECT_ERROR) {
    return {
      ...state,
      isLoading: false,
    };
  }

  if (action.type === SUBMIT_FORM_DATA) {
    return {
      ...state,
      data: action.payload.formData,
    };
  }
  if (action.type === SET_EDIT_PROJECT) {
    const project = state.projects.find(
      (project) => project._id === action.payload.id
    );

    const { projDetails, _id, data, sections } = project;
    return {
      ...state,
      isEditing: true,
      editProjectId: _id,
      projDetails,
      data,
      sections,
    };
  }

  if (action.type === DELETE_PROJECT_BEGIN) {
    return { ...state, isLoading: true };
  }
  if (action.type === EDIT_PROJECT_BEGIN) {
    return {
      ...state,
      isLoading: true,
    };
  }
  if (action.type === EDIT_PROJECT_SUCCESS) {
    return {
      ...state,
      isLoading: false,
    };
  }
  if (action.type === EDIT_PROJECT_ERROR) {
    return {
      ...state,
      isLoading: false,
    };
  }

  if (action.type === PUBLISH_PROJECT_BEGIN) {
    return { ...state, isLoading: true };
  }
  if (action.type === PUBLISH_PROJECT_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      activeProjectId: action.payload,
    };
  }
  if (action.type === NEXT_SECTION) {
    return {
      ...state,
      sectionNum: state.sectionNum + 1,
    };
  }


  if (action.type === UPLOAD_FILES_BEGIN) {
    return { ...state, isLoading: true };
  }

  if (action.type === UPLOAD_FILES_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      fileLink: action.payload,
    };
  }
  if (action.type === UPLOAD_FILES_ERROR) {
    return {
      ...state,
      isLoading: false,
    };
  }

  if (action.type === UPDATE_PROJECT_BEGIN) {
    return { ...state, isLoading: true };
  }
  if (action.type === UPDATE_PROJECT_SUCCESS) {
    console.log(action.payload);
    return {
      ...state,
      isLoading: false,
    };
  }
  if (action.type === UPDATE_PROJECT_ERROR) {
    return {
      ...state,
      isLoading: false,
    };
  }
  throw new Error(`no such action: ${action.type}`);
};

export default reducer;
