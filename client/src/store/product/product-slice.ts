import { createSlice } from "@reduxjs/toolkit";
import { PRODUCT_FAIL, PRODUCT_REQUEST, PRODUCT_SUCCESS } from "../../constants/product";
import { IProduct, ISelectedProduct } from "../../interfaces/IProduct";

const productSlice = createSlice({
  name: 'product',
  initialState: {
    products: {
      loading: false,
      error: null,
      data: [] as Array<IProduct>
    },
    productUrl: '',
    productUrlOptions: [] as Array<string>,
    productPages: 0,
    selectedProduct: {} as ISelectedProduct,
    product: {
      loading: false,
      error: null,
      data: {} as IProduct
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
    },
    productUrl(state, action) {
      state.productUrl = action.payload;
    },
    productUrlOption(state, action) {
      const {type, payload} = action.payload;
      const {index, option} = payload;
      
      //If option value is empty
      if(!option.split('=')[1]) {
        state.productUrlOptions.splice(index, 1);
        return;
      }

      //Remove existing option from array of options
      if(type) {
        state.productUrlOptions.splice(index, 1);
      }

      state.productUrlOptions.push(option);
    },
    resetProductUrlOptions(state) {
      state.productUrlOptions = [];
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
          state.products.data = payload.product;
          state.productPages = payload.pages;
          break;
        case PRODUCT_FAIL:
          state.products.loading = false;
          state.products.error = payload;
          break;
      }
    },
    delete(state, action) {
      const { type, payload, index } = action.payload;
      
      switch (type) {
        case PRODUCT_REQUEST:
          state.products.loading = true;
          state.products.error = null;
          break;
        case PRODUCT_SUCCESS:
          state.products.loading = false;
          state.products.error = null;
          state.products.data.splice(index ,1);;
          break;
        case PRODUCT_FAIL:
          state.products.loading = false;
          state.products.error = payload;
          break;
      }
    },
    select(state, action) {
      const {_id, index} = action.payload;
      state.selectedProduct = {
        _id,
        index
      };
    },
    edit(state, action) {
      const { type, payload, index } = action.payload;
      
      switch (type) {
        case PRODUCT_REQUEST:
          state.products.loading = true;
          state.products.error = null;
          break;
        case PRODUCT_SUCCESS:
          state.products.loading = false;
          state.products.error = null;
          state.products.data[index] = payload;
          break;
        case PRODUCT_FAIL:
          state.products.loading = false;
          state.products.error = payload;
          break;
      }
    },
    deleteImage(state, action) {
      const { type, payload, index } = action.payload;
      
      switch (type) {
        case PRODUCT_REQUEST:
          state.products.loading = true;
          state.products.error = null;
          break;
        case PRODUCT_SUCCESS:
          state.products.loading = false;
          state.products.error = null;
          state.products.data[index] = payload;
          break;
        case PRODUCT_FAIL:
          state.products.loading = false;
          state.products.error = payload;
          break;
      }
    },
    getById(state, action) {
      const { type, payload } = action.payload;
      
      switch (type) {
        case PRODUCT_REQUEST:
          state.product.loading = true;
          state.product.error = null;
          break;
        case PRODUCT_SUCCESS:
          state.product.loading = false;
          state.product.error = null;
          state.product.data = payload;
          break;
        case PRODUCT_FAIL:
          state.product.loading = false;
          state.product.error = payload;
          break;
      }
    }
  }
});

export const productActions = productSlice.actions;
export default productSlice;