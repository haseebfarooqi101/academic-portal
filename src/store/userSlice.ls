import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "users",
  initialState: {
    list: [],
  },
  reducers: {
    addUser: (state, action) => {
      state.list.push(action.payload);
    },
    deleteUser: (state, action) => {
      state.list = state.list.filter(u => u.id !== action.payload);
    },
  },
});

export const { addUser, deleteUser } = userSlice.actions;
export default userSlice.reducer;
