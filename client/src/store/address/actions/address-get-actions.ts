import axios from "axios";
import { ADDRESS_FAIL, ADDRESS_REQUEST, ADDRESS_SUCCESS } from "../../../constants/address";
import { BACKEND_ADDRESS_ROUTER } from "../../../constants/backend";
import { addressActions } from "../address-slice";

export const getAllAddresses = (token: string) => async (dispatch: any) => {
  dispatch(addressActions.getAll({
    type: ADDRESS_REQUEST
  }));

  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }
  
  const fetchAddresses = async () => {
    return await axios.get(`${BACKEND_ADDRESS_ROUTER}`, config);
  }

  try {
    const { data } = await fetchAddresses();
    
    dispatch(addressActions.getAll({
      type: ADDRESS_SUCCESS,
      payload: data
    }))
  } catch (error: any) {
    dispatch(addressActions.getAll({
      type: ADDRESS_FAIL,
      payload: error.response.data.message
    }))
  }
}