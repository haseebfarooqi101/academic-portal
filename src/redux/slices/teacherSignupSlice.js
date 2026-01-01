import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  formData: {
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    department: "",
    employeeId: "",
    qualification: "",
    experience: ""
  },
  success: false,
};

const teacherSignupSlice = createSlice({
  name: "teacherSignup",
  initialState,
  reducers: {
    updateFormField: (state, action) => {
      const { field, value } = action.payload;
      state.formData[field] = value;
    },
    setSuccess: (state, action) => {
      state.success = action.payload;
    },
    resetForm: (state) => {
      state.formData = {
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
        department: "",
        employeeId: "",
        qualification: "",
        experience: ""
      };
      state.success = false;
    },
  },
});

export const { updateFormField, setSuccess, resetForm } = teacherSignupSlice.actions;
export default teacherSignupSlice.reducer;