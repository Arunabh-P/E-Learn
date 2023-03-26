import * as api from '../api/teacher';
import {
  GET_DEPARTMENT_ERROR,
  GET_DEPARTMENT_REQUEST,
  GET_DEPARTMENT_SUCCESS,
  GET_ONE_DEPARTMENT_REQUEST,
  GET_ONE_DEPARTMENT_SUCCESS,
  GET_ONE_DEPARTMENT_ERROR,
  CREATE_DEPARTMENT_REQUEST,
  CREATE_DEPARTMENT_SUCCESS,
  CREATE_DEPARTMENT_ERROR,
} from '../constants/actionTypes';

export const getDepartmentsAction = () => async (dispatch) => {
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

export const getOneDepartmentAction = (id) => async (dispatch) => {
  try {
    dispatch({ type: GET_ONE_DEPARTMENT_REQUEST });
    let { data } = await api.fetchOneDepartment(id);
    dispatch({
      type: GET_ONE_DEPARTMENT_SUCCESS,
      payload: data,
    });
  } catch (err) {
    console.log(err);
    dispatch({ type: GET_ONE_DEPARTMENT_ERROR });
  }
};

export const createDepartmentAction = (name, head) => async (dispatch) => {
  try {
    dispatch({ type: CREATE_DEPARTMENT_REQUEST });
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    console.log('heyyyyyyyyyyy');
    const { data } = await api.createDepartment(name, head, config);
    console.log(data, 'dep data');

    dispatch({ type: CREATE_DEPARTMENT_SUCCESS, payload: data });
  } catch (err) {
    console.log(err);
    dispatch({ type: CREATE_DEPARTMENT_ERROR });
  }
};
