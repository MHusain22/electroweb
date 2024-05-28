// import { createSlice } from '@reduxjs/toolkit';

// // const initialState = {
// //   isAuthenticated: false,
// //   user: null,
// // };
// const initialState = {
//     isAuthenticated: !!localStorage.getItem('isAuthenticated'),
//     user: JSON.parse(localStorage.getItem('user')),
//   };

// const authSlice = createSlice({
//   name: 'auth',
//   initialState,
//   reducers: {
//     login: (state) => {
//       state.isAuthenticated = true;
//     },
//     logout: (state) => {
//       state.isAuthenticated = false;
//       state.user = null;
//     },
//     setUser: (state, action) => {
//       state.user = action.payload;
//     },
//   },
// });

// export const { login, logout, setUser } = authSlice.actions;

// export default authSlice.reducer;

import { createSlice } from '@reduxjs/toolkit';

const loadFromLocalStorage = (key, defaultValue) => {
  if (typeof window !== 'undefined' && localStorage.getItem(key)) {
    return JSON.parse(localStorage.getItem(key));
  }
  return defaultValue;
};

const initialState = {
  isAuthenticated: loadFromLocalStorage('isAuthenticated', false),
  user: loadFromLocalStorage('user', null),
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state) => {
      state.isAuthenticated = true;
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.user = null;
    },
    setUser: (state, action) => {
      state.user = action.payload;
    },
  },
});

export const { login, logout, setUser } = authSlice.actions;

export default authSlice.reducer;
