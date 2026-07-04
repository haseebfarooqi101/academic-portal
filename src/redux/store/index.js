import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { persistStore, persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from "redux-persist";
import storage from "redux-persist/lib/storage";
import authReducer from "../slices/authSlice";
import signupReducer from "../slices/signupSlice";
import teacherSignupReducer from "../slices/teacherSignupSlice";
import uiReducer from "../slices/uiSlice";
import leavesReducer from "../slices/leavesSlice";

// Only persist the leaves slice so leave requests survive logout/login
const leavesPersistConfig = {
  key: "leaves",
  storage,
};

const rootReducer = combineReducers({
  auth: authReducer,
  signup: signupReducer,
  teacherSignup: teacherSignupReducer,
  ui: uiReducer,
  leaves: persistReducer(leavesPersistConfig, leavesReducer),
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);
