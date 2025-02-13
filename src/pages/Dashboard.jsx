function Dashboard() {
  // Temporary static data
  const enrolledCourses = [
    {
      id: 1,
      name: "Introduction to React",
      instructor: "John Doe",
      progress: 60,
      dueDate: "2024-04-01",
      thumbnail: "https://via.placeholder.com/150",
    },
    {
      id: 2,
      name: "Advanced JavaScript",
      instructor: "Jane Smith",
      progress: 30,
      dueDate: "2024-05-15",
      thumbnail: "https://via.placeholder.com/150",
    },
  ];

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">My Dashboard</h1>

      <div className="grid grid-cols-1 gap-6">
        {enrolledCourses.map((course) => (
          <div key={course.id} className="bg-white rounded-lg shadow-md p-4">
            <div className="flex gap-4">
              <img
                src={course.thumbnail}
                alt={course.name}
                className="w-32 h-32 object-cover rounded-md"
              />
              <div className="flex-1">
                <h2 className="text-xl font-semibold mb-2">{course.name}</h2>
                <p className="text-gray-600 mb-2">
                  Instructor: {course.instructor}
                </p>
                <p className="text-gray-500 mb-2">
                  Due: {new Date(course.dueDate).toLocaleDateString()}
                </p>
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div
                    className="bg-blue-500 h-2.5 rounded-full"
                    style={{ width: `${course.progress}%` }}
                  ></div>
                </div>
                <p className="text-sm text-gray-600 mt-1">
                  {course.progress}% Complete
                </p>
              </div>
              <button className="self-start bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600">
                Mark Complete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Dashboard;
