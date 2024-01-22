import { createSlice } from "@reduxjs/toolkit";
import { ProductData } from "@/components/ProductData";
import { useEffect } from "react";


const getLocalCartData = () => {
  let localCartData = localStorage.getItem("CartItems");
  if (localCartData == []) {
    return [];
  } else {
    return JSON.parse(localCartData);
  }
};

const initialState = {
  cart: [],
  // cart: localStorage.getItem("CartItems") ? JSON.parse(localStorage.getItem("CartItems")) :,
  filter_products: ProductData,
  products: [],
  totalQuantity: 0,
  totalPrice: 0,
  minPrice: 0,
  Price: 0,
  maxPrice: 4000,
};

const CartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart(state, action) {
      let find = state.cart.findIndex((item) => item.id === action.payload.id);
      if (find >= 0) {
        state.cart[find].quantity = Math.floor(state.cart[find].quantity) + 1;
      } else {
        state.cart.push(action.payload);
      }
      localStorage.setItem("CartItems", JSON.stringify(state.cart));
    },

    removeItem(state, action) {
      console.log(action.payload);
      state.cart = state.cart.filter((item) => item.id != action.payload);
    },

    setIncrease(state, action) {
      console.log(action.payload);
      state.cart.map((item) => {
        if (item.id === action.payload) {
          item.quantity = Math.floor(item.quantity) + 1;
        }
      });
    },
    clearCart(state, action) {
      state.cart = [];
    },

    setDecrease(state, action) {
      state.cart.map((item) => {
        if (item.id === action.payload && item.quantity != 0) {
          item.quantity = Math.floor(item.quantity) - 1;
        } else{
          console.log("sdsd");
      
        }
      });
    },

    setSortBy(state, action) {
      if (action.payload === "lowest") {
        state.filter_products.sort((a, b) => a.price - b.price);
      }
      if (action.payload === "highest") {
        state.filter_products.sort((a, b) => b.price - a.price);
      }
      if (action.payload === "a-z") {
        state.filter_products.sort((a, b) => {
          return a.name.localeCompare(b.name);
        });
      }
      if (action.payload === "z-a") {
        state.filter_products.sort((a, b) => {
          return b.name.localeCompare(a.name);
        });
      }
    },

    categoryFilter(state, action) {
      if (action.payload === "ALL") {
        state.filter_products = ProductData;
      } else {
        state.filter_products = ProductData.filter(
          (item) => item.category === action.payload
        );
      }
    },

    companyFilter(state, action) {
      if (action.payload === "All") {
        state.filter_products = ProductData;
      } else {
        state.filter_products = ProductData.filter(
          (item) => item.company === action.payload
        );
      }
    },

    priceFilter(state, action) {
      state.Price = action.payload;
      if (state.Price === 0) {
        state.filter_products = ProductData.filter(
          (item) => +item.price == action.payload
        );
      } else {
        state.filter_products = ProductData.filter(
          (item) => +item.price <= action.payload
        );
      }
    },
    searchFilter(state, action) {
      state.filter_products = ProductData.filter(
        (item) =>
          item.name.toLowerCase().includes(action.payload) ||
          item.name.includes(action.payload) ||
          item.category.includes(action.payload) ||
          item.category.toLowerCase().includes(action.payload)
      );
    },

    clearFilter(state, action) {
      state.Price = 0;
      state.filter_products = ProductData;
    },

    cartTotal(state, action) {
      let {total,quantity} = state.cart.reduce((initialValue, currItem) => {
        let { price, quantity } = currItem;

        initialValue.total += price * quantity;
        initialValue.quantity +=  +(quantity);
        return initialValue;
      }, {
        total:0,
        quantity:0,
      });
      state.totalQuantity = quantity;
      state.totalPrice = total;
    },
  },
});
// state.totalPrice = total;

export default CartSlice.reducer;
export const {
  addToCart,
  removeItem,
  setIncrease,
  setDecrease,
  clearCart,
  setSortBy,
  categoryFilter,
  companyFilter,
  priceFilter,
  clearFilter,
  searchFilter,
  cartTotal,
} = CartSlice.actions;
