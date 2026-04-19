import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  sidebar: {
    isOpen: false,
    isCollapsed: false,
    isMobile: false,
  },
  activeItem: 'dashboard',
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    toggleSidebar: (state) => {
      state.sidebar.isOpen = !state.sidebar.isOpen;
    },
    openSidebar: (state) => {
      state.sidebar.isOpen = true;
    },
    closeSidebar: (state) => {
      state.sidebar.isOpen = false;
    },
    toggleCollapse: (state) => {
      state.sidebar.isCollapsed = !state.sidebar.isCollapsed;
    },
    setCollapsed: (state, action) => {
      state.sidebar.isCollapsed = action.payload;
    },
    setMobile: (state, action) => {
      state.sidebar.isMobile = action.payload;
    },
    setActiveItem: (state, action) => {
      state.activeItem = action.payload;
    },
  },
});

export const {
  toggleSidebar,
  openSidebar,
  closeSidebar,
  toggleCollapse,
  setCollapsed,
  setMobile,
  setActiveItem,
} = uiSlice.actions;

export const selectSidebar = (state) => state.ui.sidebar;
export const selectActiveItem = (state) => state.ui.activeItem;

export default uiSlice.reducer;