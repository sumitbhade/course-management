import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchCourseById,
  selectCurrentCourse,
  selectCourseStatus,
  selectCourseError,
  clearCurrentCourse,
} from "../store/slices/courseSlice";

function CourseDetails() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const course = useSelector(selectCurrentCourse);
  const status = useSelector(selectCourseStatus);
  const error = useSelector(selectCourseError);

  useEffect(() => {
    dispatch(fetchCourseById(id));

    // Cleanup when component unmounts
    return () => {
      dispatch(clearCurrentCourse());
    };
  }, [dispatch, id]);

  if (status === "loading") {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-red-500 text-center">
          <p>{error}</p>
          <button
            onClick={() => navigate("/courses")}
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Back to Courses
          </button>
        </div>
      </div>
    );
  }

  if (!course) {
    return null;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
        <img
          src={course.thumbnail}
          alt={course.name}
          className="w-full h-64 object-cover"
        />

        <div className="p-8">
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-3xl font-bold text-gray-800 mb-2">
                {course.name}
              </h1>
              <p className="text-gray-600 mb-4">
                Instructor: {course.instructor}
              </p>
            </div>
            <span
              className={`px-4 py-2 rounded-full text-sm font-semibold ${
                course.enrollmentStatus === "Open"
                  ? "bg-green-100 text-green-800"
                  : course.enrollmentStatus === "In Progress"
                  ? "bg-yellow-100 text-yellow-800"
                  : "bg-red-100 text-red-800"
              }`}
            >
              {course.enrollmentStatus}
            </span>
          </div>

          <div className="mt-6">
            <h2 className="text-xl font-semibold mb-2">Description</h2>
            <p className="text-gray-700">{course.description}</p>
          </div>

          <div className="mt-6">
            <h2 className="text-xl font-semibold mb-2">Course Details</h2>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-gray-600">Duration:</p>
                <p className="font-medium">{course.duration}</p>
              </div>
              <div>
                <p className="text-gray-600">Schedule:</p>
                <p className="font-medium">{course.schedule}</p>
              </div>
              <div>
                <p className="text-gray-600">Location:</p>
                <p className="font-medium">{course.location}</p>
              </div>
            </div>
          </div>

          <div className="mt-6">
            <h2 className="text-xl font-semibold mb-2">Prerequisites</h2>
            <ul className="list-disc pl-5">
              {course.prerequisites.map((prerequisite, index) => (
                <li key={index} className="text-gray-700">
                  {prerequisite}
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-6">
            <h2 className="text-xl font-semibold mb-2">Syllabus</h2>
            <div className="space-y-4">
              {course.syllabus.map((item, index) => (
                <div key={index} className="border-b pb-4">
                  <h3 className="font-medium">
                    Week {item.week}: {item.topic}
                  </h3>
                  <p className="text-gray-600">{item.content}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="mt-8 text-center">
        <button
          onClick={() => navigate("/courses")}
          className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
        >
          Back to Courses
        </button>
      </div>
    </div>
  );
}

export default CourseDetails;
