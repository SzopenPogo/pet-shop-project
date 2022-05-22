import { createSlice } from "@reduxjs/toolkit";
import { SUBCATEGORY_FAIL, SUBCATEGORY_REQUEST, SUBCATEGORY_SUCCESS } from "../../constants/subcategory";
import {ISubcategory} from '../../interfaces/ISubcategory';


const subcategorySlice = createSlice({
  name: 'subcategory',
  initialState: {
    subcategories: {
      loading: false,
      error: null,
      data: [] as Array<ISubcategory>
    }
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
          break;
        case SUBCATEGORY_FAIL:
          state.subcategories.loading = false;
          state.subcategories.error = payload;
          break;
      }
    }
  }
});

export const subcategoryActions = subcategorySlice.actions;
export default subcategorySlice;