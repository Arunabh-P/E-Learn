import * as api from '../api/teacher';

import {
  GET_STUDENT_REQUEST,
  GET_STUDENT_SUCCESS,
  GET_STUDENT_ERROR,
  GET_STUDENT_BY_ID_REQUEST,
  GET_STUDENT_BY_ID_SUCCESS,
  GET_STUDENT_BY_ID_ERROR,
} from '../constants/actionTypes';

export const getStudentsAction = () => async (dispatch) => {
  try {
    dispatch({ type: GET_STUDENT_REQUEST });

    let { data } = await api.fetchStudents();
    let studentDetails = data.students;

    dispatch({ type: GET_STUDENT_SUCCESS, payload: studentDetails });
  } catch (err) {
    console.log(err);
    dispatch({ type: GET_STUDENT_ERROR });
  }
};

export const getStudentByIdAction = (id) => async (dispatch) => {
  try {
    dispatch({ type: GET_STUDENT_BY_ID_REQUEST });
    let { data } = await api.fetchOneStudent(id);
    dispatch({
      type: GET_STUDENT_BY_ID_SUCCESS,
      payload: data,
    });
  } catch (err) {
    console.log(err);
    dispatch({ type: GET_STUDENT_BY_ID_ERROR });
  }
};
