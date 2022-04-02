import axios from "axios";
import { BACKEND_USER_ROUTER_AVATAR } from "../../../constants/backend";
import { USER_FAIL, USER_REQUEST, USER_SUCCESS } from "../../../constants/user";
import { userActions } from "../user-slice";

export const editUserAvatar = (token: string, image: File) => async (dispatch: any) => {
  dispatch(userActions.avatar({
    type: USER_REQUEST
  }));

  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }

  const formData = new FormData();
  formData.append('image', image, image.name);

  const editAvatar = async () => {
    return await axios.patch(BACKEND_USER_ROUTER_AVATAR, formData, config);
  }

  try {
    const { data } = await editAvatar();
    
    dispatch(userActions.avatar({
      type: USER_SUCCESS,
      payload: data
    }))
  } catch (error) {
    dispatch(userActions.avatar({
      type: USER_FAIL,
      payload: 'Fetch user failed'
    }))
  }
}