import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { collection, getDocs, doc, getDoc } from "firebase/firestore";
import { db } from "../../config/firebase";

// Async Thunks
export const fetchCourses = createAsyncThunk(
  "courses/fetchCourses",
  async () => {
    const coursesCollection = collection(db, "courses");
    const snapshot = await getDocs(coursesCollection);
    return snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
  }
);

export const fetchCourseById = createAsyncThunk(
  "courses/fetchCourseById",
  async (courseId) => {
    const docRef = doc(db, "courses", courseId);
    const docSnap = await getDoc(docRef);
    if (!docSnap.exists()) {
      throw new Error("Course not found");
    }
    return {
      id: docSnap.id,
      ...docSnap.data(),
    };
  }
);

const courseSlice = createSlice({
  name: "courses",
  initialState: {
    list: [],
    currentCourse: null,
    status: "idle", // 'idle' | 'loading' | 'succeeded' | 'failed'
    error: null,
  },
  reducers: {
    clearCurrentCourse: (state) => {
      state.currentCourse = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Handle fetchCourses
      .addCase(fetchCourses.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchCourses.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.list = action.payload;
        state.error = null;
      })
      .addCase(fetchCourses.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      // Handle fetchCourseById
      .addCase(fetchCourseById.pending, (state) => {
        state.status = "loading";
        state.currentCourse = null;
      })
      .addCase(fetchCourseById.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.currentCourse = action.payload;
        state.error = null;
      })
      .addCase(fetchCourseById.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
        state.currentCourse = null;
      });
  },
});

// Selectors
export const selectAllCourses = (state) => state.courses.list;
export const selectCurrentCourse = (state) => state.courses.currentCourse;
export const selectCourseStatus = (state) => state.courses.status;
export const selectCourseError = (state) => state.courses.error;

export const { clearCurrentCourse } = courseSlice.actions;

export default courseSlice.reducer;
