import axios from "axios";
import { BACKEND_USER_ROUTER_GET_ME, BACKEND_USER_ROUTER_LOGIN } from "../../constants/backend";
import { USER_FAIL, USER_REQUEST, USER_SUCCESS } from "../../constants/user"
import { userActions } from "./user-slice"


// LOGIN USER
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
    
  } catch (error) {
    dispatch(userActions.login({
      type: USER_FAIL,
      payload: 'Login failed'
    }))
  }
}

// GET USER ME
export const getUserMe = (token: string) => async (dispatch: any) => {
  dispatch(userActions.get({
    type: USER_REQUEST
  }));

  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }

  const getMe = async () => {
    return await axios.get(`${BACKEND_USER_ROUTER_GET_ME}`, config);
  }

  try {
    const { data } = await getMe();
    
    dispatch(userActions.get({
      type: USER_SUCCESS,
      payload: data
    }))
  } catch (error) {
    dispatch(userActions.get({
      type: USER_FAIL,
      payload: 'Fetch user failed'
    }))
  }
}