const teacherReducer = (state, action) => {
  switch (action.type) {
    case 'LOGIN_LOADING':
      return {
        ...state,
        isLoading: true,
      };
    case 'LOGIN_SUCESS':
      return {
        ...state,
        isLoading: false,
        teacherInfo: action.payload,
        isError: false,
      };
    case 'LOGIN_FAIL':
      return {
        ...state,
        teacherInfo: null,
        isError: action.payload,
      };
    case 'LOGOUT':
      return {
        ...state,
        teacherInfo: null,
        isError: false,
      };

    default:
      return state;
  }
};

export default teacherReducer;