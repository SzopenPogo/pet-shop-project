import axios from "axios";
import { BACKEND_USER_ROUTER_REGISTER } from "../../../constants/backend";
import { USER_FAIL, USER_REQUEST, USER_SUCCESS } from "../../../constants/user";
import { userActions } from "../user-slice";

export const registerUser = (email: string, password: string) => async (dispatch: any) => {
  dispatch(userActions.login({ type: USER_REQUEST }));

  const registerRequest = async () => {
    return await axios.post(`${BACKEND_USER_ROUTER_REGISTER}`, {
      email,
      password
    });
  }

  try {
    const user = await registerRequest();
    const { token, userResponseData } = user.data;
    
    dispatch(userActions.login({
      type: USER_SUCCESS,
      token,
      payload: userResponseData
    }));
    
  } catch (error) {
    dispatch(userActions.login({
      type: USER_FAIL,
      payload: 'Reister failed'
    }))
  }
}