import axios from 'axios';
import store from '../store';
import { TEACHER_SIGNOUT } from '../constants/actionTypes';
import { BACKEND_URL } from '../constants/url';

const API = axios.create({
  baseURL: `${BACKEND_URL}/teacher`,
  withCredentials: true,
});

// Teacher endpoints
export const createTeacher = ({ name, email, password }) =>
  API.post(`/addTeacher`, { name, email, password });
export const loginTeacher = (data) => API.post(`/login`, data);
export const logoutTeacher = () => API.get(`/logout`);
export const fetchTeachers = () => API.get(`/allTeachers`);

export const createDepartment = ({ name, head }) =>
  API.post(`/departments/create`, { name, head });
export const fetchDepartments = () => API.get(`/departments`);
export const fetchOneDepartment = (id) => API.get(`/departments/${id}`);

export const fetchStudents = () => API.get(`/students`);
export const fetchOneStudent = (id) => API.get(`/students/${id}`);
export const createStudent = ({ name, email, password, departmentId }) =>
  API.post('/departments/addStudent', { name, email, password, departmentId });

export const createSubject = ({ subject, teacher }) =>
  API.post('/subjects/createSubject', { subject, teacher });
export const fetchSubjects = () => API.get(`/subjects`);
export const fetchSubjectById = (id) => API.get(`/subjects/${id}`);

export const addSubject = ({ subjectId, departmentId }) =>
  API.post('/departments/addSubject', { subjectId, departmentId });

API.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    return new Promise((res, rej) => {
      if (error.response.status === 401) {
        store.dispatch({
          type: TEACHER_SIGNOUT,
        });
      }
      rej(error);
    });
  }
);
