import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchCourses } from "../store/slices/courseSlice";
import {
  selectEnrolledCourses,
  toggleCourseCompletion,
  updateCourseProgress,
  unenrollFromCourse,
} from "../store/slices/enrollmentSlice";

function Dashboard() {
  const dispatch = useDispatch();
  const enrolledCourses = useSelector(selectEnrolledCourses);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [courseToUnenroll, setCourseToUnenroll] = useState(null);

  useEffect(() => {
    dispatch(fetchCourses());
  }, [dispatch]);

  const handleMarkComplete = (courseId) => {
    dispatch(toggleCourseCompletion(courseId));
  };

  const handleUpdateProgress = (courseId, newProgress) => {
    dispatch(updateCourseProgress({ courseId, progress: newProgress }));
  };

  const handleUnenroll = (courseId) => {
    setCourseToUnenroll(courseId);
    setShowConfirmModal(true);
  };

  const confirmUnenroll = () => {
    if (courseToUnenroll) {
      dispatch(unenrollFromCourse(courseToUnenroll));
    }
    setShowConfirmModal(false);
    setCourseToUnenroll(null);
  };

  const ConfirmationModal = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-sm mx-4">
        <h3 className="text-lg font-semibold mb-4">Confirm Unenrollment</h3>
        <p className="text-gray-600 mb-6">
          Are you sure you want to unenroll from this course? This action cannot
          be undone.
        </p>
        <div className="flex justify-end space-x-4">
          <button
            onClick={() => setShowConfirmModal(false)}
            className="px-4 py-2 text-gray-600 hover:text-gray-800"
          >
            Cancel
          </button>
          <button
            onClick={confirmUnenroll}
            className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
          >
            Unenroll
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="max-w-6xl mx-auto">
      {showConfirmModal && <ConfirmationModal />}
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800">My Dashboard</h1>
          <div className="text-gray-600">
            <span className="font-medium">{enrolledCourses.length}</span>{" "}
            Courses Enrolled
          </div>
        </div>

        {/* Course Progress Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <div className="bg-blue-50 rounded-lg p-4">
            <h3 className="text-lg font-semibold text-blue-800">In Progress</h3>
            <p className="text-3xl font-bold text-blue-600">
              {enrolledCourses.filter((c) => !c.completed).length}
            </p>
          </div>
          <div className="bg-green-50 rounded-lg p-4">
            <h3 className="text-lg font-semibold text-green-800">Completed</h3>
            <p className="text-3xl font-bold text-green-600">
              {enrolledCourses.filter((c) => c.completed).length}
            </p>
          </div>
          <div className="bg-purple-50 rounded-lg p-4">
            <h3 className="text-lg font-semibold text-purple-800">
              Total Hours
            </h3>
            <p className="text-3xl font-bold text-purple-600">
              {enrolledCourses.length * 16}
            </p>
          </div>
        </div>

        {/* Enrolled Courses */}
        <div className="space-y-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            Enrolled Courses
          </h2>

          {enrolledCourses.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-gray-500 text-lg">
                You haven't enrolled in any courses yet.
              </p>
              <a
                href="/courses"
                className="text-blue-600 hover:text-blue-700 font-medium mt-2 inline-block"
              >
                Browse Available Courses
              </a>
            </div>
          ) : (
            enrolledCourses.map((course) => (
              <div
                key={course.id}
                className="bg-white border rounded-lg p-6 hover:shadow-md transition-shadow"
              >
                <div className="flex flex-col md:flex-row gap-6">
                  <div className="w-full md:w-48 h-32">
                    <img
                      src={course.thumbnail}
                      alt={course.name}
                      className="w-full h-full object-cover rounded-md"
                    />
                  </div>

                  <div className="flex-1">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h3 className="text-lg font-semibold text-gray-800">
                          {course.name}
                        </h3>
                        <p className="text-gray-600">
                          Instructor: {course.instructor}
                        </p>
                      </div>
                      <div className="flex space-x-2">
                        <button
                          onClick={() => handleMarkComplete(course.courseId)}
                          className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                            course.completed
                              ? "bg-green-100 text-green-800 hover:bg-green-200"
                              : "bg-gray-100 text-gray-800 hover:bg-gray-200"
                          }`}
                        >
                          {course.completed ? "Completed" : "Mark as Complete"}
                        </button>
                        <button
                          onClick={() => handleUnenroll(course.courseId)}
                          className="px-4 py-2 rounded-md text-sm font-medium bg-red-100 text-red-800 hover:bg-red-200 transition-colors"
                        >
                          Unenroll
                        </button>
                      </div>
                    </div>

                    <div className="mt-4">
                      <div className="flex justify-between text-sm text-gray-600 mb-1">
                        <span>Progress</span>
                        <span>{course.progress}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                          style={{ width: `${course.progress}%` }}
                        />
                      </div>
                      <div className="mt-2 flex gap-2">
                        <button
                          onClick={() =>
                            handleUpdateProgress(
                              course.courseId,
                              Math.max(0, course.progress - 10)
                            )
                          }
                          className="px-2 py-1 text-sm bg-gray-100 rounded hover:bg-gray-200"
                        >
                          -10%
                        </button>
                        <button
                          onClick={() =>
                            handleUpdateProgress(
                              course.courseId,
                              Math.min(100, course.progress + 10)
                            )
                          }
                          className="px-2 py-1 text-sm bg-gray-100 rounded hover:bg-gray-200"
                        >
                          +10%
                        </button>
                      </div>
                    </div>

                    <div className="mt-4 flex items-center text-sm text-gray-600">
                      <svg
                        className="w-4 h-4 mr-2"
                        fill="none"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      Due Date: {new Date(course.dueDate).toLocaleDateString()}
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
