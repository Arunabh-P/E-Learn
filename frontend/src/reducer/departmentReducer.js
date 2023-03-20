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

    default:
      return state;
  }
};

export default departmentReducer;
