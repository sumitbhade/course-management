import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  fetchCourses,
  selectAllCourses,
  selectCourseStatus,
  selectCourseError,
} from "../store/slices/courseSlice";
import {
  enrollInCourse,
  selectEnrolledCourseIds,
} from "../store/slices/enrollmentSlice";

function CourseList() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const courses = useSelector(selectAllCourses);
  const status = useSelector(selectCourseStatus);
  const error = useSelector(selectCourseError);
  const enrolledCourseIds = useSelector(selectEnrolledCourseIds);

  useEffect(() => {
    dispatch(fetchCourses());
  }, [dispatch]);

  const handleEnroll = (e, course) => {
    e.stopPropagation(); // Prevent navigation when clicking enroll
    dispatch(
      enrollInCourse({
        courseId: course.id,
        name: course.name,
        instructor: course.instructor,
        thumbnail: course.thumbnail,
        progress: 0,
        dueDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
          .toISOString()
          .split("T")[0], // 30 days from now
        completed: false,
      })
    );
  };

  if (status === "loading") {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto">
      <div className="mt-12 mb-10">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">
          Available Courses
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {courses.map((course) => (
            <div
              key={course.id}
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 cursor-pointer relative"
              onClick={() => navigate(`/course/${course.id}`)}
            >
              <img
                src={course.thumbnail}
                alt={course.name}
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-2">
                  {course.name}
                </h2>
                <p className="text-gray-600 mb-4">
                  Instructor: {course.instructor}
                </p>
                <p className="text-gray-700 mb-4 line-clamp-2">
                  {course.description}
                </p>
                <div className="flex justify-between items-center">
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-medium ${
                      course.enrollmentStatus === "Open"
                        ? "bg-green-100 text-green-800"
                        : course.enrollmentStatus === "In Progress"
                        ? "bg-yellow-100 text-yellow-800"
                        : "bg-red-100 text-red-800"
                    }`}
                  >
                    {course.enrollmentStatus}
                  </span>
                  <button
                    onClick={(e) => handleEnroll(e, course)}
                    disabled={enrolledCourseIds.includes(course.id)}
                    className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                      enrolledCourseIds.includes(course.id)
                        ? "bg-gray-100 text-gray-500 cursor-not-allowed"
                        : "bg-blue-600 text-white hover:bg-blue-700"
                    }`}
                  >
                    {enrolledCourseIds.includes(course.id)
                      ? "Enrolled"
                      : "Enroll Now"}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default CourseList;
