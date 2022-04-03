import { configureStore } from "@reduxjs/toolkit";
import addressSlice from "./address/address-slice";
import categorySlice from "./category/category-slice";
import clientWindowSlice from "./clientWindow/clientWindow-slice";
import uiSlice from "./ui/ui-slice";
import userSilce from "./user/user-slice";

const store = configureStore({
  reducer: {
    clientWindow: clientWindowSlice.reducer,
    ui: uiSlice.reducer,
    category: categorySlice.reducer,
    user: userSilce.reducer,
    address: addressSlice.reducer
  }
});

export default store;
export type RootState = ReturnType<typeof store.getState>;