import { Dispatch } from "@reduxjs/toolkit";
import axios from "axios";
import { ORDER_FAIL, ORDER_REQUEST, ORDER_SUCCESS } from "../../../constants/order";
import { orderActions } from "../order-slice";

export const getAllOrders = (token: string, url: string) => async (dispatch: Dispatch) => {
  orderActions.getAll({type: ORDER_REQUEST});
  
  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }
  
  const getAllOrdersRequest = async () => {
    return await axios.get(url, config);
  }

  try {
    const { data } = await getAllOrdersRequest();
    
    dispatch(orderActions.getAll({
      type: ORDER_SUCCESS,
      payload: data
    }))
  } catch (error: any) {
    dispatch(orderActions.getAll({
      type: ORDER_FAIL,
      payload: error.response.data.message
    }))
  }
}