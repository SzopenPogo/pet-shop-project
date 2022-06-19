import { Dispatch } from "@reduxjs/toolkit";
import axios from "axios";
import { BACKEND_CART_ROUTER } from "../../../constants/backend";
import { CART_FAIL, CART_REQUEST, CART_SUCCESS } from "../../../constants/cart";
import { ICartAddData } from "../../../interfaces/ICart";
import { cartActions } from "../cart-slice";

export const calculateCart = (cartItems: Array<ICartAddData>) => async (dispatch: Dispatch) => {
  cartActions.calculate({type: CART_REQUEST});

  const calculateCartRequest = async () => {
    return await axios.post(`${BACKEND_CART_ROUTER}`, cartItems);
  }

  try {
    const { data } = await calculateCartRequest();
    
    dispatch(cartActions.calculate({
      type: CART_SUCCESS,
      payload: data
    }))
  } catch (error: any) {
    dispatch(cartActions.calculate({
      type: CART_FAIL,
      payload: error.response.data.message
    }))
  }
}