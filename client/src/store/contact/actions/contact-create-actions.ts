import { Dispatch } from "@reduxjs/toolkit";
import axios from "axios";
import { BACKEND_CONTACT_ROUTER } from "../../../constants/backend";
import { CONTACT_FAIL, CONTACT_REQUEST, CONTACT_SUCCESS } from "../../../constants/contact";
import { IContact } from "../../../interfaces/IContact";
import { contactActions } from "../contact-slice";

export const adminCreateContact = (
  token: string, {
  bankNumber,
  city,
  country,
  homeNumber,
  phoneNumber,
  postalCode,
  street
}: IContact) => async (dispatch: Dispatch) => {
  dispatch(contactActions.create({type: CONTACT_REQUEST}));

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

  const createContactRequest = async () => {
    return await axios.post(BACKEND_CONTACT_ROUTER, contactData, config);
  }

  try {
    const { data } = await createContactRequest();

    dispatch(contactActions.create({
      type: CONTACT_SUCCESS,
      payload: data
    }));
  } catch (error: any) {
    dispatch(contactActions.create({
      type: CONTACT_FAIL,
      payload: error.response.data.message
    }));
  }
}