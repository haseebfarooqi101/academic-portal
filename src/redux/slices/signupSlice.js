import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  formData: {
    name: "",
    email: "",
    registrationNumber: "",
    password: "",
    confirmPassword: "",
    department: "",
  },
  error: null,
  success: false,
};

const signupSlice = createSlice({
  name: "signup",
  initialState,
  reducers: {
    updateFormField(state, action) {
      const { field, value } = action.payload;
      state.formData[field] = value;
      state.error = null;
    },
    resetForm(state) {
      state.formData = initialState.formData;
      state.error = null;
      state.success = false;
    },
    setError(state, action) {
      state.error = action.payload;
      state.success = false;
    },
    setSuccess(state) {
      state.success = true;
      state.error = null;
    },
  },
});

export const { updateFormField, resetForm, setError, setSuccess } = signupSlice.actions;
export default signupSlice.reducer;
