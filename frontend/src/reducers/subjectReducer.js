import {
  CREATE_SUBJECT_ERROR,
  CREATE_SUBJECT_REQUEST,
  CREATE_SUBJECT_SUCCESS,
} from '../constants/actionTypes';

export const createSubjectReducer = (
  state = { loading: true, subjects: [] },
  action
) => {
  switch (action.type) {
    case CREATE_SUBJECT_REQUEST:
      return {
        loading: true,
      };
    case CREATE_SUBJECT_SUCCESS:
      return {
        loading: false,
        subjects: action.payload,
      };
    case CREATE_SUBJECT_ERROR:
      return {
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};
