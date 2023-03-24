import * as api from '../api/teacher';
import {
  GET_DEPARTMENT_ERROR,
  GET_DEPARTMENT_REQUEST,
  GET_DEPARTMENT_SUCCESS,
} from '../constants/actionTypes';

export const getDepartmentsAction = () => async (dispatch, getState) => {
  try {
    dispatch({ type: GET_DEPARTMENT_REQUEST });

    let { data } = await api.fetchDepartments();
    let dipartmentDetails = data.departments;

    dispatch({ type: GET_DEPARTMENT_SUCCESS, payload: dipartmentDetails });
  } catch (err) {
    console.log(err);
    dispatch({ type: GET_DEPARTMENT_ERROR });
  }
};
