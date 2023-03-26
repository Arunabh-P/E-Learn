import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';

import {
  getDepartmentsReducer,
  getOneDepartmentReducer,
  createDepartmentReducer,
} from './reducers/departmentReducer';

import {
  getStudentsReducer,
  getStudentByIdReducer,
} from './reducers/studentReducer';

import { teacherDetails, getTeachersReducer } from './reducers/teacherReducer';
const reducers = combineReducers({
  teacherDetails,
  getDepartmentsReducer,
  getOneDepartmentReducer,
  getStudentsReducer,
  getStudentByIdReducer,
  getTeachersReducer,
  createDepartmentReducer,
});

const store = createStore(
  reducers,
  composeWithDevTools(applyMiddleware(thunk)) || compose(applyMiddleware(thunk))
);

export default store;
