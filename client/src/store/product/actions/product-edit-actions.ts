import { Dispatch } from "@reduxjs/toolkit";
import axios from "axios";
import { BACKEND_PRODUCT_ROUTER } from "../../../constants/backend";
import { PRODUCT_FAIL, PRODUCT_REQUEST, PRODUCT_SUCCESS } from "../../../constants/product";
import { productActions } from "../product-slice";

export const adminEditProduct = (
  token: string,
  _id: string,
  index: number,
  title: string,
  price: number,
  subcategoryId: string,
  description: string,
  images?: FileList
) => async (dispatch: Dispatch) => {
  dispatch(productActions.edit({type: PRODUCT_REQUEST}));

  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }

  const formData = new FormData();
  formData.append('title', title);
  formData.append('price', price.toString());
  formData.append('subcategoryId', subcategoryId);
  formData.append('description', description);
  if(images && images.length > 0) {
    for (let i = 0; i < images.length; i++) {
      formData.append('images', images[i], images[i].name);
    }
  }
  

  const editProductRequest = async () => {
    return await axios.patch(`${BACKEND_PRODUCT_ROUTER}/${_id}`, formData, config);
  }

  try {
    const { data } = await editProductRequest();

    dispatch(productActions.edit({
      type: PRODUCT_SUCCESS,
      payload: data,
      index
    }));
  } catch (error: any) {
    dispatch(productActions.edit({
      type: PRODUCT_FAIL,
      payload: error.response.data.message
    }));
  }
}