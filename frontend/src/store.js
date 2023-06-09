import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';

import {
  getDepartmentsReducer,
  getOneDepartmentReducer,
  createDepartmentReducer,
  createStudentReducer,
} from './reducers/departmentReducer';

import {
  getStudentsReducer,
  getStudentByIdReducer,
} from './reducers/studentReducer';

import {
  teacherDetails,
  getTeachersReducer,
  createTeacherReducer,
} from './reducers/teacherReducer';

import {
  getSubjectReducer,
  createSubjectReducer,
} from './reducers/subjectReducer';
const reducers = combineReducers({
  teacherDetails,
  getDepartmentsReducer,
  getOneDepartmentReducer,
  getStudentsReducer,
  getStudentByIdReducer,
  getTeachersReducer,
  createDepartmentReducer,
  createStudentReducer,
  createTeacherReducer,
  createSubjectReducer,
  getSubjectReducer,
});

const store = createStore(
  reducers,
  composeWithDevTools(applyMiddleware(thunk)) || compose(applyMiddleware(thunk))
);

export default store;
