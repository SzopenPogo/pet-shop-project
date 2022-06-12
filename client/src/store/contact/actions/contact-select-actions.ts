import { Dispatch } from "@reduxjs/toolkit";
import { ISelectedContact } from "../../../interfaces/IContact";
import { contactActions } from "../contact-slice";

export const selectContact = ({_id, index}: ISelectedContact) => (dispatch: Dispatch) => {
  dispatch(contactActions.select({_id, index}));
}