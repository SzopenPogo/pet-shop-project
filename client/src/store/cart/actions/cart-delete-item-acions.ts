import { Dispatch } from "@reduxjs/toolkit";
import { cartActions } from "../cart-slice";

export const deleteItemFromCart = (_id: string) => (dispatch: Dispatch) => {
  dispatch(cartActions.deleteItem(_id));
}