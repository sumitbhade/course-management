import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import CourseList from "./pages/CourseList";
import CourseDetails from "./pages/CourseDetails";
import Dashboard from "./pages/Dashboard";

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        {/* Added mt-8 for top margin and mb-8 for bottom margin */}
        <main className="container mx-auto px-4 py-8 mt-8 mb-8">
          <Routes>
            <Route path="/" element={<CourseList />} />
            <Route path="/courses" element={<CourseList />} />
            <Route path="/course/:id" element={<CourseDetails />} />
            <Route path="/dashboard" element={<Dashboard />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
