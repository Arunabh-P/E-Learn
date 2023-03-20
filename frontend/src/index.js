import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';
import { AppProvider } from './context/teacherContext';
import { DepartmentProvider } from './context/DepartmentContext';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <DepartmentProvider>
    <AppProvider>
      <App />
    </AppProvider>
  </DepartmentProvider>
);
