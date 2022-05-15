import axios from "axios";
import { BACKEND_ADMIN_ROUTER_EDIT_USER } from "../../../constants/backend";
import { ADMIN_USER_FAIL, ADMIN_USER_REQUEST, ADMIN_USER_SUCCESS } from "../../../constants/user"
import { addInfoMessage } from "../../ui/actions/info-items-actions";
import { adminActions } from "../admin-slice"
import { adminGetAllUsers } from "./admin-get-all-users";

export const AdminEditUser = (
  token: string, 
  _id: string, 
  email: string, 
  adminNote: string
  ) => async (dispatch: any) => {

  dispatch(adminActions.edit({ type: ADMIN_USER_REQUEST}));

  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }

  const adminEditUserDataRequest = async () => {
    return await axios.patch(`${BACKEND_ADMIN_ROUTER_EDIT_USER}/${_id}`, {
      email,
      adminNote
    }, config);
  }

  try {
    await adminEditUserDataRequest();

    dispatch(adminActions.edit({ type: ADMIN_USER_SUCCESS}));
    dispatch(addInfoMessage({message: `${email} edited!`, timeout: 1500, isPositive: true}));
    dispatch(adminGetAllUsers(token));
    
  } catch (error: any) {
    dispatch(adminActions.edit({
      type: ADMIN_USER_FAIL,
      payload: error.response.data.message
    }));
  }
}