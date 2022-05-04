import { createSlice } from "@reduxjs/toolkit";
import Cookies from 'js-cookie';
import { USER_FAIL, USER_REQUEST, USER_SUCCESS, USER_TOKEN_COOKIE_NAME } from "../../constants/user";

const userTokenStoredCookie = Cookies.get(USER_TOKEN_COOKIE_NAME)
const tokenCookie = userTokenStoredCookie && userTokenStoredCookie !== 'undefined'
  ? userTokenStoredCookie
  : '';

const initialUserData = {
  _id: '',
  email: '',
  isActive: '',
  isAdmin: '',
  avatarUrl: '',
  adminNote: ''
}

const userSilce = createSlice({
  name: 'user',
  initialState: {
    loading: false,
    error: '',
    data: initialUserData,
    token: tokenCookie
  },
  reducers: {
    login(state, action) {
      const { type, token, payload } = action.payload;
      
      switch (type) {
        case USER_REQUEST:
          state.loading = true;
          state.error = '';
          break;
        case USER_SUCCESS:
          state.loading = false;
          state.error = '';
          state.data = payload;
          state.token = token;

          Cookies.set(USER_TOKEN_COOKIE_NAME, token, { expires: 7 });
          break;
        case USER_FAIL:
          state.loading = false;
          state.error = payload;
          break;
      }
    },
    get(state, action) {
      const { type, payload } = action.payload;
      
      switch (type) {
        case USER_REQUEST:
          state.loading = true;
          state.error = '';
          break;
        case USER_SUCCESS:
          state.loading = false;
          state.error = '';
          state.data = payload;
          break;
        case USER_FAIL:
          state.loading = false;
          state.error = payload;
          state.token = '';
          state.data = initialUserData;
          Cookies.remove(USER_TOKEN_COOKIE_NAME);
          break;
      }
    },
    logout(state, action) {
      const { type, payload } = action.payload;
      
      switch (type) {
        case USER_REQUEST:
          state.loading = true;
          state.error = '';
          break;
        case USER_SUCCESS:
          state.loading = false;
          state.error = '';
          state.token = '';
          state.data = initialUserData;

          Cookies.remove(USER_TOKEN_COOKIE_NAME);
          break;
        case USER_FAIL:
          state.loading = false;
          state.error = payload;
          break;
      }
    },
    register(state, action) {
      const { type, token, payload } = action.payload;
      
      switch (type) {
        case USER_REQUEST:
          state.loading = true;
          state.error = '';
          break;
        case USER_SUCCESS:
          state.loading = false;
          state.error = '';
          state.data = payload;
          state.token = token;

          Cookies.set(USER_TOKEN_COOKIE_NAME, token, { expires: 7 });
          break;
        case USER_FAIL:
          state.loading = false;
          state.error = payload;
          break;
      }
    },
    avatar(state, action) {
      const { type, payload } = action.payload;
      
      switch (type) {
        case USER_REQUEST:
          state.loading = true;
          state.error = '';
          break;
        case USER_SUCCESS:
          state.loading = false;
          state.error = '';
          state.data.avatarUrl = payload;
          break;
        case USER_FAIL:
          state.loading = false;
          state.error = payload;
          break;
      }
    },
    editData(state, action) {
      const { type, payload } = action.payload;
      
      switch (type) {
        case USER_REQUEST:
          state.loading = true;
          state.error = '';
          break;
        case USER_SUCCESS:
          state.loading = false;
          state.error = '';
          state.data = payload;
          break;
        case USER_FAIL:
          state.loading = false;
          state.error = payload;
          break;
      }
    }
  }
});

export const userActions = userSilce.actions;
export default userSilce;