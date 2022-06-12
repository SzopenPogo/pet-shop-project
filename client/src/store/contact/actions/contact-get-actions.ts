import { Dispatch } from "@reduxjs/toolkit";
import axios from "axios";
import { BACKEND_CONTACT_ROUTER } from "../../../constants/backend";
import { CONTACT_FAIL, CONTACT_REQUEST, CONTACT_SUCCESS } from "../../../constants/contact";
import { contactActions } from "../contact-slice";

export const getContacts = () => async (dispatch: Dispatch) => {
  contactActions.get({type: CONTACT_REQUEST});

  const contactGetRequest = async () => {
    return await axios.get(BACKEND_CONTACT_ROUTER);
  }

  try {
    const { data } = await contactGetRequest();
    
    dispatch(contactActions.get({
      type: CONTACT_SUCCESS,
      payload: data
    }))
  } catch (error: any) {
    dispatch(contactActions.get({
      type: CONTACT_FAIL,
      payload: error.response.data.message
    }))
  }
}