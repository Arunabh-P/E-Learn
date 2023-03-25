import {
  GET_STUDENT_REQUEST,
  GET_STUDENT_SUCCESS,
  GET_STUDENT_ERROR,
  GET_STUDENT_BY_ID_REQUEST,
  GET_STUDENT_BY_ID_SUCCESS,
  GET_STUDENT_BY_ID_ERROR,
} from '../constants/actionTypes';

export const getStudentsReducer = (
  state = { loading: true, students: [] },
  action
) => {
  switch (action.type) {
    case GET_STUDENT_REQUEST:
      return {
        loading: true,
      };
    case GET_STUDENT_SUCCESS:
      return {
        loading: false,
        students: action.payload,
      };
    case GET_STUDENT_ERROR:
      return {
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};

export const getStudentByIdReducer = (
  state = {
    loading: true,
    student: [],
  },
  action
) => {
  switch (action.type) {
    case GET_STUDENT_BY_ID_REQUEST:
      return {
        loading: true,
      };
    case GET_STUDENT_BY_ID_SUCCESS:
      return {
        loading: false,
        student: action.payload,
      };
    case GET_STUDENT_BY_ID_ERROR:
      return {
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};
