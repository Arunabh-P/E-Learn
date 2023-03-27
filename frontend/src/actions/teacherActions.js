import * as api from '../api/teacher';
import {
  TEACHER_SIGNIN,
  GET_TEACHER_REQUEST,
  GET_TEACHER_SUCCESS,
  GET_TEACHER_ERROR,
  CREATE_TEACHER_REQUEST,
  CREATE_TEACHER_SUCCESS,
  CREATE_TEACHER_ERROR,
} from '../constants/actionTypes';

export const signIn = (loginData, setResponse) => async (dispatch) => {
  try {
    dispatch({ type: 'SHOW_PROGRESS' });
    const { data } = await api.loginTeacher(loginData);
    dispatch({ type: 'HIDE_PROGRESS' });
    dispatch({
      type: TEACHER_SIGNIN,
      payload: data,
    });
  } catch (error) {
    dispatch({ type: 'HIDE_PROGRESS' });
    setResponse((prev) => ({
      ...prev,
      status: true,
      message: error.response.data?.message,
    }));
  }
};

export const getTeacherAction = () => async (dispatch) => {
  try {
    dispatch({ type: GET_TEACHER_REQUEST });

    let { data } = await api.fetchTeachers();
    let teachersData = data.teachers;

    dispatch({ type: GET_TEACHER_SUCCESS, payload: teachersData });
  } catch (err) {
    dispatch({ type: GET_TEACHER_ERROR });
  }
};

export const createTeacherAction =
  (name, email, password) => async (dispatch) => {
    try {
      dispatch({ type: CREATE_TEACHER_REQUEST });

      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      };

      const { data } = await api.createTeacher(name, password, email, config);
      dispatch({ type: CREATE_TEACHER_SUCCESS, payload: data });
      return true;
    } catch (error) {
      console.log(error);
      dispatch({
        type: CREATE_TEACHER_ERROR,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
      return false;
    }
  };
