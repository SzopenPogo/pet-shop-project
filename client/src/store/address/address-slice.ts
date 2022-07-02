import { createSlice } from "@reduxjs/toolkit";
import { ADDRESS_FAIL, ADDRESS_REQUEST, ADDRESS_SUCCESS } from "../../constants/address";
import { ISelectedAddress } from "../../interfaces/IAddressData";

const initialAddressData = {
  _id: '',
  userId: '',
  country: '',
  postalCode: '',
  city: '',
  street: '',
  homeNumber: '',
  phoneNumber: ''
}

const addressSlice = createSlice({
  name: 'address',
  initialState: {
    loading: false,
    error: '',
    data: [
      initialAddressData
    ],
    selectedAddressData: {} as ISelectedAddress
  },
  reducers: {
    getAll(state, action) {
      const { type, payload } = action.payload;
      
      switch (type) {
        case ADDRESS_REQUEST:
          state.loading = true;
          state.error = '';
          break;
        case ADDRESS_SUCCESS:
          state.loading = false;
          state.error = '';
          state.data = payload;
          break;
        case ADDRESS_FAIL:
          state.loading = false;
          state.error = payload;
          break;
      }
    },
    edit(state, action) {
      const { type, payload, index } = action.payload;
      
      switch (type) {
        case ADDRESS_REQUEST:
          state.loading = true;
          state.error = '';
          break;
        case ADDRESS_SUCCESS:
          state.loading = false;
          state.error = '';
          state.data[index] = payload;
          break;
        case ADDRESS_FAIL:
          state.loading = false;
          state.error = payload;
          break;
      }
    },
    delete(state, action) {
      const { type, payload, index } = action.payload;
      
      switch (type) {
        case ADDRESS_REQUEST:
          state.loading = true;
          state.error = '';
          break;
        case ADDRESS_SUCCESS:
          state.loading = false;
          state.error = '';
          state.data.splice(index, 1);
          
          break;
        case ADDRESS_FAIL:
          state.loading = false;
          state.error = payload;
          break;
      }
    },
    add(state, action) {
      const { type, payload } = action.payload;
      
      switch (type) {
        case ADDRESS_REQUEST:
          state.loading = true;
          state.error = '';
          break;
        case ADDRESS_SUCCESS:
          state.loading = false;
          state.error = '';
          state.data.push(payload);
          break;
        case ADDRESS_FAIL:
          state.loading = false;
          state.error = payload;
          break;
      }
    },
    select(state, action) {
      const { payload } = action.payload;
      state.selectedAddressData = payload;
    },
    selectById(state, action) {
      const _id = action.payload;

      const isInArray = state.data.some(address => address._id === _id);
      if(!isInArray) {
        return;
      }

      const itemIndex = state.data.findIndex(address => address._id === _id);
      state.selectedAddressData = {
        index: itemIndex,
        ...state.data[itemIndex]
      };
    }
  }
});

export const addressActions = addressSlice.actions;
export default addressSlice;