import { Dispatch } from "@reduxjs/toolkit";
import axios from "axios";
import { BACKEND_SUBCATEGORY_ROUTER } from "../../../constants/backend";
import { SUBCATEGORY_FAIL, SUBCATEGORY_REQUEST, SUBCATEGORY_SUCCESS } from "../../../constants/subcategory";
import { subcategoryActions } from "../subcategory-slice";

export const getSubcategoryById = (_id: string) => async (dispatch: Dispatch) => {
  dispatch(subcategoryActions.getById({type: SUBCATEGORY_REQUEST}));

  const getSubcategoryByIdRequest = async () => {
    return await axios.get(`${BACKEND_SUBCATEGORY_ROUTER}/${_id}`);
  }

  try {
    const { data } = await getSubcategoryByIdRequest();
    
    dispatch(subcategoryActions.getById({
      type: SUBCATEGORY_SUCCESS,
      payload: data
    }))
  } catch (error: any) {
    dispatch(subcategoryActions.getById({
      type: SUBCATEGORY_FAIL,
      payload: error.response.data.message
    }))
  }
}