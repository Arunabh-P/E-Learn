import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useReducer,
} from 'react';
import axios from 'axios';
import reducer from '../reducer/departmentReducer';
import { useTeacherContext } from './teacherContext';

const DepartmentContext = createContext();

const initialState = {
  isLoading: true,
  isError: false,
  departments: null,
};

const DepartmentProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const teacherDetails = useTeacherContext();
  let token = teacherDetails?.state?.teacherInfo?.token;
  console.log(token, 'come');
  const getDepartments = useCallback(async () => {
    dispatch({ type: 'GET_DEPARTMENTS_LOADING' });
    try {
      let teacher = token;
      console.log(teacher, 'heloooooo here is teacher can u see');
      const config = {
        headers: {
          Authorization: `Bearer ${teacher}`,
        },
      };
      const res = await axios.get(
        'http://localhost:5000/api/department/allDepartments',
        config
      );
      const departmentData = res.data.departments;
      console.log(departmentData, 'departments');
      dispatch({ type: 'GET_DEPARTMENTS_SUCCESS', payload: departmentData });
    } catch (error) {
      dispatch({
        type: 'GET_DEPARTMENT_ERROR',
        payload: error.res ? error.res.data.message : error.message,
        // payload: error.res.data.message,
      });
    }
  }, [token]);
  useEffect(() => {
    getDepartments();
  }, [getDepartments]);

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
