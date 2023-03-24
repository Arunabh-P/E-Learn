import {
  GET_DEPARTMENT_ERROR,
  GET_DEPARTMENT_REQUEST,
  GET_DEPARTMENT_SUCCESS,
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
