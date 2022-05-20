import { Dispatch } from "@reduxjs/toolkit";
import axios from "axios";
import { BACKEND_CATEGORY_ROUTER } from "../../../constants/backend";
import { CATEGORY_FAIL, CATEGORY_REQUEST, CATEGORY_SUCCESS } from "../../../constants/category";
import { categoryActions } from "../category-slice";

export const adminCategoryDelete = (
  token: string,
  index: number,
  _id: string
  ) => async (dispatch: Dispatch) => {
  
  dispatch(categoryActions.delete({ type: CATEGORY_REQUEST }));
  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }

  const deleteCategoryRequest = async () => {
    return await axios.delete(`${BACKEND_CATEGORY_ROUTER}/${_id}`, config);
  }

  try {
    await deleteCategoryRequest();

    dispatch(categoryActions.delete({
      type: CATEGORY_SUCCESS,
      payload: '',
      index
    }))
  } catch (error: any) {
    dispatch(categoryActions.delete({
      type: CATEGORY_FAIL,
      payload: error.response.data.message
    }));
  }
}