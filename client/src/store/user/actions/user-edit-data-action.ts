import axios from "axios";
import { BACKEND_USER_ROUTER_EDIT_DATA } from "../../../constants/backend";
import { USER_FAIL, USER_REQUEST, USER_SUCCESS } from "../../../constants/user"
import { userActions } from "../user-slice"

export const editUserData = (
  token: string, 
  email: string, 
  password: string, 
  currentPassword: string) => async (dispatch: any) => {
    dispatch(userActions.editData({ type: USER_REQUEST }));

    const config = {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }

    const editUserDataRequest = async () => {
      return await axios.patch(`${BACKEND_USER_ROUTER_EDIT_DATA}`, {
        email,
        password,
        currentPassword
      }, config);
    }

    try {
      const { data } = await editUserDataRequest();
    
      dispatch(userActions.editData({
        type: USER_SUCCESS,
        payload: data
      }));
    } catch (error: any) {
      dispatch(userActions.editData({
        type: USER_FAIL,
        payload: error.response.data.message
      }))
    }
    
}