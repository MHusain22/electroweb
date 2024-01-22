import { configureStore } from "@reduxjs/toolkit";
import CartSlice, { cartTotal } from "./slices/CartSlice";

const store = configureStore({
  reducer: {
    cart: CartSlice,
  },
});

store.dispatch(cartTotal());
export default store;
