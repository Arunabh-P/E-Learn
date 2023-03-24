import './App.css';
import TopProgress from './components/TeacherComponents/TopProgress';
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
function App() {
  const teacher = useSelector((state) => state.teacherDetails.teacher);
  const { showTopProgress } = useSelector((state) => state);
  return (
    <>
      <Router>
        {teacher ? <SideNav /> : ''}
        {teacher ? <NavBar /> : ''}

        <Routes>
          <Route path="/teacher" element={teacher ? <Home /> : <Login />} />
          <Route
            path="/teacher/department"
            element={teacher ? <Department /> : <Login />}
          />
          <Route
            path="/teacher/students"
            element={teacher ? <Students /> : <Login />}
          />
          <Route
            path="/teacher/tasks"
            element={teacher ? <Tasks /> : <Login />}
          />
        </Routes>
      </Router>
      {showTopProgress && <TopProgress />}
      {/* <Router>
        <SideNav />
        <Routes>
          <Route path="/singleDepartment/:id" element={<SingleDepartment />} />
          <Route path="/department" element={<Department />} />
          <Route path="/students" element={<Students />} />
          <Route path="/tasks" element={<Tasks />} />
          <Route path="/" element={<Home />} />
        </Routes>
      </Router>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
        </Routes>
      </Router> */}
    </>
  );
}

export default App;
