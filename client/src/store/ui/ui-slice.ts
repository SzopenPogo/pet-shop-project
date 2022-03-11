import { createSlice } from "@reduxjs/toolkit";

const uiSlice = createSlice({
  name: 'ui',
  initialState: {
    isHamburgerActive: false
  },
  reducers: {
    toggleHamburgerMenu(state) {
      state.isHamburgerActive = !state.isHamburgerActive;
    }
  }
});

export const uiActions = uiSlice.actions;
export default uiSlice;