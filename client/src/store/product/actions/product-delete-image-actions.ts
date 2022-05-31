import { Dispatch } from "@reduxjs/toolkit"
import axios from "axios";
import { BACKEND_PRODUCT_IMAGE_ROUTER } from "../../../constants/backend";
import { PRODUCT_FAIL, PRODUCT_REQUEST, PRODUCT_SUCCESS } from "../../../constants/product"
import { productActions } from "../product-slice"

export const adminDeleteProductImage = (
  token: string, 
  _id: string,
  index: number,
  image: string) => async (dispatch: Dispatch) => {
  
  dispatch(productActions.deleteImage({type: PRODUCT_REQUEST}));

  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }

  const deleteProductImageRequest = async () => {
    return await axios.patch(`${BACKEND_PRODUCT_IMAGE_ROUTER}/${_id}`, {image}, config);
  }

  try {
    const { data } = await deleteProductImageRequest();

    dispatch(productActions.deleteImage({
      type: PRODUCT_SUCCESS,
      payload: data,
      index
    }));
  } catch (error: any) {
    dispatch(productActions.deleteImage({
      type: PRODUCT_FAIL,
      payload: error.response.data.message
    }));
  }
}