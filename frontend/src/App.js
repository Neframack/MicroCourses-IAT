import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import CourseDetail from './pages/CourseDetail';

function App() {
  return (
    <Router>
      <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/courses/:id" element={<CourseDetail />} />
      </Routes>
    </Router>
  );
}

export default App;
