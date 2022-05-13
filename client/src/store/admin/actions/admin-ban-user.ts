import axios from "axios";
import { BACKEND_ADMIN_ROUTER_BAN_USER } from "../../../constants/backend";
import { ADMIN_USER_FAIL, ADMIN_USER_REQUEST, ADMIN_USER_SUCCESS } from "../../../constants/user";
import { adminActions } from "../admin-slice";

export const adminBanUser = (
  token: string, 
  userId: string,
  adminNote: string,
  endingFunction?: () => void
  ) => async (dispatch: any) => {
  dispatch(adminActions.ban({ type: ADMIN_USER_REQUEST}));

  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }

  const banUser = async () => {
    return await axios.post(`${BACKEND_ADMIN_ROUTER_BAN_USER}/${userId}`, { adminNote }, config);
  }

  try {
    await banUser();

    dispatch(adminActions.ban({ type: ADMIN_USER_SUCCESS}));
    
    if(endingFunction) {
      endingFunction();
    }
    
  } catch (error: any) {
    dispatch(adminActions.ban({
      type: ADMIN_USER_FAIL,
      payload: error.response.data.message
    }))
  }
}