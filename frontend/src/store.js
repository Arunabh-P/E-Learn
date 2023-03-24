import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';

import { getDepartmentsReducer } from './reducers/departmentReducer';

import { teacherDetails, showTeacherProgress } from './reducers/teacherReducer';
const reducers = combineReducers({
  teacherDetails,
  showTeacherProgress,
  getDepartmentsReducer,
});

const store = createStore(
  reducers,
  composeWithDevTools(applyMiddleware(thunk)) || compose(applyMiddleware(thunk))
);

export default store;
