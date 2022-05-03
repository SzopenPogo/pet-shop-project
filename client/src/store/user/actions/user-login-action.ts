import axios from "axios";
import { BACKEND_USER_ROUTER_LOGIN } from "../../../constants/backend";
import { USER_FAIL, USER_REQUEST, USER_SUCCESS } from "../../../constants/user";
import { userActions } from "../user-slice";

export const loginUser = (email: string, password: string) => async (dispatch: any) => {
  dispatch(userActions.login({ type: USER_REQUEST }));

  const loginRequest = async () => {
    return await axios.post(`${BACKEND_USER_ROUTER_LOGIN}`, {
      email,
      password
    });
  }

  try {
    const user = await loginRequest();
    const { token, userResponseData } = user.data;
    
    dispatch(userActions.login({
      type: USER_SUCCESS,
      token,
      payload: userResponseData
    }));
    
  } catch (error: any) {
    dispatch(userActions.login({
      type: USER_FAIL,
      payload: error.response.data.message
    }))
  }
}