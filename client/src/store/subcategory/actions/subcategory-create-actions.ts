import { Dispatch } from "@reduxjs/toolkit";
import axios from "axios";
import { BACKEND_SUBCATEGORY_ROUTER } from "../../../constants/backend";
import { SUBCATEGORY_FAIL, SUBCATEGORY_REQUEST, SUBCATEGORY_SUCCESS } from "../../../constants/subcategory";
import { subcategoryActions } from "../subcategory-slice";

export const adminSubcategoryCreate = (
  token: string,
  title: string,
  image: File,
  categoryId: string
) => async (dispatch: Dispatch) => {
  dispatch(subcategoryActions.create({type: SUBCATEGORY_REQUEST}));

  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }

  const formData = new FormData();
  formData.append('image', image, image.name);
  formData.append('title', title);
  formData.append('categoryId', categoryId);

  const createSubcategoryRequest = async () => {
    return await axios.post(BACKEND_SUBCATEGORY_ROUTER, formData, config);
  }

  try {
    const { data } = await createSubcategoryRequest();

    dispatch(subcategoryActions.create({
      type: SUBCATEGORY_SUCCESS,
      payload: data
    }));
  } catch (error: any) {
    console.log(error);
    
    dispatch(subcategoryActions.create({
      type: SUBCATEGORY_FAIL,
      payload: error.response.data.message
    }));
  }
}