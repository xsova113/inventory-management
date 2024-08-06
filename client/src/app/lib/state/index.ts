import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface initialState {
  isSidebarCollapsed: boolean;
  isDarkMode: boolean;
}

const initialState: initialState = {
  isSidebarCollapsed: false,
  isDarkMode: false,
};

export const globalSlice = createSlice({
  name: "global",
  initialState,
  reducers: {
    setIsSidebarCollapsed: (state, action: PayloadAction<boolean>) => {
      state.isSidebarCollapsed = action.payload;
    },
    setIsDartMode: (state) => {
      state.isDarkMode = !state.isDarkMode;
    },
  },
});

export const { setIsSidebarCollapsed, setIsDartMode } = globalSlice.actions;

export default globalSlice.reducer;
