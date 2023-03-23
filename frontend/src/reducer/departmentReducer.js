const departmentReducer = (state, action) => {
  switch (action.type) {
    case 'GET_DEPARTMENTS_LOADING':
      return {
        ...state,
        isLoading: true,
      };
    case 'GET_DEPARTMENTS_SUCCESS':
      return {
        ...state,
        isLoading: false,
        departments: action.payload,
      };
    case 'GET_DEPARTMENT_ERROR':
      return {
        ...state,
        isLoading: false,
        isError: true,
      };
    case 'GET_SINGLE_DEPARTMENT_LOADING':
      return {
        ...state,
        isLoading: true,
      };
    case 'GET_SINGLE_DEPARTMENT_SUCCESS':
      return {
        ...state,
        isLoading: false,
        single_department: action.payload,
      };
    case 'GET_SINGLE_DEPARTMENT_ERROR':
      return {
        ...state,
        isLoading: false,
        isError: true,
      };

    default:
      return state;
  }
};

export default departmentReducer;
