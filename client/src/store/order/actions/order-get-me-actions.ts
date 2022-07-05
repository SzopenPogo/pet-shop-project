import { Dispatch } from "@reduxjs/toolkit";
import axios from "axios";
import { BACKEND_ORDER_ME_ROUTER } from "../../../constants/backend";
import { ORDER_FAIL, ORDER_REQUEST, ORDER_SUCCESS } from "../../../constants/order";
import { orderActions } from "../order-slice";

export const getMyOrders = (token: string) => async (dispatch: Dispatch) => {
  orderActions.getMe({type: ORDER_REQUEST});
  
  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }
  
  const getMyOrdersRequest = async () => {
    return await axios.get(BACKEND_ORDER_ME_ROUTER, config);
  }

  try {
    const { data } = await getMyOrdersRequest();
    
    dispatch(orderActions.getMe({
      type: ORDER_SUCCESS,
      payload: data
    }))
  } catch (error: any) {
    dispatch(orderActions.getMe({
      type: ORDER_FAIL,
      payload: error.response.data.message
    }))
  }
}