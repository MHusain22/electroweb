import { configureStore } from "@reduxjs/toolkit";
import CartSlice, { cartTotal } from "./slices/CartSlice";
import authSlice from "./slices/authSlice";

const store = configureStore({
  reducer: {
    cart: CartSlice,
    auth: authSlice,
  },
});

store.dispatch(cartTotal());
export default store;
