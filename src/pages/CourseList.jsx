function CourseList() {
  // Temporary static data
  const courses = [
    {
      id: 1,
      name: "Introduction to React",
      instructor: "John Doe",
      description: "Learn the basics of React development",
      enrollmentStatus: "Open",
      thumbnail: "https://via.placeholder.com/150",
    },
    {
      id: 2,
      name: "Advanced JavaScript",
      instructor: "Jane Smith",
      description: "Master JavaScript concepts",
      enrollmentStatus: "In Progress",
      thumbnail: "https://via.placeholder.com/150",
    },
  ];

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Available Courses</h1>

      {/* Search Bar */}
      <div className="mb-6">
        <input
          type="text"
          placeholder="Search courses..."
          className="w-full p-2 border rounded-md"
        />
      </div>

      {/* Course Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {courses.map((course) => (
          <div
            key={course.id}
            className="bg-white rounded-lg shadow-md overflow-hidden"
          >
            <img
              src={course.thumbnail}
              alt={course.name}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h2 className="text-xl font-semibold mb-2">{course.name}</h2>
              <p className="text-gray-600 mb-2">
                Instructor: {course.instructor}
              </p>
              <p className="text-gray-500 text-sm mb-4">{course.description}</p>
              <div className="flex justify-between items-center">
                <span
                  className={`px-2 py-1 rounded-full text-sm ${
                    course.enrollmentStatus === "Open"
                      ? "bg-green-100 text-green-800"
                      : "bg-yellow-100 text-yellow-800"
                  }`}
                >
                  {course.enrollmentStatus}
                </span>
                <button className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">
                  View Details
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CourseList;
