import { createSlice } from "@reduxjs/toolkit";
import { CATEGORY_FAIL, CATEGORY_REQUEST, CATEGORY_SUCCESS } from "../../constants/category";
import { ICategory } from "../../interfaces/ICategory";
import { ISubcategory } from "../../interfaces/ISubcategory";

interface ISelectedCategory {
  _id: string,
  index: number
}

const categorySlice = createSlice({
  name: 'category',
  initialState: {
    categories: {
      loading: false,
      error: null,
      data: [] as Array<ICategory>
    },
    activeSubcategory: {
      title: '',
      subcategoryRef: [] as Array<ISubcategory>
    },
    selectedCategory: {} as ISelectedCategory,
    category: {
      loading: false,
      error: null,
      data: {} as ICategory
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
    },
    edit(state, action) {
      const { type, payload, index } = action.payload;

      switch (type) {
        case CATEGORY_REQUEST:
          state.categories.loading = true;
          state.categories.error = null;
          break;
        case CATEGORY_SUCCESS:
          state.categories.loading = false;
          state.categories.error = null;
          state.categories.data[index] = payload;
          break;
        case CATEGORY_FAIL:
          state.categories.loading = false;
          state.categories.error = payload;
          break;
      }
    },
    selectCategory(state, action) {
      const {_id, index} = action.payload;
      
      state.selectedCategory = {
        _id,
        index
      };
    },
    delete(state, action) {
      const { type, payload, index } = action.payload;
      
      switch (type) {
        case CATEGORY_REQUEST:
          state.categories.loading = true;
          state.categories.error = null;
          break;
        case CATEGORY_SUCCESS:
          state.categories.loading = false;
          state.categories.error = null;
          state.categories.data.splice(index ,1);
          break;
        case CATEGORY_FAIL:
          state.categories.loading = false;
          state.categories.error = payload;
          break;
      }
    },
    create(state, action) {
      const { type, payload } = action.payload;
      
      switch (type) {
        case CATEGORY_REQUEST:
          state.categories.loading = true;
          state.categories.error = null;
          break;
        case CATEGORY_SUCCESS:
          state.categories.loading = false;
          state.categories.error = null;
          state.categories.data.push(payload);
          break;
        case CATEGORY_FAIL:
          state.categories.loading = false;
          state.categories.error = payload;
          break;
      }
    },
    getById(state, action) {
      const { type, payload } = action.payload;

      switch (type) {
        case CATEGORY_REQUEST:
          state.category.loading = true;
          state.category.error = null;
          break;
        case CATEGORY_SUCCESS:
          state.category.loading = false;
          state.category.error = null;
          state.category.data = payload;
          break;
        case CATEGORY_FAIL:
          state.category.loading = false;
          state.category.error = payload;
          break;
      }
    }
  }
})

export const categoryActions = categorySlice.actions;
export default categorySlice;