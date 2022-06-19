import { createSlice } from "@reduxjs/toolkit";
import { CART_FAIL, CART_REQUEST, CART_SUCCESS } from "../../constants/cart";
import { ICartAddData, ICartProduct } from "../../interfaces/ICart";

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    cart: {
      error: null,
      loading: false,
      data: {
        products: [] as Array<ICartProduct>,
        totalPrice: 0
      }
    },
    cartItems: [] as Array<ICartAddData>
  },
  reducers: {
    calculate(state, action) {
      const { type, payload } = action.payload;

      switch (type) {
        case CART_REQUEST:
          state.cart.loading = true;
          state.cart.error = null;
          break;
        case CART_SUCCESS:
          state.cart.loading = false;
          state.cart.error = null;
          state.cart.data = payload;
          break;
        case CART_FAIL:
          state.cart.loading = false;
          state.cart.error = payload;
          break;
      }
    },
    addToCart(state, action) {
      const {_id, ammount} = action.payload;

      const isInArray = state.cartItems.some(item => item._id === _id);
      
      if(isInArray) {
        const itemIndex = state.cartItems.findIndex(item => item._id === _id);
        state.cartItems[itemIndex].ammount += ammount;
        return;
      }

      state.cartItems.push(action.payload);
    }
  }
});

export const cartActions = cartSlice.actions;
export default cartSlice;