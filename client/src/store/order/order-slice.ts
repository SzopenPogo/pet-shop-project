import { createSlice } from "@reduxjs/toolkit";
import { BACKEND_ORDER_ROUTER } from "../../constants/backend";
import { CREATE_ORDER_FAIL, CREATE_ORDER_REQUEST, CREATE_ORDER_SUCCESS, ORDER_FAIL, ORDER_REQUEST, ORDER_SUCCESS } from "../../constants/order";
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
    },
    orderUrlOptions: [] as Array<string>,
    orderUrl: BACKEND_ORDER_ROUTER
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
    },
    getMe(state, action) {
      const { type, payload } = action.payload;

      switch (type) {
        case ORDER_REQUEST:
          state.orders.loading = true;
          state.orders.error = '';
          break;
        case ORDER_SUCCESS:
          state.orders.loading = false;
          state.orders.error = '';
          state.orders.data = payload;
          break;
        case ORDER_FAIL:
          state.orders.loading = false;
          state.orders.error = payload;
          break;
      }
    },
    edit(state, action) {
      const { type, payload } = action.payload;

      switch (type) {
        case ORDER_REQUEST:
          state.orders.loading = true;
          state.orders.error = '';
          break;
        case ORDER_SUCCESS:
          const {index, data} = payload;
          
          state.orders.loading = false;
          state.orders.error = '';
          state.orders.data[index] = data;
          break;
        case ORDER_FAIL:
          state.orders.loading = false;
          state.orders.error = payload;
          break;
      }
    },
    getAll(state, action) {
      const { type, payload } = action.payload;

      switch (type) {
        case ORDER_REQUEST:
          state.orders.loading = true;
          state.orders.error = '';
          break;
        case ORDER_SUCCESS:
          state.orders.loading = false;
          state.orders.error = '';
          state.orders.data = payload;
          break;
        case ORDER_FAIL:
          state.orders.loading = false;
          state.orders.error = payload;
          break;
      }
    },
    orderUrl(state, action) {
      state.orderUrl = action.payload;
    },
    orderUrlOption(state, action) {
      const {type, payload} = action.payload;
      const {index, option} = payload;
      
      //If option value is empty
      if(!option.split('=')[1]) {
        state.orderUrlOptions.splice(index, 1);
        return;
      }

      //Remove existing option from array of options
      if(type) {
        state.orderUrlOptions.splice(index, 1);
      }

      state.orderUrlOptions.push(option);
    },
    resetOrderUrlOptions(state) {
      state.orderUrlOptions = [];
    }
  }
});

export const orderActions = orderSlice.actions;
export default orderSlice;