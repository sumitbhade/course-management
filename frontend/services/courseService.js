const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

export const getCourses = async () => {
  try {
    const response = await fetch(`${API_URL}/courses`);
    if (!response.ok) {
      throw new Error("Failed to fetch courses");
    }
    return response.json();
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
};

export const getCourseById = async (id) => {
  try {
    const response = await fetch(`${API_URL}/courses/${id}`);
    if (!response.ok) {
      throw new Error("Course not found");
    }
    return response.json();
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
};
