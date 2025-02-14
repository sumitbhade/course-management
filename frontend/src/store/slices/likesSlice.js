import { createSlice } from "@reduxjs/toolkit";

const likesSlice = createSlice({
  name: "likes",
  initialState: {
    courseLikes: {},
  },
  reducers: {
    updateCourseLikes: (state, action) => {
      const { courseId, likes } = action.payload;
      state.courseLikes[courseId] = likes;
    },
  },
});

export const { updateCourseLikes } = likesSlice.actions;
export const selectCourseLikes = (state) => state.likes.courseLikes;

export default likesSlice.reducer;
