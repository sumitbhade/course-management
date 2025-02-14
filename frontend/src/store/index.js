import { configureStore } from "@reduxjs/toolkit";
import courseReducer from "./slices/courseSlice";
import enrollmentReducer from "./slices/enrollmentSlice";

// Load state from localStorage
const loadState = () => {
  try {
    const serializedState = localStorage.getItem("courseAppState");
    if (serializedState === null) {
      return undefined;
    }
    return JSON.parse(serializedState);
  } catch (err) {
    return undefined;
  }
};

// Save state to localStorage
const saveState = (state) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem("courseAppState", serializedState);
  } catch {
    // Ignore write errors
  }
};

const preloadedState = loadState();

export const store = configureStore({
  reducer: {
    courses: courseReducer,
    enrollment: enrollmentReducer,
  },
  preloadedState,
});

store.subscribe(() => {
  saveState({
    enrollment: store.getState().enrollment,
  });
});
