import { configureStore } from "@reduxjs/toolkit";
import addressSlice from "./address/address-slice";
import adminSlice from "./admin/admin-slice";
import categorySlice from "./category/category-slice";
import clientWindowSlice from "./clientWindow/clientWindow-slice";
import productSlice from "./product/product-slice";
import sliderSlice from "./slider/slider-slice.ts";
import subcategorySlice from "./subcategory/subcategory-slice";
import uiSlice from "./ui/ui-slice";
import userSilce from "./user/user-slice";

const store = configureStore({
  reducer: {
    clientWindow: clientWindowSlice.reducer,
    ui: uiSlice.reducer,
    category: categorySlice.reducer,
    user: userSilce.reducer,
    address: addressSlice.reducer,
    admin: adminSlice.reducer,
    subcategory: subcategorySlice.reducer,
    product: productSlice.reducer,
    slider: sliderSlice.reducer
  }
});

export default store;
export type RootState = ReturnType<typeof store.getState>;