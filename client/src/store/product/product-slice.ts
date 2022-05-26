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
    }
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
    }
  }
});

export const productActions = productSlice.actions;
export default productSlice;