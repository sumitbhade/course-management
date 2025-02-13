import { useParams } from "react-router-dom";

function CourseDetails() {
  const { id } = useParams();

  // Temporary static data
  const course = {
    id: id,
    name: "Introduction to React",
    instructor: "John Doe",
    description: "A comprehensive course on React fundamentals",
    enrollmentStatus: "Open",
    duration: "8 weeks",
    schedule: "Tuesdays and Thursdays, 6:00 PM - 8:00 PM",
    location: "Online",
    prerequisites: ["Basic JavaScript", "HTML & CSS"],
    syllabus: [
      {
        week: 1,
        topic: "React Basics",
        content: "Introduction to React, Virtual DOM, JSX",
      },
      {
        week: 2,
        topic: "Components",
        content: "Functional Components, Class Components, Props & State",
      },
    ],
  };

  return (
    <div className="max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">{course.name}</h1>

      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div>
            <h2 className="text-lg font-semibold mb-2">Instructor</h2>
            <p>{course.instructor}</p>
          </div>
          <div>
            <h2 className="text-lg font-semibold mb-2">Duration</h2>
            <p>{course.duration}</p>
          </div>
          <div>
            <h2 className="text-lg font-semibold mb-2">Schedule</h2>
            <p>{course.schedule}</p>
          </div>
          <div>
            <h2 className="text-lg font-semibold mb-2">Location</h2>
            <p>{course.location}</p>
          </div>
        </div>

        <div className="mb-6">
          <h2 className="text-lg font-semibold mb-2">Description</h2>
          <p className="text-gray-600">{course.description}</p>
        </div>

        <div className="mb-6">
          <h2 className="text-lg font-semibold mb-2">Prerequisites</h2>
          <ul className="list-disc list-inside">
            {course.prerequisites.map((prereq, index) => (
              <li key={index}>{prereq}</li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="text-lg font-semibold mb-2">Syllabus</h2>
          <div className="space-y-4">
            {course.syllabus.map((week) => (
              <div key={week.week} className="border-b pb-4">
                <h3 className="font-medium">
                  Week {week.week}: {week.topic}
                </h3>
                <p className="text-gray-600">{week.content}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <button className="bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600">
        Enroll Now
      </button>
    </div>
  );
}

export default CourseDetails;
