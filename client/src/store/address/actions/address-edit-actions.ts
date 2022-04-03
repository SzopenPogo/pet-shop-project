import axios from "axios";
import { ADDRESS_FAIL, ADDRESS_REQUEST, ADDRESS_SUCCESS } from "../../../constants/address";
import { BACKEND_ADDRESS_ROUTER } from "../../../constants/backend";
import { addressActions } from "../address-slice";

export const editAddress = (
  token: string,
  _id: string,
  index: number,
  countryValue: string,
  cityValue: string,
  postalCodeValue: string,
  streetValue: string,
  homeNumberValue: string,
  phoneNumberValue: string
) => async (dispatch: any) => {
  dispatch(addressActions.edit({
    type: ADDRESS_REQUEST
  }));

  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }

  const data = {
    country: countryValue,
    postalCode: postalCodeValue,
    city: cityValue,
    street: streetValue,
    homeNumber: homeNumberValue,
    phoneNumber: phoneNumberValue
  }
  
  const patchAddress = async () => {
    return await axios.patch(`${BACKEND_ADDRESS_ROUTER}/${_id}`, data, config);
  }

  try {
    const { data } = await patchAddress();
    
    dispatch(addressActions.edit({
      type: ADDRESS_SUCCESS,
      payload: data,
      index
    }))
  } catch (error: any) {
    dispatch(addressActions.edit({
      type: ADDRESS_FAIL,
      payload: error.response.data.message
    }))
  }
}