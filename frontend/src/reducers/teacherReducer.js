import {
  TEACHER_SIGNIN,
  TEACHER_SIGNOUT,
  GET_TEACHER_REQUEST,
  GET_TEACHER_SUCCESS,
  GET_TEACHER_ERROR,
  CREATE_TEACHER_REQUEST,
  CREATE_TEACHER_SUCCESS,
  CREATE_TEACHER_ERROR,
} from '../constants/actionTypes';
import { encodeData, decodeData } from '../validations/encryptInfo';

let authData = { teacher: null, loading: false };

try {
  authData = localStorage.getItem('teacherInfo')
    ? {
        ...authData,
        teacher: decodeData(localStorage.getItem('teacherInfo')),
      }
    : { teacher: null };
} catch (error) {
  authData = {
    ...authData,
    teacher: null,
  };
  localStorage.removeItem('teacherInfo');
}

export const teacherDetails = (teacher = authData, action) => {
  switch (action.type) {
    case TEACHER_SIGNIN:
      localStorage.setItem('teacherInfo', encodeData(action.payload));
      return {
        ...teacher,
        teacher: action.payload,
        loading: false,
      };

    case TEACHER_SIGNOUT:
      localStorage.removeItem('teacherInfo');
      return {
        teacher: null,
        loading: false,
      };

    default:
      return teacher;
  }
};

export const getTeachersReducer = (
  state = { loading: true, teachers: [] },
  action
) => {
  switch (action.type) {
    case GET_TEACHER_REQUEST:
      return {
        loading: true,
      };
    case GET_TEACHER_SUCCESS:
      return {
        loading: false,
        teachers: action.payload,
      };
    case GET_TEACHER_ERROR:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const createTeacherReducer = (
  state = {
    loading: true,
    teacher: [],
  },
  action
) => {
  switch (action.type) {
    case CREATE_TEACHER_REQUEST:
      return {
        loading: true,
      };
    case CREATE_TEACHER_SUCCESS:
      return {
        loading: false,
        teacher: action.payload,
      };
    case CREATE_TEACHER_ERROR:
      return {
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};
