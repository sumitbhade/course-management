import { db } from "../config/firebase.js";
import Course from "../models/Course.js";

export const getAllCourses = async () => {
  try {
    const coursesSnapshot = await db.collection("courses").get();
    return coursesSnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
  } catch (error) {
    console.error("Error getting courses:", error);
    throw error;
  }
};

export const getCourseById = async (courseId) => {
  try {
    const courseDoc = await db.collection("courses").doc(courseId).get();
    if (!courseDoc.exists) {
      throw new Error("Course not found");
    }
    return {
      id: courseDoc.id,
      ...courseDoc.data(),
    };
  } catch (error) {
    console.error("Error getting course:", error);
    throw error;
  }
};

export const createCourse = async (courseData) => {
  try {
    const course = new Course(courseData);
    const docRef = await db.collection("courses").add(course.toFirestore());
    return {
      id: docRef.id,
      ...course.toFirestore(),
    };
  } catch (error) {
    console.error("Error creating course:", error);
    throw error;
  }
};

export const searchCourses = async (searchTerm) => {
  try {
    const coursesRef = db.collection("courses");
    const snapshot = await coursesRef
      .where("searchTerms", "array-contains", searchTerm.toLowerCase())
      .get();

    return snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
  } catch (error) {
    console.error("Error searching courses:", error);
    throw error;
  }
};
