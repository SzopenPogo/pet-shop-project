import { Dispatch } from "@reduxjs/toolkit";
import axios from "axios";
import { BACKEND_CONTACT_ROUTER } from "../../../constants/backend";
import { CONTACT_FAIL, CONTACT_REQUEST, CONTACT_SUCCESS } from "../../../constants/contact";
import { IContact } from "../../../interfaces/IContact";
import { contactActions } from "../contact-slice";

export const adminContactEdit = (
  token: string,
  index: number, {
    bankNumber,
    city,
    country,
    homeNumber,
    phoneNumber,
    postalCode,
    street,
    _id
  } :IContact
) => async (dispatch: Dispatch) => {
  dispatch(contactActions.edit({type: CONTACT_REQUEST}));

  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }

  const contactData = {
    bankNumber,
    city,
    country,
    homeNumber,
    phoneNumber,
    postalCode,
    street
  }

  const editContactRequest = async () => {
    return await axios.patch(`${BACKEND_CONTACT_ROUTER}/${_id}`, contactData, config);
  }

  try {
    const { data } = await editContactRequest();

    dispatch(contactActions.edit({
      type: CONTACT_SUCCESS,
      payload: data,
      index
    }));
  } catch (error: any) {
    dispatch(contactActions.edit({
      type: CONTACT_FAIL,
      payload: error.response.data.message
    }));
  }
}