import axios from "axios";
import { BACKEND_ADMIN_ROUTER_UNBAN_USER } from "../../../constants/backend";
import { ADMIN_USER_FAIL, ADMIN_USER_REQUEST, ADMIN_USER_SUCCESS } from "../../../constants/user";
import { adminActions } from "../admin-slice";

export const adminUnbanUser = (
  token: string, 
  userId: string,
  endingFunction?: () => void
  ) => async (dispatch: any) => {
  dispatch(adminActions.unban({ type: ADMIN_USER_REQUEST}));

  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }

  const unbanUser = async () => {
    return await axios.post(`${BACKEND_ADMIN_ROUTER_UNBAN_USER}/${userId}`, {  }, config);
  }

  try {
    await unbanUser();

    dispatch(adminActions.unban({ type: ADMIN_USER_SUCCESS}));
    
    if(endingFunction) {
      endingFunction();
    }
  } catch (error: any) {
    dispatch(adminActions.unban({
      type: ADMIN_USER_FAIL,
      payload: error.response.data.message
    }))
  }
}