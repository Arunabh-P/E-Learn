import * as api from '../api/teacher';
import { TEACHER_SIGNIN } from '../constants/actionTypes';

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
