import axios from "axios";
import { BACKEND_USER_ROUTER_LOGOUT_ALL } from "../../../constants/backend";
import { USER_FAIL, USER_REQUEST, USER_SUCCESS } from "../../../constants/user"
import { userActions } from "../user-slice"

export const userLogoutAll = (token: string) => async (dispatch: any) => {
  dispatch(userActions.logout({
    type: USER_REQUEST
  }));

  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }

  const logoutAll = async () => {
    return await axios.post(`${BACKEND_USER_ROUTER_LOGOUT_ALL}`, {}, config);
  }

  try {
    await logoutAll();
    
    dispatch(userActions.logout({
     type: USER_SUCCESS
    }))
  } catch (error: any) {
    dispatch(userActions.logout({
      type: USER_FAIL,
      payload: error.response.data.message
    }));
  
  }
}