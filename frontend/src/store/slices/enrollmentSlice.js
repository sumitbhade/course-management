import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  enrolledCourses: [],
};

const enrollmentSlice = createSlice({
  name: "enrollment",
  initialState,
  reducers: {
    enrollInCourse: (state, action) => {
      if (
        !state.enrolledCourses.find(
          (course) => course.courseId === action.payload.courseId
        )
      ) {
        state.enrolledCourses.push({
          id: Date.now(),
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
        // Set progress to 100% when marking as complete, restore to previous progress when uncompleting
        if (course.completed) {
          course.previousProgress = course.progress; // Store current progress
          course.progress = 100;
        } else {
          course.progress = course.previousProgress || course.progress; // Restore previous progress or keep at 100
        }
      }
    },
    unenrollFromCourse: (state, action) => {
      state.enrolledCourses = state.enrolledCourses.filter(
        (course) => course.courseId !== action.payload
      );
    },
  },
});

export const {
  enrollInCourse,
  updateCourseProgress,
  toggleCourseCompletion,
  unenrollFromCourse,
} = enrollmentSlice.actions;

export const selectEnrolledCourses = (state) =>
  state.enrollment.enrolledCourses;
export const selectEnrolledCourseIds = (state) =>
  state.enrollment.enrolledCourses.map((course) => course.courseId);

export default enrollmentSlice.reducer;
