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
  GET_ALL_PROJECTS_BEGIN,
  GET_ALL_PROJECTS_SUCCESS,
  CREATE_PROJECT_BEGIN,
  CREATE_PROJECT_SUCCESS,
  CREATE_PROJECT_ERROR,
  LOGOUT_USER,
  SET_EDIT_PROJECT,
} from "./actions";

import { initialState } from "./AppContext";

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
    return { ...state, isLoading: true };
  }

  if (action.type === CREATE_PROJECT_SUCCESS) {
    return {
      ...state,
      isLoading: false,
    };
  }
  if (action.type === CREATE_PROJECT_ERROR) {
    return {
      ...state,
      isLoading: false,
    };
  }
  if (action.type === SET_EDIT_PROJECT) {
    const project = state.projects.find(
      (project) => project._id === action.payload.id
    );
    const {
      _id,
      name,
      isActive,
      isPublish,
      proj,
      attractiveInstruc,
      audioInstruc,
      rankInstruc,
      audioRatingInstruc,
      introInstruc,
      writtenIntro,
      prewrittenInstruc,
      messageOptions,
      audio,
    } = project;
    return {
      ...state,
      isEditing: true,
      editProjectId: _id,
      name,
      isActive,
      isPublish,
      proj,
      attractiveInstruc,
      audioInstruc,
      rankInstruc,
      audioRatingInstruc,
      introInstruc,
      writtenIntro,
      prewrittenInstruc,
      messageOptions,
      audio,
    };
  }
  throw new Error(`no such action: ${action.type}`);
};

export default reducer;
