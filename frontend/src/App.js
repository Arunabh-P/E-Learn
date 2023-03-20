import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import MainLayout from './layout/MainLayout';
import Department from './pages/Department';
import Students from './pages/Students';
import Tasks from './pages/Tasks';
import Login from './pages/Login';
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/teacher" element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path="department" element={<Department />} />
          <Route path="students" element={<Students />} />
          <Route path="tasks" element={<Tasks />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
