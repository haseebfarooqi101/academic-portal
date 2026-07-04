import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Async thunk to load users from JSON files
export const loadUsersFromFiles = createAsyncThunk(
  'auth/loadUsersFromFiles',
  async () => {
    try {
      // Load students
      const studentsResponse = await fetch('/api/students');
      const students = studentsResponse.ok ? await studentsResponse.json() : [];
      
      // Load teachers
      const teachersResponse = await fetch('/api/teachers');
      const teachers = teachersResponse.ok ? await teachersResponse.json() : [];
      
      // Add role property to each user
      const studentsWithRole = students.map(student => ({
        ...student,
        role: 'student',
        status: student.status || 'pending' // Default to pending if no status
      }));
      
      const teachersWithRole = teachers.map(teacher => ({
        ...teacher,
        role: 'teacher'
      }));
      
      return {
        students: studentsWithRole,
        teachers: teachersWithRole
      };
    } catch (error) {
      console.error('Error loading users from files:', error);
      return { students: [], teachers: [] };
    }
  }
);

// Cookie utility functions
const setCookie = (name, value, days = 7) => {
  if (typeof window !== 'undefined') {
    const expires = new Date();
    expires.setTime(expires.getTime() + (days * 24 * 60 * 60 * 1000));
    document.cookie = `${name}=${JSON.stringify(value)};expires=${expires.toUTCString()};path=/`;
  }
};

const getCookie = (name) => {
  if (typeof window !== 'undefined') {
    const nameEQ = name + "=";
    const ca = document.cookie.split(';');
    for (let i = 0; i < ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) === ' ') c = c.substring(1, c.length);
      if (c.indexOf(nameEQ) === 0) {
        try {
          return JSON.parse(c.substring(nameEQ.length, c.length));
        } catch (e) {
          return null;
        }
      }
    }
  }
  return null;
};

const deleteCookie = (name) => {
  if (typeof window !== 'undefined') {
    document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 UTC;path=/;`;
  }
};



const initialState = {
  users: [
    // Default admin users (always available)
    { 
      id: 1, 
      email: "admin@school.edu", 
      password: "admin123", 
      name: "System Admin", 
      role: "admin",
      department: "Administration"
    },
    { 
      id: 2, 
      email: "admin.john@school.edu", 
      password: "admin123", 
      name: "John Admin", 
      role: "admin",
      department: "Administration"
    },
    // Students and teachers will be loaded dynamically from JSON files
  ],
  currentUser: null, // Always start with null to match SSR
  loading: false,
  error: null,
  hydrated: false, // Track hydration state
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    hydrate(state) {
      // Load user from cookie after hydration
      if (!state.hydrated && typeof window !== 'undefined') {
        state.currentUser = getCookie('currentUser');
        state.hydrated = true;
      }
    },
    login(state, action) {
      const { password, ...userWithoutPassword } = action.payload;
      state.currentUser = userWithoutPassword;
      // Save to cookie (without password)
      setCookie('currentUser', userWithoutPassword);
    },
    logout(state) {
      state.currentUser = null;
      deleteCookie('currentUser');
    },
    addUser(state, action) {
      const newUser = {
        ...action.payload,
        id: Date.now() + Math.random(), // Ensure unique ID
      };
      state.users.push(newUser);
    },
    addStudent(state, action) {
      const newStudent = {
        ...action.payload,
        role: "student",
        status: "pending", // Set default status to pending
        id: Date.now() + Math.random(),
      };
      state.users.push(newStudent);
    },
    addTeacher(state, action) {
      const newTeacher = {
        ...action.payload,
        role: "teacher",
        id: Date.now() + Math.random(),
      };
      state.users.push(newTeacher);
    },
    addAdmin(state, action) {
      const newAdmin = {
        ...action.payload,
        role: "admin",
        id: Date.now() + Math.random(),
      };
      state.users.push(newAdmin);
    },
    updateUserPassword(state, action) {
      const { email, newPassword } = action.payload;
      const userIndex = state.users.findIndex(user => user.email === email);
      if (userIndex !== -1) {
        state.users[userIndex].password = newPassword;
      }
    },
    updateUser(state, action) {
      const { id, ...updates } = action.payload;
      const userIndex = state.users.findIndex(user => user.id === id);
      if (userIndex !== -1) {
        state.users[userIndex] = { ...state.users[userIndex], ...updates };
        // Update cookie if it's the current user
        if (state.currentUser && state.currentUser.id === id) {
          const { password, ...userWithoutPassword } = state.users[userIndex];
          state.currentUser = userWithoutPassword;
          setCookie('currentUser', userWithoutPassword);
        }
      }
    },
    // Helper selectors for backward compatibility
    setStudents(state, action) {
      // Remove existing students and add new ones
      state.users = state.users.filter(user => user.role !== 'student');
      const studentsWithRole = action.payload.map(student => ({
        ...student,
        role: 'student',
        status: student.status || 'pending' // Default to pending if no status
      }));
      state.users.push(...studentsWithRole);
    },
    // Student approval actions
    approveStudent(state, action) {
      const studentId = action.payload;
      const studentIndex = state.users.findIndex(user => user.id === studentId && user.role === 'student');
      if (studentIndex !== -1) {
        state.users[studentIndex].status = 'approved';
      }
    },
    rejectStudent(state, action) {
      const studentId = action.payload;
      const studentIndex = state.users.findIndex(user => user.id === studentId && user.role === 'student');
      if (studentIndex !== -1) {
        state.users[studentIndex].status = 'rejected';
      }
    },
    deleteUser(state, action) {
      const userId = action.payload;
      state.users = state.users.filter(user => user.id !== userId);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadUsersFromFiles.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loadUsersFromFiles.fulfilled, (state, action) => {
        state.loading = false;
        // Remove existing students and teachers (keep admins)
        state.users = state.users.filter(user => user.role === 'admin');
        // Add loaded students and teachers
        state.users.push(...action.payload.students, ...action.payload.teachers);
      })
      .addCase(loadUsersFromFiles.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { 
  hydrate,
  login, 
  logout, 
  addUser, 
  addStudent, 
  addTeacher, 
  addAdmin, 
  updateUserPassword, 
  updateUser,
  setStudents,
  approveStudent,
  rejectStudent,
  deleteUser
} = authSlice.actions;

// Selectors
export const selectAllUsers = (state) => state.auth.users;
export const selectUsersByRole = (role) => (state) => 
  state.auth.users.filter(user => user.role === role);
export const selectStudents = (state) => 
  state.auth.users.filter(user => user.role === 'student');
export const selectTeachers = (state) => 
  state.auth.users.filter(user => user.role === 'teacher');
export const selectAdmins = (state) => 
  state.auth.users.filter(user => user.role === 'admin');
export const selectCurrentUser = (state) => state.auth.currentUser;
export const selectAuthLoading = (state) => state.auth.loading;
export const selectAuthError = (state) => state.auth.error;
export const selectIsHydrated = (state) => state.auth.hydrated;

export default authSlice.reducer;
