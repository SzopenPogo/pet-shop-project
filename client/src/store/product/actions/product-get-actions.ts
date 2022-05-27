import { Dispatch } from "@reduxjs/toolkit";
import axios from "axios";
import { PRODUCT_FAIL, PRODUCT_REQUEST, PRODUCT_SUCCESS } from "../../../constants/product";
import { productActions } from "../product-slice";


export const getProducts = (url: string) => async (dispatch: Dispatch) => {
  dispatch(productActions.get({type: PRODUCT_REQUEST}));

  const getProductsRequest = async () => {
    return await axios.get(url);
  }

  try {
    const { data } = await getProductsRequest();

    dispatch(productActions.get({
      type: PRODUCT_SUCCESS,
      payload: data
    }));
  } catch (error: any) {
    dispatch(productActions.get({
      type: PRODUCT_FAIL,
      payload: error.response.data.message
    }));
  }
}