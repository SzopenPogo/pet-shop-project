import { Dispatch } from "@reduxjs/toolkit";
import { ISelectedProduct } from "../../../interfaces/IProduct";
import { productActions } from "../product-slice";

export const selectProduct = ({_id, index}: ISelectedProduct) => (dispatch: Dispatch) => {
  dispatch(productActions.select({_id, index}));
}