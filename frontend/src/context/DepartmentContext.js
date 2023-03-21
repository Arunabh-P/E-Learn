import { createContext, useContext, useEffect, useReducer } from 'react';
import axios from 'axios';
import reducer from '../reducer/departmentReducer';

const DepartmentContext = createContext();

const API = 'http://localhost:5000/api/department/allDepartments';
const getTeacherData = () => {
  let teacherData = localStorage.getItem('teacherInfo');
  const parseData = JSON.parse(teacherData);
  if (!parseData) return null;
  return parseData;
};
const initialState = {
  isLoading: false,
  isError: false,
  departments: [],
  teacherInfo: getTeacherData(),
};

const DepartmentProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const getDepartments = async (url) => {
    dispatch({ type: 'GET_DEPARTMENTS_LOADING' });
    try {
      let teacher = state.teacherInfo.token;
      const config = {
        headers: {
          Authorization: `Bearer ${teacher}`,
        },
      };
      // console.log(state.teacherInfo.token, 'heyyy');
      const res = await axios.get(url, config);
      const departments = await res.data.departments;
      console.log(departments, 'departments');
      dispatch({ type: 'GET_DEPARTMENTS_SUCCESS', payload: departments });
    } catch (error) {
      dispatch({
        type: 'GET_DEPARTMENT_ERROR',
        payload: error.res.data.message,
      });
    }
  };
  useEffect(() => {
    getDepartments(API);
  }, []);

  return (
    <DepartmentContext.Provider value={{ ...state, getDepartments }}>
      {children}
    </DepartmentContext.Provider>
  );
};

const useDepartmentContext = () => {
  return useContext(DepartmentContext);
};
export { DepartmentProvider, useDepartmentContext };
