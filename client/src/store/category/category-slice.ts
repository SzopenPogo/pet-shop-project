import { createSlice } from "@reduxjs/toolkit";
import { CATEGORY_FAIL, CATEGORY_REQUEST, CATEGORY_SUCCESS } from "../../constants/category";

const categorySlice = createSlice({
  name: 'category',
  initialState: {
    categories: {
      loading: false,
      error: null,
      data: [{
        _id: '',
        title: '',
        subcategoryRef: []
      }]
    },
    activeSubcategory: {
      title: '',
      subcategoryRef: [{
        _id: '',
        title: '',
        imageUrl: '',
        categoryId: ''
      }]
    }
  },
  reducers: {
    get(state, action) {
      const { type, payload } = action.payload;

      switch (type) {
        case CATEGORY_REQUEST:
          state.categories.loading = true;
          state.categories.error = null;
          break;
        case CATEGORY_SUCCESS:
          state.categories.loading = false;
          state.categories.error = null;
          state.categories.data = payload;
          break;
        case CATEGORY_FAIL:
          state.categories.loading = false;
          state.categories.error = payload;
          break;
      
      }
    },
    setActiveSubcategory(state, action) {
      const { title, payload } = action.payload;
      state.activeSubcategory.title = title;
      state.activeSubcategory.subcategoryRef = payload;
    }
  }
})

export const categoryActions = categorySlice.actions;
export default categorySlice;