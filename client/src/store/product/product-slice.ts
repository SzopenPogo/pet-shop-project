import { createSlice } from "@reduxjs/toolkit";
import { PRODUCT_FAIL, PRODUCT_REQUEST, PRODUCT_SUCCESS } from "../../constants/product";
import { IProduct } from "../../interfaces/IProduct";

const productSlice = createSlice({
  name: 'product',
  initialState: {
    products: {
      loading: false,
      error: null,
      data: [] as Array<IProduct>
    },
    productUrl: '',
    productUrlOptions: [] as Array<string>
  },
  reducers: {
    create(state, action) {
      const { type, payload } = action.payload;
      
      switch (type) {
        case PRODUCT_REQUEST:
          state.products.loading = true;
          state.products.error = null;
          break;
        case PRODUCT_SUCCESS:
          state.products.loading = false;
          state.products.error = null;
          state.products.data.push(payload);
          break;
        case PRODUCT_FAIL:
          state.products.loading = false;
          state.products.error = payload;
          break;
      }
    },
    productUrl(state, action) {
      state.productUrl = action.payload;
    },
    productUrlOption(state, action) {
      const {type, payload} = action.payload;
      const {index, option} = payload;
      
      if(type) {
        state.productUrlOptions.splice(index, 1);
      }

      state.productUrlOptions.push(option);
    },
    get(state, action) {
      const { type, payload } = action.payload;
      
      switch (type) {
        case PRODUCT_REQUEST:
          state.products.loading = true;
          state.products.error = null;
          break;
        case PRODUCT_SUCCESS:
          state.products.loading = false;
          state.products.error = null;
          state.products.data = payload;
          break;
        case PRODUCT_FAIL:
          state.products.loading = false;
          state.products.error = payload;
          break;
      }
    },
  }
});

export const productActions = productSlice.actions;
export default productSlice;