import { Dispatch } from "@reduxjs/toolkit";
import axios from "axios";
import { BACKEND_CATEGORY_ROUTER } from "../../../constants/backend";
import { CATEGORY_FAIL, CATEGORY_REQUEST, CATEGORY_SUCCESS } from "../../../constants/category";
import { categoryActions } from "../category-slice";

export const categoryGetById = (_id: string) => async (dispatch: Dispatch) => {
  dispatch(categoryActions.getById({type: CATEGORY_REQUEST}));

  const categoryGetByIdRequest = async () => {
    return await axios.get(`${BACKEND_CATEGORY_ROUTER}/${_id}`);
  }

  try {
    const {data} = await categoryGetByIdRequest();

    dispatch(categoryActions.getById({
      type: CATEGORY_SUCCESS,
      payload: data
    }));
  } catch (error: any) {
    dispatch(categoryActions.getById({
      type: CATEGORY_FAIL,
      payload: error.response.data.message
    }));
  }
}