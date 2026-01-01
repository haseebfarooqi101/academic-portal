import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../slices/authSlice";
import signupReducer from "../slices/signupSlice";
import teacherSignupReducer from "../slices/teacherSignupSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    signup: signupReducer,
    teacherSignup: teacherSignupReducer,
  },
});
