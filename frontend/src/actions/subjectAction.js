import * as api from '../api/teacher';
import {
  CREATE_SUBJECT_ERROR,
  CREATE_SUBJECT_REQUEST,
  CREATE_SUBJECT_SUCCESS,
} from '../constants/actionTypes';

export const createSubjectAction = (subject, teacher) => async (dispatch) => {
  try {
    dispatch({ type: CREATE_SUBJECT_REQUEST });

    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    const { data } = await api.createSubject(subject, teacher, config);
    dispatch({ type: CREATE_SUBJECT_SUCCESS, payload: data });
    return true;
  } catch (error) {
    console.log(error);
    dispatch({
      type: CREATE_SUBJECT_ERROR,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
    return false;
  }
};
