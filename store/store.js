import { configureStore } from "@reduxjs/toolkit";
import CartSlice, { cartTotal } from "./slices/CartSlice";
import authSlice from "./slices/authSlice";
import localStorageMiddleware from "./slices/localStorageMiddleware";

const store = configureStore({
  reducer: {
    cart: CartSlice,
    auth: authSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(localStorageMiddleware),
});

store.dispatch(cartTotal());
export default store;
