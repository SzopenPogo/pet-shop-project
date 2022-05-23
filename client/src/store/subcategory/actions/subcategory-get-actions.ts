import { Dispatch } from "@reduxjs/toolkit";
import axios from "axios";
import { BACKEND_SUBCATEGORY_ROUTER } from "../../../constants/backend";
import { SUBCATEGORY_FAIL, SUBCATEGORY_REQUEST, SUBCATEGORY_SUCCESS } from "../../../constants/subcategory";
import { subcategoryActions } from "../subcategory-slice";

export const subcategoryGet = (categoryId?: string) => async (dispatch: Dispatch) => {
  dispatch(subcategoryActions.get({type: SUBCATEGORY_REQUEST}));

  const subcategoryGetRequest = async () => {
    const url = categoryId 
      ? `${BACKEND_SUBCATEGORY_ROUTER}?categoryId=${categoryId}`
      : BACKEND_SUBCATEGORY_ROUTER

    return await axios.get(url);
  }

  try {
    const { data } = await subcategoryGetRequest();
    
    dispatch(subcategoryActions.get({
      type: SUBCATEGORY_SUCCESS,
      payload: data
    }))
  } catch (error: any) {
    dispatch(subcategoryActions.get({
      type: SUBCATEGORY_FAIL,
      payload: error.response.data.message
    }))
  }
}