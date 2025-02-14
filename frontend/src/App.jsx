import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import CourseList from "./pages/CourseList";
import Dashboard from "./pages/Dashboard";
import CourseDetails from "./pages/CourseDetails";

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <main>
          <Routes>
            <Route path="/" element={<CourseList />} />
            <Route path="/courses" element={<CourseList />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/course/:id" element={<CourseDetails />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
