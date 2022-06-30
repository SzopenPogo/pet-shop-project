import { createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookie";
import { CART_FAIL, CART_ITEMS_COOKIE_NAME, CART_REQUEST, CART_SUCCESS } from "../../constants/cart";
import { ICartAddData, ICartProduct } from "../../interfaces/ICart";

const cartItemsStoredCookie = Cookies.get(CART_ITEMS_COOKIE_NAME);
const cartItemsParsedCookie = cartItemsStoredCookie && JSON.parse(cartItemsStoredCookie);

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    cart: {
      error: null,
      loading: false,
      data: {
        cartProducts: [] as Array<ICartProduct>,
        totalPrice: 0,
        totalAmmount: 0
      }
    },
    cartItems: cartItemsParsedCookie 
      ? cartItemsParsedCookie as Array<ICartAddData> 
      : [] as Array<ICartAddData>
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
      } else {
        state.cartItems.push(action.payload);
      }
      Cookies.set(CART_ITEMS_COOKIE_NAME, JSON.stringify(state.cartItems), { expires: 7 })
    },
    clearCart(state) {
      state.cartItems = [];
      Cookies.remove(CART_ITEMS_COOKIE_NAME)
    },
    deleteItem(state, action) {
      const _id = action.payload;

      const isInArray = state.cartItems.some(item => item._id === _id);

      if(!isInArray) {
        return;
      }

      const itemIndex = state.cartItems.findIndex(item => item._id === _id);
      state.cartItems.splice(itemIndex, 1);
      Cookies.set(CART_ITEMS_COOKIE_NAME, JSON.stringify(state.cartItems), { expires: 7 });
    },
    changeItemAmmount(state, action) {
      const {_id, ammount} = action.payload;

      const isInArray = state.cartItems.some(item => item._id === _id);

      if(!isInArray) {
        return;
      }

      const itemIndex = state.cartItems.findIndex(item => item._id === _id);
      state.cartItems[itemIndex].ammount = ammount;
      Cookies.set(CART_ITEMS_COOKIE_NAME, JSON.stringify(state.cartItems), { expires: 7 });
    }
  }
});

export const cartActions = cartSlice.actions;
export default cartSlice;