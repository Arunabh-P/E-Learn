import { createContext, useContext, useEffect, useReducer } from 'react';
import axios from 'axios';
import reducer from '../reducer/teacherReducer';

const AppContext = createContext();
const getTeacherData = () => {
  let teacherData = localStorage.getItem('teacherInfo');
  const parseData = JSON.parse(teacherData);
  if (!parseData) return null;
  return parseData;
};
const initialState = {
  isLoading: false,
  isError: false,
  teacherInfo: getTeacherData(),
};
const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const login = async (email, password) => {
    dispatch({ type: 'LOGIN_LOADING' });
    try {
      const config = {
        headers: {
          'Content-type': 'application/json',
        },
      };
      const { data } = await axios.post(
        'http://localhost:5000/api/teachers/login',
        {
          email,
          password,
        },
        config
      );
      localStorage.setItem('teacherInfo', JSON.stringify(data));
      dispatch({ type: 'LOGIN_SUCESS', payload: data });
    } catch (error) {
      dispatch({ type: 'LOGIN_FAIL', payload: error.response.data.message });
    }
  };

  return (
    <AppContext.Provider value={{ state, login }}>
      {children}
    </AppContext.Provider>
  );
};

const useTeacherContext = () => {
  return useContext(AppContext);
};

export { AppProvider, AppContext, useTeacherContext };
