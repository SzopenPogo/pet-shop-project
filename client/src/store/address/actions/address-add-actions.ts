import axios from "axios";
import { ADDRESS_FAIL, ADDRESS_REQUEST, ADDRESS_SUCCESS } from "../../../constants/address";
import { BACKEND_ADDRESS_ROUTER } from "../../../constants/backend";
import { addressActions } from "../address-slice";

export const addNewAddress = (
  token: string,
  countryValue: string,
  cityValue: string,
  postalCodeValue: string,
  streetValue: string,
  homeNumberValue: string,
  phoneNumberValue: string
) => async (dispatch: any) => {
  dispatch(addressActions.add({
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
  
  const addAddress = async () => {
    return await axios.post(`${BACKEND_ADDRESS_ROUTER}`, data, config);
  }

  try {
    const { data } = await addAddress();
    
    dispatch(addressActions.add({
      type: ADDRESS_SUCCESS,
      payload: data
    }))
  } catch (error: any) {
    dispatch(addressActions.add({
      type: ADDRESS_FAIL,
      payload: error.response.data.message
    }))
  }
}