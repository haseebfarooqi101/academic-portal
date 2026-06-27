import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  leaveRequests: [],
};

const leavesSlice = createSlice({
  name: 'leaves',
  initialState,
  reducers: {
    submitLeaveRequest(state, action) {
      const newRequest = {
        id: Date.now(),
        studentId: action.payload.studentId,
        studentName: action.payload.studentName,
        registrationNumber: action.payload.registrationNumber,
        department: action.payload.department,
        type: action.payload.type,
        date: action.payload.date,
        reason: action.payload.reason,
        status: 'pending',
        submittedAt: new Date().toISOString(),
        reviewedAt: null,
        reviewedBy: null,
      };
      state.leaveRequests.push(newRequest);
    },
    approveLeaveRequest(state, action) {
      const { leaveId, teacherName } = action.payload;
      const index = state.leaveRequests.findIndex(r => r.id === leaveId);
      if (index !== -1) {
        state.leaveRequests[index].status = 'approved';
        state.leaveRequests[index].reviewedAt = new Date().toISOString();
        state.leaveRequests[index].reviewedBy = teacherName;
      }
    },
    rejectLeaveRequest(state, action) {
      const { leaveId, teacherName } = action.payload;
      const index = state.leaveRequests.findIndex(r => r.id === leaveId);
      if (index !== -1) {
        state.leaveRequests[index].status = 'rejected';
        state.leaveRequests[index].reviewedAt = new Date().toISOString();
        state.leaveRequests[index].reviewedBy = teacherName;
      }
    },
    // Used for cross-tab sync via localStorage storage event
    setLeavesFromStorage(state, action) {
      state.leaveRequests = action.payload;
    },
  },
});

export const { submitLeaveRequest, approveLeaveRequest, rejectLeaveRequest, setLeavesFromStorage } = leavesSlice.actions;

// Selectors
export const selectAllLeaveRequests = (state) => state.leaves.leaveRequests;
export const selectLeavesByStudent = (studentId) => (state) =>
  state.leaves.leaveRequests.filter(r => r.studentId === studentId);
export const selectPendingLeaves = (state) =>
  state.leaves.leaveRequests.filter(r => r.status === 'pending');

export default leavesSlice.reducer;
