import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Department from './pages/Department';
import Students from './pages/Students';
import Tasks from './pages/Tasks';
import Login from './pages/Login';
import SingleDepartment from './pages/SingleDepartment';
import SideNav from './components/SideNav';
function App() {
  return (
    <>
      <Router>
        <SideNav />
        <Routes>
          <Route path="/singleDepartment/:id" element={<SingleDepartment />} />
          <Route path="/department" element={<Department />} />
          <Route path="/students" element={<Students />} />
          <Route path="/tasks" element={<Tasks />} />
          <Route path="/teacher" element={<Home />} />
        </Routes>
        {/* <Route path="/teacher" element={<MainLayout />}>
            <Route index element={<Home />} />
            <Route path="department" element={<Department />} />
            <Route path="students" element={<Students />} />
            <Route path="tasks" element={<Tasks />} />
          </Route> */}
      </Router>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
