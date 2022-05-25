import { createSlice } from "@reduxjs/toolkit";
import { BACKEND_SUBCATEGORY_ROUTER } from "../../constants/backend";
import { SUBCATEGORY_FAIL, SUBCATEGORY_REQUEST, SUBCATEGORY_SUCCESS } from "../../constants/subcategory";
import {ISubcategory} from '../../interfaces/ISubcategory';


const subcategorySlice = createSlice({
  name: 'subcategory',
  initialState: {
    subcategories: {
      loading: false,
      error: null,
      data: [] as Array<ISubcategory>
    },
    selectedSubcategoryId: '',
    subcategoryUrl: BACKEND_SUBCATEGORY_ROUTER,
    subcategoryLastUpdate: ''
  },
  reducers: {
    create(state, action) {
      const { type, payload } = action.payload;
      
      switch (type) {
        case SUBCATEGORY_REQUEST:
          state.subcategories.loading = true;
          state.subcategories.error = null;
          break;
        case SUBCATEGORY_SUCCESS:
          state.subcategories.loading = false;
          state.subcategories.error = null;
          state.subcategories.data.push(payload);
          state.subcategoryLastUpdate = new Date().toISOString();
          break;
        case SUBCATEGORY_FAIL:
          state.subcategories.loading = false;
          state.subcategories.error = payload;
          break;
      }
    },
    get(state, action) {
      const { type, payload } = action.payload;
      
      switch (type) {
        case SUBCATEGORY_REQUEST:
          state.subcategories.loading = true;
          state.subcategories.error = null;
          break;
        case SUBCATEGORY_SUCCESS:
          state.subcategories.loading = false;
          state.subcategories.error = null;
          state.subcategories.data = payload;
          break;
        case SUBCATEGORY_FAIL:
          state.subcategories.loading = false;
          state.subcategories.error = payload;
          break;
      }
    },
    edit(state, action) {
      const { type, payload, index } = action.payload;
      
      switch (type) {
        case SUBCATEGORY_REQUEST:
          state.subcategories.loading = true;
          state.subcategories.error = null;
          break;
        case SUBCATEGORY_SUCCESS:
          state.subcategories.loading = false;
          state.subcategories.error = null;
          state.subcategories.data[index] = payload;
          state.subcategoryLastUpdate = new Date().toISOString();
          break;
        case SUBCATEGORY_FAIL:
          state.subcategories.loading = false;
          state.subcategories.error = payload;
          break;
      }
    },
    delete(state, action) {
      const { type, payload, index } = action.payload;
      
      switch (type) {
        case SUBCATEGORY_REQUEST:
          state.subcategories.loading = true;
          state.subcategories.error = null;
          break;
        case SUBCATEGORY_SUCCESS:
          state.subcategories.loading = false;
          state.subcategories.error = null;
          state.subcategories.data.splice(index ,1);
          state.subcategoryLastUpdate = new Date().toISOString();
          break;
        case SUBCATEGORY_FAIL:
          state.subcategories.loading = false;
          state.subcategories.error = payload;
          break;
      }
    },
    select(state, action) {
      state.selectedSubcategoryId = action.payload.payload;
    },
    subcategoryUrl(state, action) {
      state.subcategoryUrl = action.payload;
    }
  }
});

export const subcategoryActions = subcategorySlice.actions;
export default subcategorySlice;