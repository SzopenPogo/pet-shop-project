import { Dispatch } from "@reduxjs/toolkit";
import { cartActions } from "../cart-slice";

export const clearCart = () => (dispatch: Dispatch) => {
  dispatch(cartActions.clearCart());
}