import { createSlice } from "@reduxjs/toolkit";
import { CREATE_ORDER_FAIL, CREATE_ORDER_REQUEST, CREATE_ORDER_SUCCESS } from "../../constants/order";
import { IOrder } from "../../interfaces/IOrder";

const orderSlice = createSlice({
  name: 'order',
  initialState: {
    orders: {
      loading: false,
      error: '',
      data: [] as Array<IOrder>
    },
    order: {
      actionType: '',
      loading: false,
      error: '',
      data: {} as IOrder,
    }
  },
  reducers: {
    create(state, action) {
      const { type, payload } = action.payload;

      state.order.actionType = type;

      switch (type) {
        case CREATE_ORDER_REQUEST:
          state.order.loading = true;
          state.order.error = '';
          break;
        case CREATE_ORDER_SUCCESS:
          state.order.loading = false;
          state.order.error = '';
          state.order.data = payload;
          break;
        case CREATE_ORDER_FAIL:
          state.order.loading = false;
          state.order.error = payload;
          break;
      }
    }, 
    resetCreateOrderActionType(state) {
      state.order.actionType = ''
    }
  }
});

export const orderActions = orderSlice.actions;
export default orderSlice;