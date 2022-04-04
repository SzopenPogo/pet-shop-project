import { createSlice } from "@reduxjs/toolkit";

const uiSlice = createSlice({
  name: 'ui',
  initialState: {
    isHamburgerActive: false,
    isDeleteModalActive: false
  },
  reducers: {
    toggleHamburgerMenu(state) {
      state.isHamburgerActive = !state.isHamburgerActive;
    },
    toggleDeleteModal(state) {
      state.isDeleteModalActive = !state.isDeleteModalActive;
    }
  }
});

export const uiActions = uiSlice.actions;
export default uiSlice;