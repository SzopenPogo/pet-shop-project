import { Dispatch } from "@reduxjs/toolkit";
import axios from "axios";
import { BACKEND_ORDER_ROUTER } from "../../../constants/backend";
import { CREATE_ORDER_FAIL, CREATE_ORDER_REQUEST, CREATE_ORDER_SUCCESS } from "../../../constants/order";
import { IOrder } from "../../../interfaces/IOrder";
import { orderActions } from "../order-slice";

export const createOrder = (orderData: IOrder) => async (dispatch: Dispatch) => {
  dispatch(orderActions.create({type: CREATE_ORDER_REQUEST}));

  const createOrderRequest = async () => {
    return await axios.post(BACKEND_ORDER_ROUTER, orderData);
  }
  
  try {
    const { data } = await createOrderRequest();

    dispatch(orderActions.create({
      type: CREATE_ORDER_SUCCESS,
      payload: data
    }))
  } catch (error: any) {
    dispatch(orderActions.create({
      type: CREATE_ORDER_FAIL,
      payload: error.response.data.message
    }))
  }
}

export const resetCreateOrderActionType = () => (dispatch: Dispatch) => {
  dispatch(orderActions.resetCreateOrderActionType());
}