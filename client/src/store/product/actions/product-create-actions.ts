import { Dispatch } from "@reduxjs/toolkit";
import axios from "axios";
import { BACKEND_PRODUCT_ROUTER } from "../../../constants/backend";
import { PRODUCT_FAIL, PRODUCT_REQUEST, PRODUCT_SUCCESS } from "../../../constants/product";
import { productActions } from "../product-slice";

export const adminCreateProduct = (
  token: string,
  title : string,
  description: string,
  images: FileList,
  price: number,
  subcategoryId: string
  ) => async (dispatch: Dispatch) => {
  
  dispatch(productActions.create({type: PRODUCT_REQUEST}));

  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }

  const formData = new FormData();
  for (let i = 0; i < images.length; i++) {
    formData.append('images', images[i], images[i].name);
  }
  formData.append('title', title);
  formData.append('description', description);
  formData.append('price', price.toString());
  formData.append('subcategoryId', subcategoryId);


  const createProductRequest = async () => {
    return await axios.post(BACKEND_PRODUCT_ROUTER, formData, config);
  }

  try {
    const { data } = await createProductRequest();

    dispatch(productActions.create({
      type: PRODUCT_SUCCESS,
      payload: data
    }));
  } catch (error: any) {
    dispatch(productActions.create({
      type: PRODUCT_FAIL,
      payload: error.response.data.message
    }));
  }
}