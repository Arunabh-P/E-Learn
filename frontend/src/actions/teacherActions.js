import * as api from '../api/teacher';
import {
  TEACHER_SIGNIN,
  TEACHER_VERIFIED,
  TEACHER_SIGNOUT,
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
export const verifyTeacher = () => async (dispatch, getState) => {
  try {
    const { data } = await api.verifyTeacher();
    if (data.status === 200) {
      dispatch({
        type: TEACHER_VERIFIED,
        payload: data,
      });
    }
  } catch (error) {
    const { response } = error;
    if (response?.status === 401) {
      dispatch({
        type: TEACHER_SIGNOUT,
      });
    }
  }
};
