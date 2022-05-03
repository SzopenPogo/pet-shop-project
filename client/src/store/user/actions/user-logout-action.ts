import axios from "axios";
import { BACKEND_USER_ROUTER_LOGOUT } from "../../../constants/backend";
import { USER_FAIL, USER_REQUEST, USER_SUCCESS } from "../../../constants/user";
import { userActions } from "../user-slice";

export const userLogout = (token: string) => async (dispatch: any) => {
  dispatch(userActions.logout({
    type: USER_REQUEST
  }));

  
  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }
  
  const logout = async () => {
    return await axios.post(`${BACKEND_USER_ROUTER_LOGOUT}`, {}, config);
  }


  try {
    await logout();
    
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