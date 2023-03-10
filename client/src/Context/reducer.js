import {
  SET_THEME,
  REGISTER_USER_BEGIN,
  REGISTER_USER_SUCCESS,
  REGISTER_USER_ERROR,
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
  GET_USERS_BY_PROJID_BEGIN,
  GET_USERS_BY_PROJID_SUCCESS,
  CREATE_PROJECT_BEGIN,
  CREATE_PROJECT_SUCCESS,
  CREATE_PROJECT_ERROR,
  LOGOUT_USER,
  SET_EDIT_PROJECT,
  DELETE_PROJECT_BEGIN,
  DELETE_PROJECT_ERROR,
  DELETE_USERS_BEGIN,
  DELETE_USERS_ERROR,
  DELETE_ALL_USERS_BEGIN,
  DELETE_ALL_USERS_ERROR,
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
  SEND_EMAIL_BEGIN,
  SEND_EMAIL_SUCCESS,
  SEND_EMAIL_ERROR,
} from "./actions";

import { initialState } from "./AppContext";

const reducer = (state, action) => {
  if (action.type === SET_THEME) {
    return { ...state, theme: action.payload };
  }

  if (action.type === REGISTER_USER_BEGIN) {
    return { ...state };
  }
  if (action.type === REGISTER_USER_SUCCESS) {
    return {
      ...state,
    };
  }
  if (action.type === REGISTER_USER_ERROR) {
    return {
      ...state,
      isValid: false,
    };
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
      data: action.payload?.data,
      projDetails: action.payload?.projDetails,
      theme: action.payload?.projDetails.theme,
      sections: action.payload?.sections,
      // emailList: action.payload ? action.payload.emailList : [],
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

  if (action.type === GET_USERS_BY_PROJID_BEGIN) {
    return { ...state, isLoading: true };
  }
  if (action.type === GET_USERS_BY_PROJID_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      users: action.payload,
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
      projId: action.payload,
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
      formData: action.payload.formData,
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
      projId: _id,
      projDetails,
      data,
      sections,
      theme: projDetails.theme,
    };
  }

  if (action.type === SET_SECTION_NO) {
    return {
      ...state,
      isLoading: true,
      sectionNum: action.payload.sectionNum,
    };
  }

  if (action.type === SET_ACTIVE_PROJECT) {
    return {
      ...state,
      activeProjectId: action.payload.activeProjId,
    };
  }

  if (action.type === SET_CREATE_PROJECT) {
    return {
      ...state,
      projId: action.payload.id,
    };
  }

  if (action.type === DELETE_PROJECT_BEGIN) {
    return { ...state, isLoading: true };
  }
  if (action.type === DELETE_PROJECT_ERROR) {
    return {
      ...state,
      isLoading: false,
      errorMsg: action.payload.msg,
    };
  }
  if (action.type === DELETE_USERS_BEGIN) {
    return { ...state, isLoading: true };
  }
  if (action.type === DELETE_USERS_ERROR) {
    return {
      ...state,
      isLoading: false,
      errorMsg: action.payload.msg,
    };
  }

  if (action.type === DELETE_ALL_USERS_BEGIN) {
    return { ...state, isLoading: true };
  }
  if (action.type === DELETE_ALL_USERS_ERROR) {
    return {
      ...state,
      isLoading: false,
      errorMsg: action.payload.msg,
    };
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

  if (action.type === PREV_SECTION) {
    return {
      ...state,
      sectionNum: state.sectionNum - 1,
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
    const { projType, data } = action.payload;
    console.log(data);
    if (projType === "projData") {
      return {
        ...state,
        isLoading: false,
        data: data.updatedProject.data,
      };
    }
    if (projType === "projDetails") {
      return {
        ...state,
        isLoading: false,
        projDetails: data.updatedProject.projDetails,
      };
    }
    if (projType === "emailList") {
      return {
        ...state,
        isLoading: false,
        emailList: data.updatedProject.emailList,
      };
    }
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

  if (action.type === SET_ORIGINAL_STATE) {
    return {
      ...state,
      isEditing: initialState.isEditing,
      projDetails: initialState.projDetails,
      data: initialState.data,
      sections: initialState.sections,
      sectionNum: initialState.sectionNum,
    };
  }

  if (action.type === READ_CSV_BEGIN) {
    return { ...state, isLoading: true };
  }
  if (action.type === READ_CSV_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      participants: action.payload,
    };
  }
  if (action.type === READ_CSV_ERROR) {
    return {
      ...state,
      isLoading: false,
    };
  }

  if (action.type === SEND_EMAIL_BEGIN) {
    return { ...state, isLoading: true };
  }
  if (action.type === SEND_EMAIL_SUCCESS) {
    return {
      ...state,
      isLoading: false,
    };
  }
  if (action.type === SEND_EMAIL_ERROR) {
    return {
      ...state,
      isLoading: false,
    };
  }
  throw new Error(`no such action: ${action.type}`);
};

export default reducer;
