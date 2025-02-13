import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectAllCourses, fetchCourses } from "../store/slices/courseSlice";

function Dashboard() {
  const dispatch = useDispatch();
  const courses = useSelector(selectAllCourses);

  useEffect(() => {
    dispatch(fetchCourses());
  }, [dispatch]);

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">My Dashboard</h1>

      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold mb-4">Enrolled Courses</h2>

        {courses.length === 0 ? (
          <p className="text-gray-500">No courses enrolled yet.</p>
        ) : (
          <div className="space-y-4">
            {courses.map((course) => (
              <div
                key={course.id}
                className="border-b pb-4 last:border-b-0 last:pb-0"
              >
                <h3 className="font-medium text-lg">{course.name}</h3>
                <p className="text-gray-600">Instructor: {course.instructor}</p>
                <div className="mt-2">
                  <span
                    className={`px-2 py-1 rounded text-sm ${
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
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Dashboard;
