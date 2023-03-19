import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import MainLayout from './layout/MainLayout';
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainLayout />} />
      </Routes>
    </Router>
  );
}

export default App;
