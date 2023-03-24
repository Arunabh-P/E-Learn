import {
  TEACHER_SIGNIN,
  TEACHER_VERIFIED,
  TEACHER_SIGNOUT,
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

    case TEACHER_VERIFIED:
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

export const showTeacherProgress = (state = false, action) => {
  switch (action.type) {
    case 'SHOW_TEACHER_PROGRESS':
      return true;
    case 'HIDE_TEACHER_PROGRESS':
      return false;
    default:
      return state;
  }
};
