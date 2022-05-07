import { Dispatch } from "@reduxjs/toolkit";
import axios from "axios";
import { BACKEND_ADMIN_ROUTER_GET_ALL_USERS } from "../../../constants/backend";
import { ADMIN_USER_FAIL, ADMIN_USER_REQUEST, ADMIN_USER_SUCCESS } from "../../../constants/user"
import { adminActions } from "../admin-slice"

export const adminGetAllUsers = (token: string) => async (dispatch: Dispatch) => {
  dispatch(adminActions.getAll({ type: ADMIN_USER_REQUEST }));

  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }

  const getAllUsers = async () => {
    return await axios.get(`${BACKEND_ADMIN_ROUTER_GET_ALL_USERS}`, config);
  }

  try {
    const { data } = await getAllUsers();
    
    dispatch(adminActions.getAll({
      type: ADMIN_USER_SUCCESS,
      payload: data
    }))
  } catch (error: any) {
    dispatch(adminActions.getAll({
      type: ADMIN_USER_FAIL,
      payload: error.response.data.message
    }))
  }
}