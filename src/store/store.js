import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice.ls";

export const store = configureStore({
  reducer: {
    users: userReducer,
  },
});
