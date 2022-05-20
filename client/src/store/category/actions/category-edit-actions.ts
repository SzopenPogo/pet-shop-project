import { Dispatch } from "@reduxjs/toolkit";
import axios from "axios";
import { BACKEND_CATEGORY_ROUTER } from "../../../constants/backend";
import { CATEGORY_FAIL, CATEGORY_REQUEST, CATEGORY_SUCCESS } from "../../../constants/category";
import { categoryActions } from "../category-slice";

export const adminCategoryEdit = (
  token: string,
  index: number,
  _id: string,
  title: string
  ) => async (dispatch: Dispatch) => {
  
  dispatch(categoryActions.edit({ type: CATEGORY_REQUEST }));

  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }

  const editCategoryRequest = async () => {
    return await axios.patch(`${BACKEND_CATEGORY_ROUTER}/${_id}`, { title }, config);
  }

  try {
    const {data} = await editCategoryRequest();

    dispatch(categoryActions.edit({
      type: CATEGORY_SUCCESS,
      payload: data,
      index
    }));
    
  } catch (error: any) {
    dispatch(categoryActions.edit({
      type: CATEGORY_FAIL,
      payload: error.response.data.message
    }));
  }
}