import * as api from '../api/teacher';
import {
  CREATE_SUBJECT_ERROR,
  CREATE_SUBJECT_REQUEST,
  CREATE_SUBJECT_SUCCESS,
  GET_SUBJECT_REQUEST,
  GET_SUBJECT_SUCCESS,
  GET_SUBJECT_ERROR,
  GET_SUBJECT_BY_ID_ERROR,
  GET_SUBJECT_BY_ID_REQUEST,
  GET_SUBJECT_BY_ID_SUCCESS,
  ADD_SUBJECT_TO_DEP_REQUEST,
  ADD_SUBJECT_TO_DEP_SUCCESS,
  ADD_SUBJECT_TO_DEP_ERROR,
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

export const getSubjectAction = () => async (dispatch) => {
  try {
    dispatch({ type: GET_SUBJECT_REQUEST });

    let { data } = await api.fetchSubjects();
    let subjectDetails = data.subjects;

    dispatch({ type: GET_SUBJECT_SUCCESS, payload: subjectDetails });
  } catch (error) {
    console.log(error);
    dispatch({
      type: GET_SUBJECT_ERROR,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const addSubjectToDepAction =
  (subjectId, departmentId) => async (dispatch) => {
    try {
      dispatch({ type: ADD_SUBJECT_TO_DEP_REQUEST });

      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      };
      const { data } = await api.addSubject(subjectId, departmentId, config);
      dispatch({ type: ADD_SUBJECT_TO_DEP_SUCCESS, payload: data });
      return true;
    } catch (error) {
      console.log(error);
      dispatch({
        type: ADD_SUBJECT_TO_DEP_ERROR,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
      return false;
    }
  };
