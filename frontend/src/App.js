import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Department from './pages/Department';
import Students from './pages/Students';
import Tasks from './pages/Tasks';
import Login from './pages/Login';
import SingleDepartment from './pages/SingleDepartment';
import SideNav from './components/SideNav';
import { useSelector } from 'react-redux';
import NavBar from './components/NavBar';
import StudentInfo from './pages/StudentInfo';
import Teachers from './pages/Teachers';
function App() {
  const teacher = useSelector((state) => state.teacherDetails.teacher);
  return (
    <>
      <Router>
        {teacher ? <SideNav /> : ''}
        {teacher ? <NavBar /> : ''}

        <Routes>
          <Route exact path="/teacher">
            <Route path="" element={teacher ? <Home /> : <Login />} />
            <Route
              path="department"
              element={teacher ? <Department /> : <Login />}
            />
            <Route
              path="students"
              element={teacher ? <Students /> : <Login />}
            />
            <Route path="tasks" element={teacher ? <Tasks /> : <Login />} />
            <Route
              path="teachers"
              element={teacher ? <Teachers /> : <Login />}
            />

            <Route
              path="department/:id"
              element={teacher ? <SingleDepartment /> : <Login />}
            />
            <Route
              path="students/:id"
              element={teacher ? <StudentInfo /> : <Login />}
            />
          </Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;
