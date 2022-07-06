import { Dispatch } from "@reduxjs/toolkit";
import axios from "axios";
import { BACKEND_PRODUCT_ROUTER } from "../../../constants/backend";
import { PRODUCT_SEARCHBAR_FAIL, PRODUCT_SEARCHBAR_REQUEST, PRODUCT_SEARCHBAR_SUCCESS } from "../../../constants/product";
import { productActions } from "../product-slice";


export const getSearchbarProducts = (value: string) => async (dispatch: Dispatch) => {
  dispatch(productActions.getSearchbar({type: PRODUCT_SEARCHBAR_REQUEST}));

  const limit = 5;

  const getSearchbarProductsRequest = async () => {
    return await axios.get(`${BACKEND_PRODUCT_ROUTER}?productTitle=${value}&limit=${limit}`);
  }

  try {
    const { data } = await getSearchbarProductsRequest();

    dispatch(productActions.getSearchbar({
      type: PRODUCT_SEARCHBAR_SUCCESS,
      payload: data
    }));
  } catch (error: any) {
    dispatch(productActions.getSearchbar({
      type: PRODUCT_SEARCHBAR_FAIL,
      payload: error.response.data.message
    }));
  }
}