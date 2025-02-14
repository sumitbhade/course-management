import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { ref, onValue, set } from "firebase/database";
import { realtimeDb } from "../config/firebase";
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
  const [courseLikes, setCourseLikes] = useState({});
  const [likeInProgress, setLikeInProgress] = useState({});

  // Search states
  const [searchTerm, setSearchTerm] = useState("");
  const [searchCategory, setSearchCategory] = useState("all");

  useEffect(() => {
    dispatch(fetchCourses());

    // Set up real-time listener for likes
    const likesRef = ref(realtimeDb, "courseLikes");
    const unsubscribe = onValue(likesRef, (snapshot) => {
      const data = snapshot.val() || {};
      setCourseLikes(data);
    });

    return () => unsubscribe();
  }, [dispatch]);

  const handleEnroll = (e, course) => {
    e.stopPropagation();
    dispatch(
      enrollInCourse({
        courseId: course.id,
        name: course.name,
        instructor: course.instructor,
        thumbnail: course.thumbnail,
        progress: 0,
        dueDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
          .toISOString()
          .split("T")[0],
        completed: false,
      })
    );
  };

  const handleLike = async (e, courseId) => {
    e.stopPropagation();
    if (likeInProgress[courseId]) return;

    setLikeInProgress((prev) => ({ ...prev, [courseId]: true }));
    try {
      const currentLikes = courseLikes[courseId] || 0;
      const newLikes = currentLikes + 1;
      await set(ref(realtimeDb, `courseLikes/${courseId}`), newLikes);
    } catch (error) {
      console.error("Error updating likes:", error);
    } finally {
      setLikeInProgress((prev) => ({ ...prev, [courseId]: false }));
    }
  };

  // Filter courses based on search term and category
  const filteredCourses = courses.filter((course) => {
    const matchesSearch =
      course.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.instructor.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.description.toLowerCase().includes(searchTerm.toLowerCase());

    if (searchCategory === "all") return matchesSearch;
    return matchesSearch && course.enrollmentStatus === searchCategory;
  });

  if (status === "loading") {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <p className="text-red-500">Error: {error}</p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto">
      <div className="mt-12 mb-10">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">
          Available Courses
        </h1>

        {/* Search and Filter Section */}
        <div className="mb-8 space-y-4 md:space-y-0 md:flex md:items-center md:space-x-4">
          <div className="flex-1">
            <div className="relative">
              <input
                type="text"
                placeholder="Search courses by name, instructor, or description..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 pl-10"
              />
              <svg
                className="absolute left-3 top-2.5 h-5 w-5 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
          </div>

          <div className="w-full md:w-48">
            <select
              value={searchCategory}
              onChange={(e) => setSearchCategory(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="all">All Status</option>
              <option value="Open">Open</option>
              <option value="In Progress">In Progress</option>
              <option value="Closed">Closed</option>
            </select>
          </div>
        </div>

        {/* Results count */}
        <div className="mb-6 text-gray-600">
          Found {filteredCourses.length} course
          {filteredCourses.length !== 1 ? "s" : ""}
        </div>

        {/* Course Grid */}
        {filteredCourses.length === 0 ? (
          <div className="text-center py-12 bg-gray-50 rounded-lg">
            <p className="text-gray-500 text-lg">
              No courses found matching your search criteria.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredCourses.map((course) => (
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
                  <div className="flex justify-between items-start mb-4">
                    <h2 className="text-xl font-semibold text-gray-900">
                      {course.name}
                    </h2>
                    <button
                      onClick={(e) => handleLike(e, course.id)}
                      disabled={likeInProgress[course.id]}
                      className="flex items-center space-x-1 text-gray-500 hover:text-red-500 transition-colors"
                    >
                      <svg
                        className={`w-6 h-6 ${
                          likeInProgress[course.id] ? "animate-pulse" : ""
                        }`}
                        fill={
                          courseLikes[course.id] > 0 ? "currentColor" : "none"
                        }
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                        />
                      </svg>
                      <span className="font-medium">
                        {courseLikes[course.id] || 0}
                      </span>
                    </button>
                  </div>

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
        )}
      </div>
    </div>
  );
}

export default CourseList;
