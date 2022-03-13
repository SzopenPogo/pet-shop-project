import { configureStore } from "@reduxjs/toolkit";
import categorySlice from "./category/category-slice";
import clientWindowSlice from "./clientWindow/clientWindow-slice";
import uiSlice from "./ui/ui-slice";

const store = configureStore({
  reducer: {
    clientWindow: clientWindowSlice.reducer,
    ui: uiSlice.reducer,
    category: categorySlice.reducer
  }
});

export default store;
export type RootState = ReturnType<typeof store.getState>;