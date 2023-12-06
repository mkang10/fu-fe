import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isCollapsed: false,
  isLoadingAdmin: true,
  
};

export const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    toogleIsCollapsed: (state) => {
      state.isCollapsed = !state.isCollapsed;
    },
    changeIsLoadingAdmin: (state) => {
      state.isLoadingAdmin = !state.isLoadingAdmin;
    },
  },
});

// Action creators are generated for each case reducer function
export const { toogleIsCollapsed, changeIsLoadingAdmin } = appSlice.actions;

export default appSlice.reducer;
