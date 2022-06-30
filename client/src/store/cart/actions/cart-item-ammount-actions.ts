import { Dispatch } from "@reduxjs/toolkit";
import { cartActions } from "../cart-slice";

export const changeCartItemAmmount = (_id: string, ammount: number) => (dispatch: Dispatch) => {
  if(ammount <= 0) {
    dispatch(cartActions.deleteItem(_id));
  }

  dispatch(cartActions.changeItemAmmount({_id, ammount}));
}