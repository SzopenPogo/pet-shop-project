import { Dispatch } from "@reduxjs/toolkit";
import axios from "axios";
import { BACKEND_PRODUCT_ROUTER } from "../../../constants/backend";
import { PRODUCT_FAIL, PRODUCT_REQUEST, PRODUCT_SUCCESS } from "../../../constants/product";
import { productActions } from "../product-slice";

export const adminDeleteProduct = (
  token: string, 
  _id: string,
  index: number
  ) => async (dispatch: Dispatch) => {
  
  dispatch(productActions.delete({type: PRODUCT_REQUEST}));

  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }

  const deleteProductRequest = async () => {
    return await axios.delete(`${BACKEND_PRODUCT_ROUTER}/${_id}`, config);
  }

  try {
    await deleteProductRequest();

    dispatch(productActions.delete({
      type: PRODUCT_SUCCESS,
      payload: '',
      index
    }));
  } catch (error: any) {
    dispatch(productActions.delete({
      type: PRODUCT_FAIL,
      payload: error.response.data.message
    }));
  }

}