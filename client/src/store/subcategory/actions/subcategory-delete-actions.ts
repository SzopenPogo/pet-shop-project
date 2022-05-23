import { Dispatch } from "@reduxjs/toolkit";
import axios from "axios";
import { BACKEND_SUBCATEGORY_ROUTER } from "../../../constants/backend";
import { SUBCATEGORY_FAIL, SUBCATEGORY_REQUEST, SUBCATEGORY_SUCCESS } from "../../../constants/subcategory";
import { subcategoryActions } from "../subcategory-slice";

export const adminDeleteSubcategory = (
  token: string,
  index: number,
  _id: string
) => async (dispatch: Dispatch) => {
  dispatch(subcategoryActions.delete({type: SUBCATEGORY_REQUEST}));
  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }

  const deleteSubcategoryRequest = async () => {
    return await axios.delete(`${BACKEND_SUBCATEGORY_ROUTER}/${_id}`, config);
  }

  try {
    await deleteSubcategoryRequest();

    dispatch(subcategoryActions.delete({
      type: SUBCATEGORY_SUCCESS,
      payload: '',
      index
    }));
  } catch (error: any) {
    dispatch(subcategoryActions.delete({
      type: SUBCATEGORY_FAIL,
      payload: error.response.data.message
    }));
  }
}