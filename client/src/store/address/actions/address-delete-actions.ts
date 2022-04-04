import axios from "axios";
import { ADDRESS_FAIL, ADDRESS_REQUEST, ADDRESS_SUCCESS } from "../../../constants/address";
import { BACKEND_ADDRESS_ROUTER } from "../../../constants/backend";
import { addressActions } from "../address-slice";

export const deleteUserAddress = (token: string, _id: string, index: number) => async (dispatch: any) => {
  dispatch(addressActions.delete({
    type: ADDRESS_REQUEST
  }));

  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }
  
  const deleteAddress = async () => {
    return await axios.delete(`${BACKEND_ADDRESS_ROUTER}/${_id}`, config);
  }

  try {
    await deleteAddress();
    
    dispatch(addressActions.delete({
      type: ADDRESS_SUCCESS,
      index
    }))
  } catch (error: any) {
    dispatch(addressActions.delete({
      type: ADDRESS_FAIL,
      payload: error.response.data.message
    }))
  }
}