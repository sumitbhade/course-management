import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import CourseList from "./pages/CourseList";
import CourseDetails from "./pages/CourseDetails";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<CourseList />} />
        <Route path="/courses" element={<CourseList />} />
        <Route path="/course/:id" element={<CourseDetails />} />
      </Routes>
    </Router>
  );
}

export default App;
