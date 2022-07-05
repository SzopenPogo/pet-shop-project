import { Dispatch } from "@reduxjs/toolkit";
import axios from "axios";
import { BACKEND_ORDER_ROUTER } from "../../../constants/backend";
import { ORDER_FAIL, ORDER_REQUEST, ORDER_SUCCESS } from "../../../constants/order";
import { orderActions } from "../order-slice";

export const editOrderStatus = (
  token: string,
  _id: string,
  status: string,
  index: number ) => async (dispatch: Dispatch) => {

  dispatch(orderActions.edit({type: ORDER_REQUEST}));
  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }

  const data = {
    status
  }

  const editOrderStatusRequest = async () => {
    return await axios.patch(`${BACKEND_ORDER_ROUTER}/${_id}`, data, config);
  }

  try {
    const { data } = await editOrderStatusRequest();

    dispatch(orderActions.edit({
      type: ORDER_SUCCESS,
      payload: {
        data,
        index
      }
    }));
  } catch (error: any) {
    dispatch(orderActions.edit({
      type: ORDER_FAIL,
      payload: error.response.data.message
    }));
  }
}