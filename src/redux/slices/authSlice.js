import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  users: {
    teachers: [
      { id: 1, email: "admin@school.com", password: "admin123" },
      { id: 2, email: "teacher@school.com", password: "teach123" },
    ],
    students: [],
  },
  currentUser: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login(state, action) {
      state.currentUser = action.payload;
    },
    logout(state) {
      state.currentUser = null;
    },
    setStudents(state, action) {
      state.users.students = action.payload;
    },
    addStudent(state, action) {
      state.users.students.push(action.payload);
    },
    updateStudentPassword(state, action) {
      const studentIndex = state.users.students.findIndex(
        (s) => s.email === action.payload.email
      );
      if (studentIndex !== -1) {
        state.users.students[studentIndex].password = action.payload.newPassword;
      }
    },
    updateTeacherPassword(state, action) {
      const teacherIndex = state.users.teachers.findIndex(
        (t) => t.email === action.payload.email
      );
      if (teacherIndex !== -1) {
        state.users.teachers[teacherIndex].password = action.payload.newPassword;
      }
    },
  },
});

export const { login, logout, setStudents, addStudent, updateStudentPassword, updateTeacherPassword } = authSlice.actions;
export default authSlice.reducer;
