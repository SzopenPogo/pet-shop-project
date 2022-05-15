import { createSlice } from "@reduxjs/toolkit";
import { ADMIN_USER_FAIL, ADMIN_USER_REQUEST, ADMIN_USER_SUCCESS } from "../../constants/user";
import { IUserData } from "../../interfaces/IUserData";

const adminSlice = createSlice({
  name: 'admin',
  initialState: {
    loading: false,
    error: '',
    users: [] as Array<IUserData>
  },
  reducers: {
    getAll(state, action) {
      const { type, payload } = action.payload;
      
      switch (type) {
        case ADMIN_USER_REQUEST:
          state.loading = true;
          state.error = '';
          break;
        case ADMIN_USER_SUCCESS:
          state.loading = false;
          state.error = '';
          state.users = payload;
          break;
        case ADMIN_USER_FAIL:
          state.loading = false;
          state.error = payload;
          break;
      }
    },
    ban(state, action) {
      const { type, payload } = action.payload;
      
      switch (type) {
        case ADMIN_USER_REQUEST:
          state.loading = true;
          state.error = '';
          break;
        case ADMIN_USER_SUCCESS:
          state.loading = false;
          state.error = '';
          break;
        case ADMIN_USER_FAIL:
          state.loading = false;
          state.error = payload;
          break;
      }
    },
    unban(state, action) {
      const { type, payload } = action.payload;
      
      switch (type) {
        case ADMIN_USER_REQUEST:
          state.loading = true;
          state.error = '';
          break;
        case ADMIN_USER_SUCCESS:
          state.loading = false;
          state.error = '';
          break;
        case ADMIN_USER_FAIL:
          state.loading = false;
          state.error = payload;
          break;
      }
    },
    edit(state, action) {
      const { type, payload } = action.payload;
      
      switch (type) {
        case ADMIN_USER_REQUEST:
          state.loading = true;
          state.error = '';
          break;
        case ADMIN_USER_SUCCESS:
          state.loading = false;
          state.error = '';
          break;
        case ADMIN_USER_FAIL:
          state.loading = false;
          state.error = payload;
          break;
      }
    },
  }
});

export const adminActions = adminSlice.actions;
export default adminSlice;