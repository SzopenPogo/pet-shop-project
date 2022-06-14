import { Dispatch } from "@reduxjs/toolkit";
import axios from "axios";
import { BACKEND_PRODUCT_ROUTER } from "../../../constants/backend";
import { PRODUCT_FAIL, PRODUCT_REQUEST, PRODUCT_SUCCESS } from "../../../constants/product";
import { productActions } from "../product-slice";

export const getProductById = (_id: string) => async (dispatch: Dispatch) => {
  dispatch(productActions.getById({type: PRODUCT_REQUEST}));

  const getProductByIdRequest = async () => {
    return await axios.get(`${BACKEND_PRODUCT_ROUTER}/${_id}`);
  }

  try {
    const { data } = await getProductByIdRequest();
    
    dispatch(productActions.getById({
      type: PRODUCT_SUCCESS,
      payload: data
    }))
  } catch (error: any) {
    dispatch(productActions.getById({
      type: PRODUCT_FAIL,
      payload: error.response.data.message
    }))
  }
}