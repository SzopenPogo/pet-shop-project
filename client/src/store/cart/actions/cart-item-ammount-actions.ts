import { Dispatch } from "@reduxjs/toolkit";
import { cartActions } from "../cart-slice";

export const changeCartItemAmmount = (_id: string, ammount: number) => (dispatch: Dispatch) => {
  dispatch(cartActions.changeItemAmmount({_id, ammount}));
}