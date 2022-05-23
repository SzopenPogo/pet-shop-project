import { Dispatch } from "@reduxjs/toolkit";
import axios from "axios";
import { BACKEND_SUBCATEGORY_ROUTER } from "../../../constants/backend";
import { SUBCATEGORY_FAIL, SUBCATEGORY_REQUEST, SUBCATEGORY_SUCCESS } from "../../../constants/subcategory";
import { subcategoryActions } from "../subcategory-slice";

export const adminEditSubcategory = (
  token: string,
  index: number,
  _id: string,
  title: string,
  image: File,
  categoryId: string
) => async (dispatch: Dispatch) => {
  dispatch(subcategoryActions.edit({type: SUBCATEGORY_REQUEST}));

  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }

  
  const formData = new FormData();
  if(title) {
    formData.append('title', title);
  }
  if(categoryId) {
    formData.append('categoryId', categoryId);
  }
  if(image) {
    formData.append('image', image, image.name);
  }

  const editSubcategoryRequest = async () => {
    return await axios.patch(`${BACKEND_SUBCATEGORY_ROUTER}/${_id}`, formData, config);
  }

  try {
    const { data } = await editSubcategoryRequest();

    dispatch(subcategoryActions.edit({
      type: SUBCATEGORY_SUCCESS,
      payload: data,
      index
    }));
  } catch (error: any) {
    dispatch(subcategoryActions.edit({
      type: SUBCATEGORY_FAIL,
      payload: error.response.data.message
    }));
  }
}