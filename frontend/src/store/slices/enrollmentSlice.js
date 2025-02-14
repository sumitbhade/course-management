import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  enrolledCourses: [],
};

const enrollmentSlice = createSlice({
  name: "enrollment",
  initialState,
  reducers: {
    enrollInCourse: (state, action) => {
      // Check if already enrolled
      if (
        !state.enrolledCourses.find(
          (course) => course.courseId === action.payload.courseId
        )
      ) {
        state.enrolledCourses.push({
          id: Date.now(), // Generate a unique ID
          ...action.payload,
        });
      }
    },
    updateCourseProgress: (state, action) => {
      const { courseId, progress } = action.payload;
      const course = state.enrolledCourses.find((c) => c.courseId === courseId);
      if (course) {
        course.progress = progress;
      }
    },
    toggleCourseCompletion: (state, action) => {
      const courseId = action.payload;
      const course = state.enrolledCourses.find((c) => c.courseId === courseId);
      if (course) {
        course.completed = !course.completed;
      }
    },
    unenrollFromCourse: (state, action) => {
      state.enrolledCourses = state.enrolledCourses.filter(
        (course) => course.courseId !== action.payload
      );
    },
  },
});

// Selectors
export const selectEnrolledCourses = (state) =>
  state.enrollment.enrolledCourses;
export const selectEnrolledCourseIds = (state) =>
  state.enrollment.enrolledCourses.map((course) => course.courseId);

export const {
  enrollInCourse,
  updateCourseProgress,
  toggleCourseCompletion,
  unenrollFromCourse,
} = enrollmentSlice.actions;

export default enrollmentSlice.reducer;
