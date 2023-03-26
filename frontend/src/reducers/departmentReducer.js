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

export const getDepartmentsReducer = (
  state = { loading: true, departments: [] },
  action
) => {
  switch (action.type) {
    case GET_DEPARTMENT_REQUEST:
      return {
        loading: true,
      };
    case GET_DEPARTMENT_SUCCESS:
      return {
        loading: false,
        departments: action.payload,
      };
    case GET_DEPARTMENT_ERROR:
      return {
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};

export const getOneDepartmentReducer = (
  state = {
    loading: true,
    department: [],
  },
  action
) => {
  switch (action.type) {
    case GET_ONE_DEPARTMENT_REQUEST:
      return {
        loading: true,
      };
    case GET_ONE_DEPARTMENT_SUCCESS:
      return {
        loading: false,
        department: action.payload,
      };
    case GET_ONE_DEPARTMENT_ERROR:
      return {
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};

export const createDepartmentReducer = (
  state = {
    loading: true,
    department: [],
  },
  action
) => {
  switch (action.type) {
    case CREATE_DEPARTMENT_REQUEST:
      return {
        loading: true,
      };
    case CREATE_DEPARTMENT_SUCCESS:
      return {
        loading: false,
        department: action.payload,
      };
    case CREATE_DEPARTMENT_ERROR:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};
