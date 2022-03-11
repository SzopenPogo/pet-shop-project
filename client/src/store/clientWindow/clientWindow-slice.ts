import { createSlice } from "@reduxjs/toolkit";

const clientWindowSlice = createSlice({
  name: 'clientWindow',
  initialState: {
    isWindowScrolled: false,
    isWindowMobile: false
  },
  reducers: {
    setWindowScroll(state, action: {payload: number}) {
      state.isWindowScrolled = action.payload >= 265;
    },
    setWindowMobile(state, action: { payload: number }) {
      state.isWindowMobile = action.payload <= 1000
    }
  }
});

export const clientWindowActions = clientWindowSlice.actions;
export default clientWindowSlice;