import { Dispatch } from "@reduxjs/toolkit";
import { ICartAddData } from "../../../interfaces/ICart";
import { cartActions } from "../cart-slice";

export const addItemToCart = ({_id, ammount}: ICartAddData) => (dispatch: Dispatch) => {
  dispatch(cartActions.addToCart({_id, ammount}));
}