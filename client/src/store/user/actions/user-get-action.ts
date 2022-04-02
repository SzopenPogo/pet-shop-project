import axios from "axios";
import { BACKEND_USER_ROUTER_GET_ME } from "../../../constants/backend";
import { USER_FAIL, USER_REQUEST, USER_SUCCESS } from "../../../constants/user";
import { userActions } from "../user-slice";

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