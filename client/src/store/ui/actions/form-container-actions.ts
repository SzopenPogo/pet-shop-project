import { Dispatch } from "@reduxjs/toolkit";
import { uiActions } from "../ui-slice";


export const toggleFormContainer = () => (dispatch: Dispatch) => {
  dispatch(uiActions.toggleFormContainer());
}