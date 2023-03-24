// import {
//   createContext,
//   useCallback,
//   useContext,
//   useEffect,
//   useReducer,
// } from 'react';
// import axios from 'axios';
// import reducer from '../reducer/departmentReducer';
// import { useTeacherContext } from './teacherContext';

// const DepartmentContext = createContext();
// const getTeacherData = () => {
//   let teacherData = localStorage.getItem('teacherInfo');
//   const parseData = JSON.parse(teacherData);
//   if (!parseData) return null;
//   return parseData;
// };
// const initialState = {
//   isLoading: false,
//   isError: false,
//   departments: [],
//   single_department: [],
//   teacherInfo: getTeacherData(),
// };

// const DepartmentProvider = ({ children }) => {
//   const [state, dispatch] = useReducer(reducer, initialState);
//   const teacherDetails = useTeacherContext();
//   let token = teacherDetails?.state?.teacherInfo?.token;
//   const getDepartments = useCallback(async () => {
//     dispatch({ type: 'GET_DEPARTMENTS_LOADING' });
//     try {
//       let teacher = token;
//       console.log(teacher, 'heloooooo here is teacher can u see');
//       const config = {
//         headers: {
//           Authorization: `Bearer ${teacher}`,
//         },
//       };
//       const res = await axios.get(
//         'http://localhost:5000/api/department/allDepartments',
//         config
//       );
//       const departmentData = res.data.departments;
//       console.log(departmentData, 'departments');
//       dispatch({ type: 'GET_DEPARTMENTS_SUCCESS', payload: departmentData });
//     } catch (error) {
//       dispatch({
//         type: 'GET_DEPARTMENT_ERROR',
//         payload: error.res ? error.res.data.message : error.message,
//       });
//     }
//   }, [token]);
//   const getSingleDepartment = useCallback(
//     async (id) => {
//       dispatch({ type: 'GET_SINGLE_DEPARTMENT_LOADING' });
//       try {
//         let teacher = token;
//         const config = {
//           headers: {
//             Authorization: `Bearer ${teacher}`,
//           },
//         };
//         const res = await axios.get(
//           `http://localhost:5000/api/department/${id}`,
//           config
//         );
//         const singleDepartment = res.data;
//         console.log(singleDepartment, 'single department');
//         dispatch({
//           type: 'GET_SINGLE_DEPARTMENT_SUCCESS',
//           payload: singleDepartment,
//         });
//       } catch (error) {
//         dispatch({
//           type: 'GET_SINGLE_DEPARTMENT_ERROR',
//           payload: error.res ? error.res.data.message : error.message,
//         });
//       }
//     },
//     [token]
//   );

//   useEffect(() => {
//     getDepartments();
//     getSingleDepartment();
//   }, [getDepartments, getSingleDepartment]);

//   return (
//     <DepartmentContext.Provider
//       value={{ ...state, getDepartments, getSingleDepartment }}
//     >
//       {children}
//     </DepartmentContext.Provider>
//   );
// };

// const useDepartmentContext = () => {
//   return useContext(DepartmentContext);
// };
// export { DepartmentProvider, useDepartmentContext };
