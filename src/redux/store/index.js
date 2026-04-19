import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../slices/authSlice";
import signupReducer from "../slices/signupSlice";
import teacherSignupReducer from "../slices/teacherSignupSlice";
import uiReducer from "../slices/uiSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    signup: signupReducer,
    teacherSignup: teacherSignupReducer,
    ui: uiReducer,
  },
});
