import { Dispatch } from "@reduxjs/toolkit";
import axios from "axios";
import { BACKEND_CATEGORY_ROUTER } from "../../../constants/backend";
import { CATEGORY_FAIL, CATEGORY_REQUEST, CATEGORY_SUCCESS } from "../../../constants/category";
import { categoryActions } from "../category-slice";

export const adminCreateCategory = (
  token: string,
  title: string
  ) => async (dispatch: Dispatch) => {
    dispatch(categoryActions.create({ type: CATEGORY_REQUEST }));

    const config = {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }

    const createCategoryRequest = async () => {
      return await axios.post(BACKEND_CATEGORY_ROUTER, {title}, config);
    }

    try {
      const {data} = await createCategoryRequest();

      dispatch(categoryActions.create({
        type: CATEGORY_SUCCESS,
        payload: data
      }));

    } catch (error: any) {
      dispatch(categoryActions.create({
        type: CATEGORY_FAIL,
        payload: error.response.data.message
      }));
    }
}