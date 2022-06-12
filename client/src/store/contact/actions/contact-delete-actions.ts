import { Dispatch } from "@reduxjs/toolkit";
import axios from "axios";
import { BACKEND_CONTACT_ROUTER } from "../../../constants/backend";
import { CONTACT_FAIL, CONTACT_REQUEST, CONTACT_SUCCESS } from "../../../constants/contact";
import { contactActions } from "../contact-slice";

export const adminDeleteContact = (
  token: string, 
  _id: string,
  index: number
) => async (dispatch: Dispatch) => {

  dispatch(contactActions.delete({type: CONTACT_REQUEST}));

  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }

  const deleteContactRequest = async () => {
    return await axios.delete(`${BACKEND_CONTACT_ROUTER}/${_id}`, config);
  }

  try {
    await deleteContactRequest();

    dispatch(contactActions.delete({
      type: CONTACT_SUCCESS,
      payload: '',
      index
    }));
  } catch (error: any) {
    dispatch(contactActions.delete({
      type: CONTACT_FAIL,
      payload: error.response.data.message
    }));
  }
}